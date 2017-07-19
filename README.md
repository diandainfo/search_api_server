
# 搜索服务
提供基于多维度的搜索服务

## 启动说明

## 项目说明
- 整体项目说明见个文件夹目录下 `README.md`
- 部分目录下存在 `test.js`，用于开发时测试当前目录的功能，同时也是调用实例

## 接口文档
- 接口仅限内网访问
- #### 具体文档见 [public/docs/README.md](./public/docs/README.md)

> 感谢 [chjj/marked@GitHub](https://github.com/chjj/marked)，MarkDown文档基于此生成html

## 项目进度

|级联号|任务|备注|节点|
|:---|:---|:---|---|
|0|Elastic Stack安装|见 [./doc/Installation.md](https://github.com/diandainfo/search_api_server/blob/master/doc/Installation.md)|-|
|0.1|`system_call_filter`配置|*待刷*||
|0.2|`Kibana`安装与配置|*待刷*||
|0.3|`ElasticSearch` 5.4.3 安装与运行|-|2017年7月6日|
|0.4|`ElasticSearch-head` 5.x 安装与运行|-|2017年7月6日|
|0.5|`ElasticSearch-analysis-ik` 5.4.3 安装|-|2017年7月7日|
|0.6|`ElasticSearch-analysis-pinyin` 5.4.3 安装|-|2017年7月7日|
|0.7|`Logstash` 5.4.3 安装|-||
|0.8|`Filebeat` 5.4.3 安装|-||
|-||||
|1|ES索引数据结构搭建|-|-|
|1.0|ES连接创建、节点分离||2017年7月4日|
|1.1|ES节点连接||2017年7月4日|
|1.2|别名、索引检查|先检查别名，后索引|2017年7月5日|
|1.3|别名、索引创建|setting > mapping > alias|2017年7月7日|
|1.4|ES定时任务|-|-|
|1.4.1|时间戳同步任务|-|2017年7月12日|
|1.4.2|心跳数据同步任务|具体见2|2017年7月11日|
|1.4.3|单日数据检查任务|-|2017年7月14日|
|1.6|ES索引数据结构设计|-|2017年7月14日|
|1.6.1|增加`Completion Suggester`|-|2017年7月14日|
|1.6.2|增加`Context Suggester`|-|2017年7月14日|
|1.7|项目启动初始化|-|2017年7月13日|
|1.8|数据冷启动|-|2017年7月13日|
|-||||
|2|数据同步逻辑|-|-|
|2.0|Mysql-jdbc连接|-|2017年7月7日|
|2.1|同步时间戳的读写|-|2017年7月11日|
|2.2|SQL语句编写|-|2017年7月14日|
|2.3|DB数据转换为ES结构体|-|2017年7月10日|
|2.4|通过bulk向ES写入商品数据|-|2017年7月10日|
|2.6|互斥商品的同步逻辑|-|2017年7月14日|
|2.7|项目启动逻辑的判断|-||
|-||||
|3|日志数据收集与分析|-|-|
|3.0|日志记录器log4js定义|-|2017年7月11日|
|3.1|搜索记录日志格式定义与收集|||
|3.2|搜索记录的fileBeats-ELK|||
|3.3|搜索记录的关键词聚合|||
|3.6|反馈记录日志格式定义与收集|||
|3.7|同步日志格式定义与收集|-|2017年7月11日|
|-||||
|4|接口文档|-|-|
|4.1|接口文档结构|-|2017年7月11日|
|4.2|接口文档的路由解析|-|2017年7月11日|
|4.3|接口文档的标准样式|-|2017年7月11日|
|-||||
|5|接口实现|-|-|
|5.1|搜索建议接口|||
|5.2|搜索关键词接口|||
|-||||
|6|搜索日志分析|||


## 参考文档
> [Elasticsearch Suggester详解][1001]

[1001]: https://elasticsearch.cn/article/142