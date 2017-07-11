/**
 * Created by zhangrz on 2017/7/11.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router()
    , fs = require('fs')
    , html = require('../public/views/html');

// 无此文档
router.get('/404', (req, res)=>res.send(html.head
    + html.body
    + '<h1>未找到该文档</h1>'
    + html.foot));

// 文档格式化显示
router.get('/*', (req, res)=> {
    const filePath = './public/docs' + req.url;
    fs.access(filePath, err=> {
        if (err) {
            GLO.eLog(err, '未找到文件:' + filePath);
            return res.redirect('/public/docs/404');
        } else {
            return res.send(
                html.head
                + html.body
                + html.reset(require('marked')(fs.readFileSync('./public/docs' + req.url, 'utf-8')))
                + html.foot
            );
        }
    });
});

module.exports = router;