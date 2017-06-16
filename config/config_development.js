/**
 * Created by zhangrz on 2017/6/16.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

module.exports = {
    sys: {
        host: ""
        , port: 39210
    }, es: {
        shards: 1
        , replicas: 0
        , log: 'trace'
        , d: {              // data-node
            url: "192.168.1.101"
            , port: 9210
            , check: ""
        }, c: {             // client-node
            url: "192.168.1.101"
            , port: 9210
        }, m: {             // master-node
            url: "192.168.1.101"
            , port: 9210
        }, check: ""
    }, mysql: {}, redis: {}
};