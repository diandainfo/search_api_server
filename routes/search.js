/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router();

const goodsService = require('../service').goods;

// 根据 - 用户关键词 - 查询相关商品
router.get('/', (req, res)=> {
    const query = req.query;
    let _ = {
        from: 'offset' in query ? query.offset : 0
        , size: 'limit' in query ? query.limit : 20
        , all: 'all' in query                           // 是否显示全部数据字段
        , highlight: 'highlight' in query ? query.highlight : 'tag'       // 高亮的标签内容
        , store_id: 'sid' in query ? parseInt(query.sid) : -1
        , py: 'py' in query ? query.py : ''
    };
    if ('key' in query && query.key) {
        _.key = query.key;
    } else {
        return res.json(GLO.error('未获取到建议词:key', -11));
    }
    if ('cid' in query && query.cid) {
        _.city_id = parseInt(query.cid);
    } else {
        return res.json(GLO.error('未获取到城市编号:cid', -21));
    }
    if ('aid' in query && query.aid) {
        _.area_id = parseInt(query.aid);
    } else {
        return res.json(GLO.error('未获取到销售区域编号:aid', -31));
    }
    if ('wid' in query && query.wid) {
        _.warehouse_id = parseInt(query.wid);
    } else {
        return res.json(GLO.error('未获取到仓库编号:wid', -41));
    }
    if ('wty' in query && query.wty) {
        _.warehouse_type = parseInt(query.wty);
    } else {
        return res.json(GLO.error('未获取到仓库类型:wty', -45));
    }
    goodsService.search(_)
        .then(result=>res.json({
            status: 1
            , message: ''
            , data: result.results
            , count: result.count
        }))
        .catch(err=>res.json(GLO.error(err, -99)));
});

module.exports = router;