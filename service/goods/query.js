/**
 * Created by zhangrz on 2017/7/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 筛选条件

module.exports = data=> ({
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
                warehouse_type: data.warehouse_type
            }
        }, {
            term: {
                state: 1  // 销售状态为正常销售
            }
        }, {
            range: {
                stock: {
                    gt: 0
                }
            }
        }]
        , must_not: [{
            term: {
                area_id: data.area_id
            }
        }]
    }
});