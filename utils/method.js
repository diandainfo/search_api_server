/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

// 标准方法
module.exports = {
    /**
     * nginx转发后获取实际IP信息
     * @param req
     * @returns {*}
     */
    ip: (req)=> {
        let ip = req.get('x-forwarded-for'); // 获取代理前的ip地址
        if (ip && ip.split(',').length > 0) {
            ip = ip.split(',')[0];
        } else {
            ip = req.connection.remoteAddress;
        }
        const ipArr = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g);
        return ipArr && ipArr.length > 0 ? ipArr[0] : '127.0.0.1';
    }

    /**
     * 获取本机网卡对应的IP
     * @returns {*}
     */
    , getLocalIp: ()=> {
        let eth = 0; // 网卡序号，默认为0
        const interfaces = require('os').networkInterfaces();   // 获取网卡信息（包括虚拟网卡）
        for (let dev in interfaces) {
            if (interfaces.hasOwnProperty(dev)) {
                // 读取设置的网卡信息
                let face = interfaces[dev];
                if (('eth' + eth) in interfaces) { // 若无该网卡，则循环读取
                    face = interfaces['eth' + eth];
                }
                for (let i = 0, len = face.length; i < len; i++) {
                    const alias = face[i];
                    // 读取到第一个IPv4制式的网卡地址
                    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                        return alias.address;
                    }
                }
            }
        }
    }
};