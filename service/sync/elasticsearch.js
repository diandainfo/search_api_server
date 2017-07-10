/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const ElasticSearchClient = require('../../utils/elasticSearch').client.dn;

module.exports = bulk=>new Promise((resolve, reject)=>
    ElasticSearchClient.bulk(bulk)
);