/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// redis 记录

const redis = require('redis')
    , config = require('../../config').redis;

// 同步时间戳
const KEY = 'search_api_server_sync_timestamp';

const _ = {
    // redis 客户端
    client: ()=>redis.createClient(config)

    // 写入数据
    , save: timestamp=> {
        const client = _.client();
        client.set(KEY, timestamp);
        client.quit();
    }

    // 读取数据
    , read: ()=> new Promise((resolve, reject)=> {
        const client = _.client();
        client.get(KEY, (err, reply)=> {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    })
};

module.exports = _;