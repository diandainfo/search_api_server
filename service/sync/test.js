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
    .getGoodsCountSQL()
    .then(sql=>_.mysql.getGoodsData(sql))
    .then(results=>console.info(results))
    .catch(error=>console.error(error));
