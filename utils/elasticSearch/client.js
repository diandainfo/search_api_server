/**
 * Created by zrz on 2017/6/19.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const config = require('../../config')
    , elasticsearch = require('elasticsearch');

const _ = {
    // 数据节点
    dn: new elasticsearch.Client({
        host: [config.es.data_node]
        , apiVersion: "5.4"
    })
};

module.exports = _;

