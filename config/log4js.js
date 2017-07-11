/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const homePath = require('path').join(__dirname + '/..');

module.exports = {
    general: {
        appenders: [{
            type: "console"
        }, {
            type: "clustered"
            , appenders: [{
                "type": "dateFile",
                "filename": homePath + "/logs/access/access.log",                 // 请求日志
                "pattern": "-yyyy-MM-dd",
                "category": "access"
            }, {
                "type": "dateFile",
                "filename": homePath + "/logs/search/search.log",                 // 搜索日志
                "pattern": "-yyyy-MM-dd",
                "category": "search"
            }, {
                "type": "dateFile",
                "filename": homePath + "/logs/feedback/feedback.log",             // 反馈日志
                "pattern": "-yyyy-MM-dd",
                "category": "feedback"
            }, {
                "type": "file",
                "filename": homePath + "/logs/sync.log",                          // 同步日志
                "pattern": "-yyyy-MM-dd",
                "maxLogSize": 10 * 1024 * 1024,
                "backups": 2,
                "category": "sync"
            }, {
                "type": "file",
                "filename": homePath + "/logs/app.log",                           // 运行日志
                "maxLogSize": 10 * 1024 * 1024,
                "backups": 3
            }, {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": "file",
                    "filename": homePath + "/logs/errors.log"                     // 错误日志
                }
            }]
        }]
    }
};