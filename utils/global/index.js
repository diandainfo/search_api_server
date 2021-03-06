/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const packageConfig = require('../../package.json');

const _ = {
    ENV: process.env.NODE_ENV || 'development'      // 环境变量
    , SYS_NAME: packageConfig.name                  // 项目名称
    , SYS_VERSION: packageConfig.version            // 项目版本
    , TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss'            // 标准时间格式串
    , DATE_FORMAT: 'YYYY-MM-DD'                     // 标准日期格式串
    , isDev: ()=>GLO.ENV === 'development'          // 是否为开发环境
    , isPro: ()=>GLO.ENV === 'production'           // 是否为生产环境
    , success: data=>({status: 1, message: '', data: data})         // 成功的返回
    // 错误返回并记录相关信息
    , error: (error, status = -1, msg = '')=> {
        if (typeof error === 'string') {  // error为错误信息时直接输出
            return {
                status: status
                , message: error
                , data: null
            };
        } else {
            GLO.logger('error').error(error);// 记录错误信息
            return {
                status: status
                , message: msg
                , data: null
            };
        }
    }
};

module.exports = Object.assign(
    _
    , require('./logger')
    , require('./sync')
);