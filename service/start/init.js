/**
 * Created by zhangrz on 2017/7/12.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const syncService = require('../sync');

// 项目启动的初始化
const _ = {
    // Redis中同步时间戳写入到全局变量
    readTimestamp: ()=> new Promise((resolve, reject)=>
        syncService.redis
            .read()
            .then(timstamp=> {
                GLO.log(' √ Redis中同步时间戳 读取成功 --');
                GLO.sync_timestamp = parseInt(timstamp);
                resolve();
            })
            .catch(err=>reject(GLO.eLog(err, ' × Redis中同步时间戳 读取失败')))
    )
};

module.exports = ()=>new Promise((resolve, reject)=> {
    GLO.log('----- 项目启动初始化', 'start');
    _.readTimestamp()
        .then(()=>resolve(true))
        .catch(error=>reject(error));
});