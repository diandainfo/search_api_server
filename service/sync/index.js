/**
 * Created by zhangrz on 2017/7/7.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

/**
 * esdbc - ElasticSearch DataBase Connectivity
 * ElasticSearch 与 DataBase 的连接器
 */

module.exports = {
    // 查询mysql中数据
    mysql: require('./mysql')

    // 处理数据成es结构
    , reset: require('./reset')

    // 写入数据到es
    , elasticsearch: require('./elasticsearch')

    // 定时任务运行
    , schedule: ()=> {

    }
};
