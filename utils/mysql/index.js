/**
 * Created by zhangrz on 2017/6/20.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created mysql数据库连接
 */

"use strict";

const mysql = require('mysql')
    , config = require('../../config').mysql;

const connection = mysql.createConnection(config);

module.exports = {
    // 调用查询方法
    query: sql=>new Promise((resolve, reject)=> {
        connection.connect();                       // 建立连接
        connection.query(sql, (error, results)=> {  // 发送请求
            if (error) {
                reject(error);
            } else {
                connection.end();                   // 断开连接
                resolve(results);
            }
        });
    })
};