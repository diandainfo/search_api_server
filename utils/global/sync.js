/**
 * Created by zhangrz on 2017/7/10.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

// 同步任务的内存标记

"use strict";

module.exports = {
    // 上一次同步时间戳
    sync_timestamp: 0

    // 临时同步时间戳
    , temp_timestamp: 0

    // 是否有不同任务在执行
    , sync_boo: false
};