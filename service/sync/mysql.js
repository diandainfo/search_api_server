/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created  获取数据库中数据
 */

"use strict";

const fs = require('fs')
    , mysql = require('../../utils/mysql');

const PAGE_LENGTH = 10000;

const _ = {
    // 查询goods数据的sql语句
    getGoodsSQL: (dateTime = '1970-01-01 00:00:00', offset = 0, limit = 10000)=>new Promise((resolve, reject)=>
        fs.readFile('../../sql/shelf_goods.sql'     // 不能直接使用require，特殊字符导致js解析失败，如: `
            , 'utf8'
            , (error, sql)=> {
                if (error) {
                    reject(GLO.eLog(error, '获取商品数量出错'));
                } else {
                    resolve(sql
                        + '\nWHERE '
                        + '\n  on_sell_goods.updatedAt >= \'' + dateTime + '\''
                        + '\nLIMIT ' + offset + ',' + limit
                    );
                }
            })
    )

    // 查询goods数据count值的sql语句
    , getGoodsCountSQL: (dateTime = '1970-01-01 00:00:00')=>new Promise((resolve, reject)=>
        fs.readFile('../../sql/shelf_goods_count.sql'     // 不能直接使用require，特殊字符导致js解析失败，如: `
            , 'utf8'
            , (error, sql)=> {
                if (error) {
                    reject(GLO.eLog(error, '获取商品数据出错'));
                } else {
                    resolve(sql + '\nWHERE \n  on_sell_goods.updatedAt >= \'' + dateTime + '\'');
                }
            })
    )

    // 获取goods数据
    , getGoodsData: mysql.query

};

module.exports = _;