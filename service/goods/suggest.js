/**
 * Created by zhangrz on 2017/7/14.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const client = require('../../utils/elasticsearch').client.dn;

const INDEX = 'search_keyword';

const join = (resp, weight)=> {
    let results = {}
        , res = [];
    const full = resp.pinyin_full[0].options
        , only = resp.pinyin_only[0].options;
    if (full && full instanceof Array && full.length > 0) {
        full.forEach(result=>results[result.text] = result._score);
    }
    if (only && only instanceof Array && only.length > 0) {
        only.forEach(result=>results[result.text] = result._score);
    }
    if (results !== {}) {
        Object.keys(results).forEach(key=>res.push({keyword: key, weight: results[key]}));
        res.sort((o1, o2)=>o2.weight - o1.weight);
        if (!weight) { // 是否显示权重
            let tmp = [];
            res.forEach(r=>tmp.push(r.keyword));
            res = tmp;
        }
        if (res.length > 10) {
            return res.slice(0, 10);
        } else {
            return res;
        }
    } else {
        return res;
    }
};

// 搜索 - 建议
const _ = {
    // 建议 - 关键词
    keyword: data=>new Promise((resolve, reject)=> {
        let body = {
            pinyin_full: {
                prefix: data.key
                , completion: {
                    field: 'keyword_pinyin_full'
                    , size: 10
                }
            }, pinyin_only: {
                prefix: data.key
                , completion: {
                    field: 'keyword_pinyin_only'
                    , size: 10
                }
            }
        };
        client.suggest({
            index: INDEX
            , body: body
        }, (error, resp)=> {
            if (error) {
                reject(GLO.eLog(error, '获取建议词出错'));
            } else {
                resolve(join(resp, data.weight));
            }
        });
    })

    // 建议 - 商品
    , goods: data=>new Promise((resolve, reject)=> {
        const suggest = field=> ({
            prefix: data.key
            , completion: {
                field: field
                , size: 1
            }
        });
        const query = require('./query')(data);
        query.bool.should = [{
            match_phrase: {
                title_pinyin_only: data.key
            }
        }, {
            match_phrase: {
                title_pinyin_full: data.key
            }
        }];
        query.bool.minimum_should_match = 1;
        const body = {
            size: 10
            , query: query
            // fixme 使用Completion Suggester 无法进行条件过滤
            // ,stored_fields: "_none_"         // 关闭显示搜索结果docs
            // , suggest: {
            //     pinyin_only: suggest('title_pinyin_only')
            //     , pinyin_full: suggest('title_pinyin_full')
            // }
        };
        GLO.debug(body);
        client.search({
            index: INDEX
            , body: body
        }, (error, resp)=> {
            if (error) {
                reject(GLO.eLog(error, '获取建议商品出错'));
            } else {
                resolve(resp);
            }
        });
    })
};

// 搜索 - 建议
module.exports = data=>new Promise((resolve, reject)=> {
    _.keyword(data)
        .then(r=>resolve(r))
        .catch(r=>reject(r));
});