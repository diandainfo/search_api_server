/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const config = require('../../config')
    , elasticSearch = require('elasticsearch');

const _ = {
    // 索引检查
    check: ()=> require('./check')

    // 数据节点
    , dn: new elasticSearch.Client({
        hosts: [config.es.data_node.url + ":" + config.es.data_node.port]
        , apiVersion: "5.4"
    })

};

module.exports = _;