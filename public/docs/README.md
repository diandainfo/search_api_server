
# 接口文档

## 1. GET - /suggest

**1.1 简要描述：**
- 根据关键词(的拼音)获取建议的搜索关键词

**1.2 请求URL：**
- ` /suggest `

**1.3 请求方式：**
- GET

**1.4 请求参数：**

|参数名|必选|类型|默认值|说明|
|:----|:---|:-----|:-----|-----|
|key|是|String|-|搜索建议词，进行非\[中文、英文、数字\]的过滤匹配|
|weight|否|-|false|是否返回权重，默认不显示|
|limit|否|Int|10|返回搜索关键词条数|

**1.5 请求、响应实例**

- 1.5.1 标准请求响应：
  - 请求：
  	```
  	/suggest?key=ksf
  	```
  - 响应：
  	```
    {
        "status": 1,
        "message": "",
        "data": [
            "康师傅",
            "康师傅冰红茶",
            "康师傅矿泉水",
            "康师傅水",
            "康师傅绿茶",
            "康师傅冰糖雪梨",
            "康师傅冰绿茶",
            "康师傅茉莉蜜茶",
            "康师傅茉莉清茶",
            "康师傅酸梅汤"
        ]
    }
  	```
- 1.5.2 显示权重的请求响应
  - 请求：
    ```
    /suggest?key=ksf&weight=1&limit=1
    ```
  - 响应：
    ```
    {
        "status": 1,
        "message": "",
        "data": [
            {
                "keyword": "康师傅",
                "weight": 6139350
            }
        ]
    }
    ```

**1.6 返回参数说明**

|参数名||类型|说明|
|:----|:---|:---|:-----|
|data|-|\<Array\>Object|-|
||keyword|String|搜索关键词，`weight`不返回时仅返回搜索关键词|
||weight|Int|权重，仅用于排序|

***

## 2. GET - /search

**2.1 简要描述：**
- 根据搜索词获取相关商品

**2.2 请求URL：**
- ` /search `

**2.3 请求方式：**
- GET

**2.4 请求参数：**

|参数名|必选|类型|默认值|说明|
|:----|:---|:-----|:-----|-----|
|key|是|String|-|搜索关键词，进行非\[中文、英文、数字\]的过滤匹配|
|cid|是|Int|-|城市编号|
|aid|是|Int|-|销售区域编号|
|wid|是|Int|-|仓库编号|
|wty|是|Int|-|仓库类型：1是主仓，2是前置仓|
|offset|否|Int|0|初始量|
|limit|否|Int|20|偏移量|
|all|否|-|false|有值存在则为`true`|
|highlight|否|string|tag|高亮的标签内容,即`<tag>高亮词</tag>`|
|sid|否|Int|-1|店铺编号|
|py|否|String|-|搜索建议的反馈：拼音；务必写入搜索建议时输入的拼音|
|state|否|Int|-1|销售状态:0是已下架，1是正常销售；默认显示全部|

**2.5 请求、响应实例**

- 2.5.1 标准请求响应：
  - 请求：
  	```
  	/search?key=可乐&cid=320600&aid=1&wid=8&wty=1&py=kl
  	```
  - 响应：
  	```
    {
        "status": 1,
        "message": "",
        "data": [
            {
                "id": 123821,
                "name": "百事可乐600ml*24瓶/箱*1箱",
                "highlight": "百事<tag>可乐</tag>600ml*24瓶/箱*1箱"
            },
            {
                "id": 123991,
                "name": "可口可乐 600ml*24瓶/箱*1箱",
                "highlight": "可口<tag>可乐</tag> 600ml*24瓶/箱*1箱"
            }
        ],
        "count": 2
    }
  	```
- 2.5.2 `all = true` 全字段请求响应
  - 请求：
    ```
    /search?key=康师傅&cid=320200&aid=158&wid=17&wty=2&limit=1&all=1
    ```
  - 响应：
    ```
    {
        "status": 1,
        "message": "",
        "data": [
            {
                "id": 125587,
                "name": "康师傅11",
                "cid": 320200,
                "state": 1,
                "stock": -2575,
                "wid": 17,
                "wty": 2,
                "wcf": 1,
                "fci": 3000000,
                "sci": 3010000,
                "fcn": "食品",
                "scn": "休闲零食",
                "updatedAt": "2017-08-04T16:30:30.145Z",
                "gid": 137452,
                "highlight": "<tag>康师傅</tag>11"
            }
        ],
        "count": 47
    }
    ```
- 2.5.3 高亮标签改变的请求
  - 请求：
    ```
    /search?key=康师傅&cid=320200&aid=158&wid=17&wty=2&limit=1&highlight=div
    ```
  - 响应：
    ```
    {
        "status": 1,
        "message": "",
        "data": [
            {
                "id": 125587,
                "name": "康师傅11",
                "highlight": "<div>康师傅</div>11"
            }
        ],
        "count": 47
    }
    ```
**2.6 返回参数说明**

|参数名||类型|说明|
|:----|:---|:---|:-----|
|data|-|\<Array\>Object|-|
||id|Int|货架商品编号|
||name|String|商品名称|
||cid|Int|城市编号|
||state|Int|销售状态:0是已下架，1是正常销售|
||stock|Int|库存量|
||wid|Int|仓库编号|
||wty|Int|仓库类型|
||fci|Int|一级分类编号|
||sci|Int|二级分类编号|
||fcn|String|一级分类名称|
||scn|String|二级分类名称|
||updatedAt|String|更新时间|
||gid|Int|sku商品编号|
||score|Float|动态分，搜索结果评分，仅用于排序|
||highlight|String|高亮词|

***
