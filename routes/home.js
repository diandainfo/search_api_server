/**
 * Created by zhangrz on 2017/6/30.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router();

// 首页 显示README.md 内容
router.get('/', (req, res)=>res.send(require('marked')(require('fs').readFileSync('./README.md', 'utf-8'))));

module.exports = router;