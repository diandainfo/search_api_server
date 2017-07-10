/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created  获取数据库中数据
 */

"use strict";

const fs = require('fs')
    , mysql = require('../../utils/mysql');

const _ = {
    // 查询goods数据的sql语句
    getGoodsSQL: ()=>new Promise((resolve, reject)=>
        fs.readFile('../../sql/shelf_goods.sql'     // 不能直接使用require，特殊字符导致js解析失败，如: `
            , 'utf8'
            , (error, sql)=> {
                if (error) {
                    reject(error);
                } else {
                    resolve(sql);
                }
            })
    )

    // 获取goods数据
    , getGoodsData: mysql.query

};

module.exports = _;
