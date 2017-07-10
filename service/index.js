/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

module.exports = {
    // es 服务
    elasticsearch: require('./elasticsearch')

    // goods 服务

    // es与db 连接服务
    , esdbc: require('./esdbc')
};