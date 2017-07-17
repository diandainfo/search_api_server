/**
 * Created by zhangrz on 2017/6/19.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

"use strict";

class Shelf_Goods {
    constructor(on_sell_good_id) {
        this.on_sell_good_id = parseInt(on_sell_good_id);
    }

    // MySQL导入数据到ElasticSearch中
    db2es(g) {
        this._title = g.title;      // 写入多个商品名称中
        this.city_id = g.city_id;
        if ('area_id' in g) {
            try {
                this.area_id = JSON.parse(g.area_id || []);
            } catch (e) {
                this.area_id = [];
            }
        } else {
            this.area_id = [];
        }
        this.warehouse_id = g.warehouse_id;
        this.warehouse_type = g.warehouse_type;
        this.warehouse_conflict = g.warehouse_conflict;
        this.good_id = g.good_id;
        this.stock = parseInt(g.stock || 0);
        this.first_catalog_id = g.first_catalog_id;
        this.second_catalog_id = g.second_catalog_id;
        this.first_catalog_name = g.first_catalog_name;
        this.second_catalog_name = g.second_catalog_name;
        this.state = g.state ? 1 : 0;
        this.setUpdatedAt();
        this.setCreateTS(new Date(g.create_at).getTime());
        this.setUpdateTS(new Date(g.update_at).getTime());
    }

    // ElasticSearch 数据输出 到api
    es2api(source) {
        this.id = this.on_sell_good_id;
        delete this.on_sell_good_id;
        this.name = source.title;
    }

    // ElasticSearch 结果全字段输出
    es2all(source) {
        this.es2api(source);
        this.cid = source.city_id;
        this.state = source.state;
        this.stock = source.stock;
        this.wid = source.warehouse_id;
        this.wty = source.warehouse_type;
        this.wcf = source.warehouse_conflict;
        this.fci = source.first_catalog_id;
        this.sci = source.second_catalog_id;
        this.fcn = source.first_catalog_name;
        this.scn = source.second_catalog_name;
        this.updateAt = source.update_at;
        this.gid = source.good_id;
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