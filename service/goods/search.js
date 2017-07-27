/**
 * Created by zhangrz on 2017/7/14.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const client = require('../../utils/elasticsearch').client.dn;

const INDEX = 'shelf_goods'
    , TYPE = 'info'
    , Good = require('../../modals').shelf_goods;

// 搜索 - 关键词
module.exports = data=>new Promise((resolve, reject)=> {
    let query = require('./query')(data);
    query.bool.should = [{
        term: {
            title_ik_smart: data.key
        }
    }, {
        term: {
            title_ik_max: data.key
        }
    }, {
        term: {
            first_catalog_name: data.key
        }
    }, {
        term: {
            second_catalog_name: data.key
        }
    }// TODO 标签
    ];
    query.bool.minimum_should_match = 1; // 最少满足一个条件
    const body = {
        query: query
        , from: data.from
        , size: data.size
        , highlight: {
            pre_tags: ['<' + data.highlight + '>']
            , post_tags: ['</' + data.highlight + '>']
            , fields: {
                title_ik_smart: {}
                , title_ik_max: {}
            }
        }
    };
    GLO.debug(body);
    client.search({
        index: INDEX
        , type: TYPE
        , body: body
    }, (error, resp)=> {
        if (error) {
            reject(GLO.eLog(error, '搜索关键词出错'));
        } else {
            let results = [];
            const count = resp.hits.total;
            // TODO 记录反馈日志
            GLO.searchLog(`${data.city_id} ${data.store_id} ${data.key} ${count}`);  // 记录搜索日志
            if (count > 0) {
                resp.hits.hits.forEach(hit=> {
                    const good = new Good(hit._id);
                    if (data.all) {
                        good.es2all(hit._source);
                    } else {
                        good.es2api(hit._source);
                    }
                    if ('highlight' in hit) {
                        const highlight = hit.highlight;
                        if ('title_ik_smart' in highlight && highlight.title_ik_smart.length > 0) {
                            good.highlight = highlight.title_ik_smart[0];
                        } else if ('title_ik_max' in highlight && highlight.title_ik_max.length > 0) {
                            good.highlight = highlight.title_ik_max[0];
                        } else {
                            good.highlight = '';
                        }
                    }
                    results.push(good);
                });
            }
            resolve({count, results});
        }
    });
});