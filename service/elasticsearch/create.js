/**
 * Created by zhangrz on 2017/7/3.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 创建 - 索引、别名

const Indices = require('../../indices')
    , ElasticSearchClient = require('../../utils/elasticSearch').client.dn;

const printF = info=>GLO.log(info, 'start');

module.exports = check=>new Promise((resolve, reject)=> {
    console.info(check);
    if (check) {
        printF('----- 开始创建 索引、别名 -----');
        const {indices, alias}=check;
        // 创建索引和mapping
        const createIndicesPromise = new Promise((resolve, reject)=> {
            const promises = Object.keys(indices).map(key=> {
                const index = indices[key].index // 索引
                    , mapping = indices[key].mapping // mapping
                    , mappingType = Object.keys(mapping)[0]
                    ;
                printF('-- 创建索引[' + index.index + '] --');
                // 创建索引
                return ElasticSearchClient.indices.create(index)
                    .then(result=> {
                        console.info(result);
                        printF('-- √ 索引[' + index.index + ']创建成功 --');
                        printF('-- 创建索引[' + index.index + ']中mapping[' + mappingType + ']');
                        // 创建mapping
                        return ElasticSearchClient.indices.putMapping({
                            index: index.index
                            , type: mappingType
                            , body: mapping[mappingType]
                        });
                    })
                    .then(()=> {
                        printF('-- √ 索引[' + index.index + ']中mapping[' + mappingType + ']创建成功');
                    })
                    .catch(error=>reject(error));
            });
            return Promise.all(promises)
                .then(()=>resolve())
                .catch(error=>reject(error));
        });
        createIndicesPromise
            .then(()=>printF('----- √ 索引 创建完毕 -----'))
            .catch(error=>reject(error));
    } else {
        printF('----- 无需创建 索引、别名 -----');
    }
});
