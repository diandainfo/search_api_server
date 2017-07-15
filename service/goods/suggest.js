/**
 * Created by zhangrz on 2017/7/14.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const client = require('../../utils/elasticSearch').client.dn;

const INDEX = 'shelf_goods';

// 搜索 - 建议
const _ = {
    // 建议 - 关键词
    keyword: data=>new Promise((resolve, reject)=> {
        resolve(true);
    })

    // 建议 - 商品
    , goods: data=>new Promise((resolve, reject)=> {
        const query = field=> ({
            prefix: data.key
            , completion: {
                field: field
                , size: 1
            }
        });
        const body = {
            pinyin_only: query('title_pinyin_only')
            , pinyin_full: query('title_pinyin_full')
        };
        GLO.debug(body);
        client.suggest({
            index: INDEX
            , body:  body
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
    _.goods(data)
        .then(r=>resolve(r))
        .catch(r=>reject(r));
});