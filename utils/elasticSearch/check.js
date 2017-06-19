/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const client = require('./client').dn
    , cLog = GLO.logger('es-check');

const _ = {
    // 连接es节点
    ping: ()=>
        new Promise((resolve, reject)=>
            client
                .ping({
                    requestTimeout: 10000 // 延迟相应时间为10s
                })
                .then(()=>resolve(true))
                .catch((error)=> {
                    reject(GLO.error(error, -11, '连接ES节点失败').message)
                })
        )
    // TODO 获取本机IP，缺失是否需要检查节点
    // TODO 检查索引是否存在
    // TODO 创建索引
};

module.exports = _;