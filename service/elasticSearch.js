/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const esUtils = require('../utils/elasticSearch');

const _ = {
    // 检查节点
    check: ()=> esUtils.check()

    // TODO 定时任务

    // 启动任务
    , run: ()=> {
        _.check();
    }
};

module.exports = _;