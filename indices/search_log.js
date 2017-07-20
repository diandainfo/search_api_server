/**
 * Created by zhangrz on 2017/6/16.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const config = require('../config')['es']
    , indexName = 'search_log';

const mapping = {
    info: {
        properties: {
            keyword: {type: "keyword"}      // 搜索词
            , keyword_pinyin_only: {
                type: "completion"
                , analyzer: "only_pinyin_analyzer"
                , search_analyzer: 'only_pinyin_analyzer'
                , preserve_separators: false                // 忽略分隔符
            }
            , keyword_pinyin_full: {
                type: "completion"
                , analyzer: "full_pinyin_analyzer"
                , search_analyzer: 'full_pinyin_analyzer'
                , preserve_separators: false
            }
            , city_id: {type: "integer"}                    // 城市编号
            , store_id: {type: "integer"}                   // 店铺编号
            , result_count: {type: "integer"}               // 搜索结果集数量
            , log_time: {type: "date"}                      // 更新时间,用于kibana时间过滤
        }
    }
};

module.exports = {
    //索引
    index: {
        index: indexName + '_v1'
        , body: {
            settings: {
                index: {
                    number_of_shards: config['shards']
                    , number_of_replicas: config['replicas']
                    , max_result_window: "100000"
                    , analysis: {
                        analyzer: {
                            "only_pinyin_analyzer": {
                                "tokenizer": "keyword",
                                "filter": ["only_pinyin", "lowercase", "_pattern"]
                            }, "full_pinyin_analyzer": {
                                "tokenizer": "keyword",
                                "filter": ["full_pinyin", "lowercase", "_pattern"]
                            }
                        }, "tokenizer": {
                            "prefix_pinyin": {
                                "type": "pinyin",
                                "first_letter": "prefix",
                                "padding_char": ""
                            }
                        }, "filter": {
                            "_pattern": {
                                "type": "pattern_replace",
                                "pattern": "([\\W])",
                                "replacement": ""
                            }
                            , "only_pinyin": {
                                "type": "pinyin",
                                "first_letter": "only",
                                "padding_char": ""
                            }
                            , "full_pinyin": {
                                "type": "pinyin",
                                "first_letter": "none",
                                "padding_char": ""
                            }
                        }
                    }
                }
            }
            , mappings: mapping
        }
    }
    //类型
    , mapping: mapping
    //别名
    , alias: {
        index: indexName + '_v1'
        , name: indexName
    }
};