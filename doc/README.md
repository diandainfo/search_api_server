
# 搜索集群

### [集群安装](./Install.md)



## 解决问题
#### 主要解决当前系统存在的以下问题：
- DB -> ES 的数据同步问题
  * 使用`Elasticsearch-jdbc`进行数据同步，内存占用率较大，且容易崩溃导致数据缺失
  * 改为 `DB -> SQL -> NodeJS -> Elasticsearch.js -> Elasticsearch` 数据流，使用NodeJs进行同步逻辑和数据检查
- 搜索建议的 `completion suggester` 实现问题
  - 因`refresh`节点同步问题，未使用suggester实现
  - 改为 `completion suggester` 实现搜索建议
  - 同时根据搜索日志进行建议内容的过滤
- 搜索集群内存
- 搜索日志
  - 按月份
-



## 技术成本
#### 学习成本
- ES 5.x后索引结构不同
- ES `function score` 用法
- ES 多标签的聚合

#### 学习路线
- sort & _score 
  - > [《Elasticsearch: 权威指南》 » 基础入门 » 排序与相关性 » 什么是相关性?](https://elasticsearch.cn/book/elasticsearch_definitive_guide_2.x/relevance-intro.html)
  - > [Elasticsearch: The Definitive Guide [2.x] » Getting Started » Sorting and Relevance » What Is Relevance?](https://www.elastic.co/guide/en/elasticsearch/guide/current/relevance-intro.html)
  - 使用 `explain` 检查 `_score` 的生产

