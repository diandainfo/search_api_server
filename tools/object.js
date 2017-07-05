/**
 * Created by zhangrz on 2017/7/5.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const obj = {
    k1: 1
    , k2: 2
};

// 参考 http://es6.ruanyifeng.com/#docs/object#属性的遍历

// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）。
// 遍历对象所有keys
Object.keys(obj).map(k=>console.info(obj[k]));