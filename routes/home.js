/**
 * Created by zhangrz on 2017/6/30.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router();

// 首页 显示README.md 内容
router.get('/', (req, res)=>res.send(
        '<!doctype html>' +
        '<html lang="zh-CN">' +
        '<head><link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"></head>' +
        '<body>' +
        '<div class="container">' +
        require('marked')(require('fs').readFileSync('./README.md', 'utf-8'))
            .replace('<table>','<table class="table table-bordered table-condensed table-hover table-striped">') +
        '</div></body></html>'
    )
);

module.exports = router;