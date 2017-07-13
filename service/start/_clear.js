/**
 * Created by zhangrz on 2017/7/13.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

global.GLO = require('../../utils/global');

const redis = require('redis')
    , config = require('../../config').redis;

// 同步时间戳
const KEY = 'search_api_server_sync_timestamp';

// 删除redis中的时间标记，重新进行冷启动
const run = ()=> {
    const client = redis.createClient(config);
    client.del(KEY);
    client.quit();
};

run();