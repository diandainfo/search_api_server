
# Instruction - 说明

## Connection - 连接

### NodeJs 使用 Elasticsearch.js 连接 Elasticsearch 集群
- 需要使用 `user` + `password` 建立连接
  - > [elasticsearch.js » SSL and Authentication » Basic Auth][1]

## 技术升级
### DB >> ES 数据同步
- 已有问题:
  * 使用`Elasticsearch-jdbc`进行增量数据同步
  * 内存占用率较大，且容易崩溃导致数据缺失
- 解决方案:
  * 改为通过 `SQL` 获取 `MySQL` 中数据，通过 `Elasticsearch.js` 将数据写入到 `Elasticsearch`
  * 使用NodeJs进行同步逻辑和数据检查
- 具体实现:
  - 变量声明与存储:
    * `Redis` 内存储一个时间戳标记 `upgrade_timestamp` ，记录最后一次定时任务执行时间戳，默认为0
    * 全局变量存储一个执行标记 `executing_tag` ，记录是否已有定时任务正在执行，默认为 `false`
    * 全局变量存储一个执行间隔时间 `interval_time` ，单位为秒，每隔此时间进行一次定时任务
    * 全局变量存储一个结果集大小 `results_count` ，当SQL查询结果大于此结果集时，进行切分分页查询，默认为500
  - 执行步骤:
    1. 执行之前检查是否有任务在执行，即判断 `executing_tag` 是否为 `false`，若为 `true`，则放弃，等待下一次执行；否则进行下一步
    2. 使用SQL查询 `upgrade_timestamp` 之后的数据，将

- 搜索建议的 `completion suggester` 实现问题
  - 因`refresh`节点同步问题，未使用suggester实现
  - 改为 `completion suggester` 实现搜索建议
  - 同时根据搜索日志进行建议内容的过滤
- 搜索集群内存
- 搜索日志
  - 按月份
-



[1]: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/auth-reference.html#_basic_auth

