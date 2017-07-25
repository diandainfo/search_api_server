/**
 * Created by zhangrz on 2017/7/4.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 检查 - 别名、索引

const Indices = require('../../indices')
    , ElasticSearchClient = require('../../utils/elasticsearch').client.dn;

const printF = info=>GLO.log(info, 'start');

module.exports = () => new Promise((resolve, reject)=> {
    printF('----- 开始检查 别名、索引 -----');
    let indices = {}        // 需要创建的索引
        , aliases = {};      // 需要创建的别名
    const promises =
        Object.keys(Indices).map(index=> {
                const aliasName = Indices[index].alias.name
                    , indexName = Indices[index].index.index;
                // 检查别名是否存在
                return ElasticSearchClient.indices.existsAlias({name: aliasName})
                    .then(exists=> {
                        if (!exists) { // 别名不存在，需要创建别名
                            aliases[index] = Indices[index].alias;
                            printF('-- × 别名[' + aliasName + '] 不存在，需要创建');
                        } else {
                            printF(' √ 别名[' + aliasName + '] 存在，不需要创建');
                        }
                        // 检查索引是否存在
                        return ElasticSearchClient.indices.exists({index: indexName});
                    })
                    .then(exists=> {
                        if (!exists) {
                            indices[index] = Indices[index];        // 索引和mapping均需要创建
                            delete indices[index].alias; // 删除别名，别名单独创建
                            printF('-- × 索引[' + indexName + '] 不存在，需要创建');
                        } else {
                            printF(' √ 索引[' + indexName + '] 存在，不需要创建');
                        }
                        return false;
                    })
                    .catch(error=>reject(GLO.eLog(error, '检查别名和索引出错')));
            }
        );
    return Promise.all(promises)
        .then(()=> {
            printF('----- √ 别名、索引 检查完毕 -----');
            resolve({indices, aliases});
        })
        .catch(error=>reject(error));
});