/**
 * Created by zhangrz on 2017/7/11.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

module.exports = {
    // 头部
    head: '<!doctype html>' +
    '\n<html lang="zh-CN">' +
    '\n<head>' +
    '\n  <title>Search_api_server 接口文档</title>' +
    '\n  <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">' +
    '\n  <!-- 本页面通过 https://github.com/chjj/marked 生成 -->' +
    '\n</head>'

    // 主体
    , body: '\n<body>' +
    '\n  <div class="container">'

    // 表格头部
    , table: '<table class="table table-bordered table-condensed table-hover table-striped">' +
    '<thead><tr class="info">'

    // 样式转换
    , reset: function (str) {
        return str.replace(/<table>[\s\S]<thead>[\s\S]<tr>/g, this.table);
    }

    // 底部
    , foot: '</div>' +
    '\n  <footer>' +
    '\n    <div class="container" style="margin-bottom: 24px;">' +
    '\n      <div class="col-sm-2">©2017 DiandaInfo. </div>' +
    '\n      <div class="col-sm-2">遵循<a href="https://github.com/diandainfo/search_api_server/blob/master/LICENSE"> MIT </a>协议</div>' +
    '\n      <div class="col-sm-2"><a href="https://github.com/diandainfo/search_api_server">@GitHub</a></div>' +
    '\n    </div>' +
    '\n  </footer>' +
    '\n</body>' +
    '\n</html>'
};