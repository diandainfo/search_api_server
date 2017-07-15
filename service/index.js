/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

module.exports = {
    // 项目启动、定时任务服务
    start: require('./start')

    // goods - 查询相关服务
    , goods: require('./goods')

    // DB2ES数据同步服务
    , sync: require('./sync')
};