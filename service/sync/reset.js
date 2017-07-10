/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const Good = require('../../modals').shelf_goods
    , index = require('../../indices').shelf_goods;

// 处理mysql查询结果，转换成es数据结构
module.exports = results=> {
    let bulk = [];
    results.forEach(result=> {
        const on_sell_good_id = result.id
            , good = new Good(on_sell_good_id);
        good.db2es(result); // db数据到es的转换
        // 增量数据的为商品的所有数据，无需判断是新建还是更新，直接抹去已有数据
        bulk.push({index: {_index: index.alias.name, _type: Object.keys(index.mapping)[0], _id: on_sell_good_id}});
        bulk.push(good);
    });
    GLO.debug(bulk, 'db2es-bulk');
    return bulk;
};