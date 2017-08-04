/**
 * Created by zhangrz on 2017/6/16.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

module.exports = {
    sys: {
        host: ''
        , port: 39210
    }
    , check: true                               // 是否需要进行检查
    , check_ip: '192.168.1.92'                  // 需要进行检查的ip
    , es: {
        shards: 1
        , replicas: 0
        , log: 'trace'
        , data_node: {                              // data-node
            host: '192.168.1.180'
            , auth: 'elastic:changeme'
            , port: 9210
        }, master_node: {                           // master-node
            host: '192.168.1.180'
            , auth: 'elastic:changeme'
            , port: 9210
        }
    }, mysql: {
        host: '192.168.1.101'
        , port: 3306
        , user: 'dddev'
        , password: '123456'
        , database: 'ctcdb_new_test'
        , timezone: '+08:00'
    }, redis: {
        host: '192.168.1.101'
        , port: 6379
        , db: 8
    }
};