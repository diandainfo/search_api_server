/**
 * Created by zhangrz on 2017/6/30.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router()
    , html = require('../public/views/html');

// 首页 显示README.md 内容
router.get('/', (req, res)=>res.send(html.head
    + html.body
    + html.reset(require('marked')(require('fs').readFileSync('./README.md', 'utf-8')))
    + html.foot)
);

module.exports = router;