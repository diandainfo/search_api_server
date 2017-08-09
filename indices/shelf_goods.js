/**
 * Created by zhangrz on 2017/6/16.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const config = require('../config')['es']
    , indexName = 'shelf_goods';

// Contexts Suggester
const contexts = [{
//     type: 'category'
//     , name: 'city_id'
//     , path: 'city_id'
// }, {
//     type: 'category'
//     , name: 'warehouse_id'
//     , path: 'warehouse_id'
// }, {
//     type: 'category'
//     , name: 'warehouse_type'
//     , path: 'warehouse_type'
// }, {
//     type: 'category'
//     , name: 'warehouse_conflict'
//     , path: 'warehouse_conflict'
// }, {
    type: 'category'
    , name: 'state'
    , path: 'state'
}, {
    type: 'category'
    , name: 'stock'
    , path: 'stock'
}];

const mapping = {
    info: {
        properties: {
            good_id: {type: "integer"}                      // sku商品编号
            , on_sell_good_id: {type: "integer"}            // 货架商品编号
            // ----- 全文搜索、搜索建议字段
            , title: {type: "keyword"}      // 商品名称
            , title_ik_smart: {
                type: "text"
                , analyzer: "ik_smart"
                , search_analyzer: "ik_smart"
                , term_vector: 'with_positions_offsets'
            }
            , title_ik_max: {
                type: "text"
                , analyzer: "ik_max_word"
                , search_analyzer: "ik_max_word"
                , term_vector: 'with_positions_offsets'
            }
            , title_pinyin_only: {
                type: "completion"
                , analyzer: "only_pinyin_analyzer"
                , search_analyzer: 'only_pinyin_analyzer'
                , preserve_separators: false                // 忽略分隔符
                // TODO boost 纠错词
                // , contexts: contexts                     // fixme Contexts suggester 效率有问题
            }
            , title_pinyin_full: {
                type: "completion"
                , analyzer: "full_pinyin_analyzer"
                , search_analyzer: 'full_pinyin_analyzer'
                , preserve_separators: false
                // , contexts: contexts
            }

            // ----- 销售筛选条件
            , city_id: {type: "integer"}                    // 城市编号
            , area_id: {type: "integer"}                    // 不可销售区域编号
            , warehouse_id: {type: "integer"}               // 仓库编号
            , warehouse_type: {type: "integer"}             // 仓库类型:1是主仓，2是前置仓
            , warehouse_conflict: {type: "integer"}         // 是否为前置仓、主仓冲突:0是冲突，1是非冲突
            , state: {type: "integer"}                      // 销售状态:0是已下架，1是正常销售

            // ----- 实时数据
            , stock: {type: "integer"}                      // 库存数量
            // ----- 统计数据
            , statistics_weight: {type: "integer"}          // 统计权重:浏览次数

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