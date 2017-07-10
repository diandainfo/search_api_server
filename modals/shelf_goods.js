/**
 * Created by zhangrz on 2017/6/19.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

class Shelf_Goods {
    constructor(good_id) {
        this.good_id = parseInt(good_id);
    }

    // MySQL导入数据到ElasticSearch中
    db2es(g) {
        this._title = g.title;      // 写入多个商品名称中
        this.setUpdatedAt();
        this.setCreateTS(new Date(g.create_at).getTime());
        this.setUpdateTS(new Date(g.update_at).getTime());
    }

    // 写:商品名称
    setTitle(title) {
        this.title = title;
        this.title_ik_smart = title;
        this.title_ik_max = title;
        this.title_pinyin_only = title;
        this.title_pinyin_full = title;
    }

    // 写:商品名称
    set _title(title) {
        this.setTitle(title);
    }

    // 读:商品名称
    get _title() {
        return this.title;
    }

    // 写:更新时间
    setUpdateTS(ts) {
        this.update_timestamp = parseInt(ts);
    }

    // 写:创建时间
    setCreateTS(ts) {
        this.create_timestamp = parseInt(ts);
    }

    // 写:时间标记
    setUpdatedAt() {
        this.update_at = new Date();
    }
}

module.exports = Shelf_Goods;