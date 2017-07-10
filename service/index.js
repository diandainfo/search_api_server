/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

module.exports = {
    // ES相关启动、定时任务服务
    elasticsearch: require('./elasticsearch')

    // goods - 查询相关服务

    // DB2ES数据同步服务
    , sync: require('./sync')
};