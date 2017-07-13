/**
 * Created by zhangrz on 2017/7/7.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

/**
 * ElasticSearch 与 DataBase 同步任务
 */

module.exports = {
    // 查询mysql中数据
    mysql: require('./mysql')

    // 处理数据成es结构
    , reset: require('./reset')

    // 写入数据到es
    , elasticsearch: require('./elasticsearch')

    // redis数据同步
    , redis: require('./redis')

    // 定时同步任务
    , syncEveryHeart: function () {
        const self = this;
        return new Promise((resolve, reject)=> {
            if (GLO.sync_boo) { // 已有同步任务在执行
                resolve(' × 已有同步任务在执行');
            } else {
                GLO.sync('-- 启动商品同步任务');
                GLO.sync_boo = true;
                // 标记当前时间
                GLO.temp_timestamp = new Date().getTime();
                self.mysql
                    .getGoodsSQL(GLO.sync_timestamp)
                    .then(sql=>self.mysql.getGoodsData(sql))
                    .then(results=> {
                        if (results && results instanceof Array && results.length > 0) {
                            GLO.sync(' √ 本次同步商品数量:' + results.length);
                            return self.reset(results);
                        } else {
                            GLO.sync(' × 无需要增量的商品');
                            GLO.sync_boo = false;
                            GLO.sync(' √ 商品同步任务完成 --');
                            return Promise.reject(false); // 直接结束Promise调用链
                        }
                    })
                    .then(bulk=>self.elasticsearch(bulk))
                    .then(()=> {
                        GLO.sync_timestamp = GLO.temp_timestamp;
                        GLO.sync_boo = false;
                        GLO.sync(' √ 商品同步任务成功 --');
                    })
                    .catch(error=> {
                        if (error) {
                            GLO.eLog(error);
                            reject(error);
                        }
                    })
                ;
            }
        });
    }

    // 冷启动
    , init: require('./init')

    // TODO 单日同步任务
    , syncEveryToday: function () {

    }
};
