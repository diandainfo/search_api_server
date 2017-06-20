/**
 * Created by zrz on 2017/3/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

global.GLO = require("./utils/global");

const express = require("express")
    , bodyParser = require("body-parser")
    , config = require("./config");

require('events').EventEmitter.defaultMaxListeners = 0;

// 实例化express
let app = express();
app.use(bodyParser.urlencoded({limit: "5mb", extended: true}));
app.use(bodyParser.json({limit: "5mb"}));

// 设置代理路由的解析
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

// 路由逻辑
app.use("/", require("./routes"));

app.listen(config.sys.port, ()=> {
    GLO.log("GLO - Search_api_server 服务监听启动 ," +
        "  当前环境:" + GLO.ENV + "  ," +
        "  监听端口:" + config.sys.port
        , 'start');
    require('./service').elasticsearch.run();
});

module.exports = app;