/**
 * Created by zhangrz on 2017/6/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

const CONFIG = {
    development: require('./config_development')
    , test: require('./config_test')
    // , experience: require('./config_experience')
    // , stage: require('./config_stage')
    // , production: require('./config_production')
};

module.exports = CONFIG[process.env.NODE_ENV || 'development'];