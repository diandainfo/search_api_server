/**
 * Created by zhangrz on 2017/6/16.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const config = require('../config')['es']
    , indexName = 'shelf_goods';

const mapping = {
    info: {
        properties: {
            good_id: {type: "integer"}
            // ----- 全文搜索、搜索建议字段
            , title: {type: "keyword"}      // 商品名称
            , title_ik_smart: {
                type: "text"
                , analyzer: "ik_smart"
                , search_analyzer: "ik_smart"
                , term_vector: 'with_positions_offsets'
            }, title_ik_max: {
                type: "text"
                , analyzer: "ik_max_word"
                , search_analyzer: "ik_max_word"
                , term_vector: 'with_positions_offsets'
            }, title_pinyin_only: {
                type: "completion"
                , analyzer: "only_pinyin_analyzer"
                , search_analyzer: 'only_pinyin_analyzer'
                , preserve_separators: false                // 忽略分隔符
                , contexts: [{
                    type: 'category'
                    , name: 'city_id'
                    , path: 'city_id'
                }]
            }, title_pinyin_full: {
                type: "completion"
                , analyzer: "full_pinyin_analyzer"
                , search_analyzer: 'full_pinyin_analyzer'
                , preserve_separators: false
                , contexts: [{
                    type: 'category'
                    , name: 'city_id'
                    , path: 'city_id'
                }]
            }

            // ----- 销售筛选条件
            , city_id: {type: "integer"}                    // 城市编号
            , area_id: {type: "integer"}                    // 可销售区域编号
            , warehouse_id: {type: "integer"}               // 仓库编号
            , warehouse_boo: {type: "boolean"}              // 是否为前置仓、主仓冲突
            , state: {type: "integer"}                      // 销售状态

            // ----- 实时数据
            , stock: {type: "integer"}                      // 库存数量

            // ----- 标签过滤
            , first_catalog_id: {type: "integer"}           // 一级分类编号
            , second_catalog_id: {type: "integer"}          // 二级分类编号
            , first_catalog_name: {type: "keyword"}         // 一级分类名称
            , second_catalog_name: {type: "keyword"}        // 二级分类名称
            , activity_tags: {type: "keyword"}              // 活动标签
            //TODO 品牌标签
            //TODO 小品牌标签
            //TODO 额外的搜索标签

            // ----- 时间字段
            , update_at: {type: "date"}                     // 更新时间,用于kibana时间过滤
            , update_timestamp: {type: "long"}              // 更新时间戳
            , create_timestamp: {type: "long"}              // 创建时间戳
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