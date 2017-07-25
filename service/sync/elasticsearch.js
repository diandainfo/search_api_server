/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const ElasticSearchClient = require('../../utils/elasticsearch').client.dn;

module.exports = bulk=>new Promise((resolve, reject)=>
    ElasticSearchClient.bulk({
        body: bulk
    }, (err, resp)=> {
        if (err) {
            reject(GLO.eLog(err, '批量索引商品数据出错'));
        } else {
            if (resp.errors) {
                reject(GLO.eLog(resp, '批量索引商品数据失败'));
            } else {
                resolve();
            }
        }
    })
);