
# Instruction - 说明

## 1.Connection - 连接

### NodeJs 使用 Elasticsearch.js 连接 Elasticsearch 集群
- 需要使用 `user` + `password` 建立连接
  - > [elasticsearch.js » SSL and Authentication » Basic Auth][1]

## 3.技术清单
- Indices 索引相关技术点
  - `term_vector`
    - 高亮搜索关键词的位置标记
    - > The fast vector highlighter requires with_positions_offsets. The term vectors API can retrieve whatever is stored.
    - > [Elasticsearch Reference [5.4] » Mapping » Mapping parameters » term_vector][311]
  - `Completion Suggester`
    - 搜索建议：自动完成功能，用于辅助用户完成搜索前的输入
    - > The completion suggester provides auto-complete/search-as-you-type functionality. This is a navigational feature to guide users to relevant results as they are typing, improving search precision. It is not meant for spell correction or did-you-mean functionality like the term or phrase suggesters.
    - > [Elasticsearch Reference [5.4] » Search APIs » Suggesters » Completion Suggester][321]
  - `Context Suggester`
  - `Fuzzy Query`
  - ``

[311]: https://www.elastic.co/guide/en/elasticsearch/reference/5.4/term-vector.html
[321]: https://www.elastic.co/guide/en/elasticsearch/reference/5.4/search-suggesters-completion.html
***

## 5.技术升级
### DB >> ES 数据同步
- 已有问题:
  * 使用`Elasticsearch-jdbc`进行增量数据同步
  * 内存占用率较大，且容易崩溃导致数据缺失
- 解决方案:
  * 改为通过 `SQL` 获取 `MySQL` 中数据，通过 `Elasticsearch.js` 将数据写入到 `Elasticsearch`
  * 使用NodeJs进行同步逻辑和数据检查
- 具体实现:
  - 定时任务
    * 每日06-24时每间隔 `interval_time` 时间执行一次同步货架商品的定时任务
    * 每日02时，检查当日增量货架商品数据 
  - 变量声明与存储:
    * `Redis` 内存储一个时间戳标记 `upgrade_timestamp` ，记录最后一次定时任务执行时间戳，默认为0
    * 全局变量存储一个执行标记 `executing_tag` ，记录是否已有定时任务正在执行，默认为 `false`
    * 全局变量存储一个执行间隔时间 `interval_time` ，单位为秒，每隔此时间进行一次定时任务
    * 全局变量存储一个结果集大小 `results_count` ，当SQL查询结果大于此结果集时，进行切分分页查询，默认为500
  - 执行步骤:
    1. 执行之前检查是否有任务在执行，即判断 `executing_tag` 是否为 `false`，若为 `true`，则放弃，等待下一次执行；否则进行下一步
    2. 开始使用SQL查询 `upgrade_timestamp` 之后的商品数据，同时将 `executing_tag` 标记为 `true`
    3. 使用 `count` 获取商品数量，若结果集大于 `results_count`，则根据 `count` 进行切分分页，分页请求商品数据；
    若 `count` 为0，则结束，重置 `executing_tag` 为 `false` ，同时标记本次定时任务开始时的时间戳，更新到 `upgrade_timestamp` 中
    4. 使用 `limit` 获取商品分页数据，根据数据的 `createdAt` 是否等于 `updatedAt` 判断是新增还是更新
    5. 使用 `bulk` 同步数据到ES集群，重置 `executing_tag` 为 `false` ，标记本次定时任务开始时间，更新 `upgrade_timestamp`

- 搜索建议的 `completion suggester` 实现问题
  - 因`refresh`节点同步问题，未使用suggester实现
  - 改为 `completion suggester` 实现搜索建议
  - 同时根据搜索日志进行建议内容的过滤
- 搜索集群内存
- 搜索日志
  - 按月份

[1]: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/auth-reference.html#_basic_auth

