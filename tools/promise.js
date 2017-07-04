/**
 * Created by zhangrz on 2017/7/4.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const promise1 = ()=>new Promise((resolve)=>resolve(111));

const promise2 = r=>r ? new Promise((resolve)=>resolve(222)) : 333;

const promise3 = ()=>false;

promise1()
    .then(promise3)
    .then(promise2)
    .then(r=>console.info(r))
    .catch(e=>console.error(e));