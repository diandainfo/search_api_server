/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const client = require('./client').dn
    , config = require('../../config')
    , mathUtils = require('../method')
    , cLog = GLO.logger('es-check');

const _ = {
    // 连接es节点
    ping: ()=>
        new Promise((resolve, reject)=>
            client
                .ping({
                    requestTimeout: 10000 // 延迟相应时间为10s
                })
                .then(()=>resolve())
                .catch((error)=> {
                    cLog.error(error);
                    reject('连接ES节点失败');
                })
        )
    
    // 获取本机IP，确认是否需要检查节点
    , checkIp: ()=> config.es.check && config.es.check_ip === mathUtils.getLocalIp()
    
    // TODO 检查别名是否存在
    // TODO 检查索引是否存在
    // TODO 创建别名、索引
};

module.exports = ()=>

    _
        .ping()
        .then(()=> {
            GLO.log('启动检查 - ElasticSearch 节点连接成功', 'start');
            // console.info(_.checkIp());
        })
        .catch((error)=>GLO.error(error));