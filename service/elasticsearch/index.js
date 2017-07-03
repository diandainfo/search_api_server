/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const client = require('../../utils/elasticSearch').client.dn
    , config = require('../../config')
    , methodUtils = require('../../utils/method')
    , sLog = GLO.logger('es-start');

const _ = {
    // 测试连接ES
    ping: ()=>
        new Promise((resolve, reject)=>
            client
                .ping({
                    requestTimeout: 10000 // 延迟相应时间为10s
                })
                .then(()=>resolve())
                .catch((error)=> {
                    sLog.error(error);
                    reject('连接ES节点失败');
                })
        )

    // 获取本机IP，确认是否需要检查节点
    , needCheck: ()=> config.es.check && config.es.check_ip === methodUtils.getLocalIp()

    // 检查ES节点
    , check: ()=>
        new Promise((resolve, reject)=> {
            _.ping()                                        // 连接es节点
                .then(()=> {
                    GLO.log('启动检查 - ElasticSearch 节点连接成功', 'start');
                    // console.info(_.needCheck());
                    resolve();
                })
                .catch(reject);
        })

    // TODO 定时任务
    , schedule: require('./schedule')

    // TODO 创建索引

    // 启动任务
    , run: ()=>
        _.check()
            .then()
            .catch((error)=>GLO.error(error))
};

module.exports = _;