/**
 * Created by zhangrz on 2017/7/14.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 昨日商品的同步任务

const mysql = require('./mysql');

let timestamp = 0; // 昨日时间戳

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
        GLO.sync(' - 同步昨日商品数据:' + str);
        _.getGoodsSQL(timestamp, offset, _.page_length)
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

module.exports = dateTime=>new Promise((resolve, reject)=> {
    timestamp = dateTime;
    GLO.sync('----- 同步昨日商品数据');
    _.getGoodsCountSQL(timestamp)                     // 拿到SQL
        .then(sql=>_.getGoodsData(sql))                 // 获取数量
        .then(results=>results[0].count)
        .then(count=> {
            if (count > 0) {
                GLO.sync('-- 昨日共需要同步【' + count + '】个商品');
                return _.setQuery(count);
            } else if (count === 0) {
                GLO.sync(' × 昨日无需同步商品数据 -----');
                return Promise.reject(false);
            } else {
                return Promise.reject(GLO.eLog(count, '获取商品数量出错'));
            }
        })
        .then(()=> {
            GLO.sync(' √ 同步昨日商品数据 成功 -----');
        })
        .catch(err=> {
            if (err) {
                reject(err);
            }
        });
});