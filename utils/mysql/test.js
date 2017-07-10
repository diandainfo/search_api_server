/**
 * Created by zhangrz on 2017/7/7.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

"use strict";

global.GLO = require('../global');

// 测试连接
const mysql = require('./index');

mysql.query('select count(*) AS count from test')
    .then(r=>console.info(r))
    .catch(e=>console.error(e));