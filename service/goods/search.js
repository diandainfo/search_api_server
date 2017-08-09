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
    let {bool, filter} = require('./query')(data);
    bool.should = [{
        match_phrase: { // 全命中
            title_ik_smart: data.key
        }
    }, {
        match_phrase: {
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
    bool.minimum_should_match = 1; // 最少满足一个条件
    bool.filter = filter;
    const body = {
        query: {
            bool: bool
        }, from: data.from
        , size: data.size
        , highlight: {
            pre_tags: ['<' + data.highlight + '>']
            , post_tags: ['</' + data.highlight + '>']
            , fields: {
                title_ik_smart: {}
                , title_ik_max: {}
            }
        }, sort: ['_score'                  // 标准分
            , {update_timestamp: 'desc'}    // 更新时间：降序
            , {on_sell_good_id: 'desc'}     // 销售商品编号：降序
            //fixme Preference，通过设置偏爱节点控制score分数
        ]
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
            GLO.searchLog(`${data.city_id} ${data.store_id} ${data.key} ${count} ${data.py}`);  // 记录搜索日志
            if (count > 0) {
                resp.hits.hits.forEach(hit=> {
                    const good = new Good(hit._id);
                    if (data.all) {
                        good.es2all(hit._source);
                    } else {
                        good.es2api(hit._source);
                    }
                    good.score = hit._score;
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