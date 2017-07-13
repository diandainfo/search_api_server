/**
 * Created by zhangrz on 2017/6/20.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

// 定时任务

"use strict";

const schedule = require('node-schedule');

const syncService = require('../sync');

const _ = {
    // 每日6-23点 每心跳(30s)检查一次同步数据
    syncEveryHeart: ()=> {
        const job = schedule.scheduleJob('*/30 * 6-23 * * *', ()=> {
            syncService.syncEveryHeart()
                .then(result=>GLO.sync(result))
                .catch(err=> {
                    GLO.eLog(err);
                    job.cancel();
                });
        });
        GLO.log(' √ 定时任务:每次心跳同步数据 - 创建成功 --', 'start');
    }

    // 每日00:30:30点 开始检查前一日同步数据
    , syncToday: ()=> {
        const job = schedule.scheduleJob('30 30 0 * * *', ()=> {

        });
        GLO.log(' √ 定时任务:前日数据检查 - 创建成功 --', 'start');
    }

    // 每日6-23点 每30分钟存一次同步时间戳
    //TODO 每隔30小时的，7、37执行
    , saveTimestamp: ()=> {
        schedule.scheduleJob('55 24/30 6-23 * * *', ()=> {
            syncService.redis.save(GLO.sync_timestamp);
        });
        GLO.log(' √ 定时任务:Redis存储时间戳 - 创建成功 --', 'start');
    }
};

module.exports = ()=> {
    GLO.log('----- 开始创建定时任务 -----', 'start');
    // _.syncEveryHeart();
    _.saveTimestamp();
};