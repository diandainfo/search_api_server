/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const router = require('express').Router();

// 心跳监听接口
router.get('/listener', (req, res)=>res.json(GLO.success(true)));

// 请求日志
router.use((req, res, next)=> {
    GLO.access(req);
    next();
});

// 响应日志
router.use(GLO.log4js.connectLogger(GLO.log4js.getLogger('access'), {
    level: 'INFO'
    , format: ':remote-addr  :method  :url  :status  :response-time' + 'ms'
}));

// TODO 内网访问权限

// 搜索建议
router.use('/suggest', require('./suggest'));

// 搜索关键词
router.use('/search', require('./search'));

// 错误拦截
router.use((err, req, res, next)=> {
    if (err) {
        try {
            GLO.eLog({
                method: req.method,
                url: req.originalUrl,
                message: err.message,
                stack: err.stack
            });
        } catch (e) {
            GLO.eLog(err);
        }
    }
    // 开发者模式下调用error2Handler
    if (GLO.isDev()) {
        require('errorhandler')()(err, req, res, next);
    } else {
        return res.json({
            message: "请求发生错误",
            error: err.status
        });
    }
});

// 404拦截
router.use((req, res)=> {
    GLO.log(' 无效的请求地址 ,' + GLO.access(req), '404');
    return res.json({
        message: "无效的请求地址"
        , status: 404
    });
});

module.exports = router;