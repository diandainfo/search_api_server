/**
 * Created by zrz on 2017/3/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

module.exports = {
    general: {
        appenders: [{
            type: "console"
        }, {
            type: "clustered"
            , appenders: [{
                "type": "dateFile",
                "filename": "./logs/access/access.log",                 // 请求日志
                "pattern": "-yyyy-MM-dd",
                "category": "access"
            }, {
                "type": "dateFile",
                "filename": "./logs/search/search.log",                 // 搜索日志
                "pattern": "-yyyy-MM-dd",
                "category": "search"
            }, {
                "type": "dateFile",
                "filename": "./logs/feedback/feedback.log",             // 反馈日志
                "pattern": "-yyyy-MM-dd",
                "category": "feedback"
            }, {
                "type": "file",
                "filename": "./logs/app.log",                           // 运行日志
                "maxLogSize": 10485760,
                "numBackups": 3
            }, {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": "file",
                    "filename": "./logs/errors.log"                     // 错误日志
                }
            }]
        }]
    }
};