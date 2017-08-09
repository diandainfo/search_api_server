/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router();

const goodsService = require('../service').goods;

// 根据 - 用户输入 - 进行建议
router.get('/', (req, res)=> {
    const query = req.query;
    let _ = {
        size: 'limit' in query ? parseInt(query.limit) || 10 : 10
        , weight: 'weight' in query && !!query.weight
    };
    if ('key' in query && query.key) {
        // 进行非(中文、英文、数字)的过滤
        const _key = query.key.replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '');
        if (_key) {
            _.key = _key;
        } else {
            return res.json(GLO.error('请输入中文、英文、数字进行查询:key', -10));
        }
    } else {
        return res.json(GLO.error('未获取到建议词:key', -11));
    }
    // if ('cid' in query && query.cid) {
    //     _.city_id = parseInt(query.cid);
    // } else {
    //     return res.json(GLO.error('未获取到城市编号:cid', -21));
    // }
    // if ('aid' in query && query.aid) {
    //     _.area_id = parseInt(query.aid);
    // } else {
    //     return res.json(GLO.error('未获取到销售区域编号:aid', -31));
    // }
    // if ('wid' in query && query.wid) {
    //     _.warehouse_id = parseInt(query.wid);
    // } else {
    //     return res.json(GLO.error('未获取到仓库编号:wid', -41));
    // }
    // if ('wty' in query && query.wty) {
    //     _.warehouse_type = parseInt(query.wty);
    // } else {
    //     return res.json(GLO.error('未获取到仓库类型:wty', -45));
    // }
    goodsService.suggest(_)
        .then(result=>res.json(GLO.success(result)))
        .catch(err=>res.json(GLO.error(err, -99)));
});

module.exports = router;