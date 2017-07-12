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
        return new Promise((resolve,reject)=>{
            if(GLO.sync_boo){ // 已有同步任务在执行
                resolve(' × 已有同步任务在执行');
            }else{
                // 标记当前时间
                GLO.temp_timestamp = new Date().getTime();
                // self.mysql.getGoodsSQL(GLO.temp_timestamp);
            }
        });
    }

    // 初始化

    // 单日同步任务
};
