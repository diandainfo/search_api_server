/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const esUtils=require('../utils/elasticSearch');

const _ = {
    // 检查节点
    check: ()=> {

    }

    // TODO 定时任务

    // TODO 启动任务
    , run: ()=> {
        esUtils.check.ping()
            .then((boo)=>console.info(boo))
            .catch((error)=>console.error(error));

    }
};

module.exports = _;