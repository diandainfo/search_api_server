/**
 * Created by zhangrz on 2017/7/3.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 创建 - 索引、别名

const ElasticSearchClient = require('../../utils/elasticSearch').client.dn;

const printF = info=>GLO.log(info, 'start');

module.exports = check=>new Promise((resolve, reject)=> {
    GLO.debug(check, 'check-result');
    if (check && ( Object.keys(check.indices).length > 0 || Object.keys(check.aliases).length > 0)) {
        printF('----- 开始创建 索引、别名 -----');
        const {indices, aliases}=check;
        // 创建索引和映射
        const createIndicesPromise = ()=> new Promise((resolve, reject)=> {
            const promises = Object.keys(indices).map(key=> {
                const index = indices[key].index // 索引
                    , mapping = indices[key].mapping // mapping
                    , mappingType = Object.keys(mapping)[0]
                    ;
                printF('-- 创建索引[' + index.index + '] --');
                // 创建索引
                return ElasticSearchClient.indices.create({
                        index: index.index
                        , body: index.body.settings
                    })
                    .then(result=> {
                        GLO.debug(result, 'create-index-result');
                        printF('-- √ 索引[' + index.index + ']创建成功 --');
                        printF('-- 创建索引[' + index.index + ']中映射[' + mappingType + '] --');
                        // 创建映射
                        return ElasticSearchClient.indices.putMapping({
                            index: index.index
                            , type: mappingType
                            , body: mapping[mappingType]
                        });
                    })
                    .then(result=> {
                        GLO.debug(result, 'create-mapping-result');
                        printF('-- √ 索引[' + index.index + ']中映射[' + mappingType + ']创建成功 --');
                    })
                    .catch(error=>reject(GLO.eLog(error, '创建索引和映射出错')));
            });
            return Promise.all(promises)
                .then(()=>resolve())
                .catch(error=>reject(error));
        });
        // 创建索引的别名
        const createAliasesPromise = ()=> new Promise((resolve, reject)=> {
            const promises = Object.keys(aliases).map(key=> {
                const alias = aliases[key]  // 索引
                    ;
                printF('-- 创建索引[' + alias.index + ']的别名[' + alias.name + '] --');
                // 创建别名
                return ElasticSearchClient.indices.putAlias(alias)
                    .then(result=> {
                        GLO.debug(result, 'create-alias-result');
                        printF('-- √ 索引[' + alias.index + ']的别名[' + alias.name + '] 创建成功 --');
                    })
                    .catch(error=>reject(error));
            });
            return Promise.all(promises)
                .then(()=>resolve())
                .catch(error=>reject(error));
        });
        return createIndicesPromise()
            .then(()=> {
                printF('----- √ 索引和映射 创建完毕 -----');
                return createAliasesPromise();
            })
            .then(()=> {
                printF('----- √ 索引的别名 创建完毕 -----');
                resolve();
            })
            .catch(error=>reject(error));
    } else {
        printF('----- 无需创建 索引、别名 -----');
        resolve();
    }
});
