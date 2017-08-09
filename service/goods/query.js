/**
 * Created by zhangrz on 2017/7/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 筛选条件

module.exports = data=> {
    let filter = [] // 使用filter query代替query
        , bool = {
        must_not: [{
            term: {
                area_id: data.area_id
            }
        }]
    };
    if (data.state !== -1) { // 销售状态为-1，则显示全部
        filter.push({
            term: {
                state: data.state  // 销售状态为正常销售
            }
        });
    }
    if (data.warehouse_type === 1) { // 主仓
        filter = filter.concat([{
            term: {
                city_id: data.city_id
            }
        }, {
            term: {
                warehouse_id: data.warehouse_id
            }
        }, {
            term: {
                warehouse_type: 1
            }
        }]);
    } else if (data.warehouse_type === 2) { // 前置仓
        bool.must = [{
            bool: {
                should: [{// 该前置仓下
                    bool: {
                        must: [{
                            term: {
                                city_id: data.city_id
                            }
                        }, {
                            term: {
                                warehouse_id: data.warehouse_id
                            }
                        }, {
                            term: {
                                warehouse_type: 2
                            }
                        }]
                    }
                }, {// 对应主仓中商品
                    bool: {
                        must: [{
                            term: {
                                city_id: data.city_id
                            }
                        }, {
                            term: {
                                warehouse_type: 1
                            }
                        }]
                    }
                }]
                , minimum_should_match: 1
            }
        }];
        filter.push({ // 前置仓商品与主仓商品冲突，只显示前置仓商品
            term: {
                warehouse_conflict: 1
            }
        });
    }
    return {bool, filter};
};