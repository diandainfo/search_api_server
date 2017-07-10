/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

// 测试sql查询

"use strict";

global.GLO = require('../../utils/global');

const _ = require('./index');

_.mysql
    .getGoodsSQL('2017-01-01 00:00:00')
    .then(sql=>_.mysql.getGoodsData(sql))
    .then(results=>_.reset(results))
    .catch(error=>console.error(error));
