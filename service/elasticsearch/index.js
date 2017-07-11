/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const ElasticSearchClient = require('../../utils/elasticSearch').client.dn
    , config = require('../../config')
    , methodUtils = require('../../utils/method')
    , sLog = GLO.logger('es-start');

const _ = {
    // 测试连接ES
    ping: () =>
        new Promise((resolve, reject)=>
            ElasticSearchClient.ping({
                requestTimeout: 10000 // 延迟相应时间为10s
            }).then(()=> {
                GLO.log('启动检查 - ElasticSearch 节点连接成功', 'start');
                resolve();
            }).catch(error=> {
                sLog.error(error);
                reject('连接ES节点失败');
            })
        )

    // 获取本机IP，确认是否需要检查节点
    , needCheck: () => {
        const chk = config.es.check
            , cip = config.es.check_ip
            , boo = chk && cip === methodUtils.getLocalIp();
        GLO.log('本机IP:【' + cip + '】' +
            '，该环境【' + (chk ? '需要' : '不需要') + '】进行节点检查' +
            '，确认【' + (boo ? '检查' : '不检查') + '】ES节点', 'start');
        return boo;
    }

    // 检查别名、索引
    , check: require('./check')

    // 创建索引
    , create: require('./create')

    // 定时任务
    , schedule: require('./schedule')

    // 启动任务
    , run: ()=>
        _.ping()
            .then(()=> _.needCheck() ? _.check() : false)
            .then(_.create)
            .then(_.schedule)
            .catch(error=>GLO.error(error))
};

module.exports = _;