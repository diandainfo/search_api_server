/**
 * Created by zhangrz on 2017/7/13.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 项目冷启动的数据同步

const mysql = require('./mysql');

const _ = Object.assign({
    // 分拆查询结构体
    setQuery: count=>new Promise((resolve, reject)=> {
        if (count > _.page_length) {
            const page = Math.ceil(count / _.page_length);
            let pages = [];
            for (let p = 0; p < page; p++) {
                pages.push(p * _.page_length);
            }
            const promises = pages.map(_.query);
            Promise.all(promises)
                .then(()=> resolve(true))
                .catch(err=>reject(err));
        } else { // 无需分拆，直接查询
            _.query(0)
                .then(()=> resolve(true))
                .catch(err=>reject(err));
        }
    })

    // 进行查询
    , query: offset=>new Promise((resolve, reject)=> {
        const str = offset + ' 到 ' + (offset + _.page_length - 1);
        GLO.sync(' - 冷启动同步商品数据:' + str);
        _.getGoodsSQL(new Date(GLO.sync_timestamp), offset, _.page_length)
            .then(sql=>_.getGoodsData(sql))
            .then(results=> require('./reset')(results))
            .then(bulk=>require('./elasticsearch')(bulk))
            .then(()=> {
                GLO.sync(' √ ' + str + ' 同步成功 -');
                resolve(true);
            })
            .catch(error=> reject(error));
    })
}, mysql);

module.exports = ()=>new Promise((resolve, reject)=> {
    GLO.sync('----- 冷启动同步商品数据');
    // 标记启动时间
    GLO.temp_timestamp = new Date().getTime();
    GLO.sync_timestamp = 0;
    _.getGoodsCountSQL(new Date(GLO.sync_timestamp))                     // 拿到SQL
        .then(sql=>_.getGoodsData(sql))                 // 获取数量
        .then(results=>results[0].count)
        .then(count=> {
            GLO.sync('-- 共需要同步【' + count + '】个商品');
            if (count > 0) {
                return _.setQuery(count);
            } else {
                return Promise.reject(GLO.eLog(count, '获取商品数量出错'));
            }
        })
        .then(()=> {
            GLO.sync(' √ 冷启动同步商品数据 成功 -----');
            GLO.sync_timestamp = GLO.temp_timestamp;
            require('./redis').save(GLO.sync_timestamp);     // 存储更新时间标记
        })
        .catch(err=>reject(err));
});