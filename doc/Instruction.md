
# Instruction - 说明

## Connection - 连接

### NodeJs 使用 Elasticsearch.js 连接 Elasticsearch 集群
- 需要使用 `user` + `password` 建立连接
  - > [elasticsearch.js » SSL and Authentication » Basic Auth][1]


## 业务逻辑

### 对用户可见商品条件

城市： 用户城市编号 = 商品城市编号
仓库编号：  
1、用户仓库绑定前置仓，用户前置仓仓库编号 = 商品前置仓仓库编号 或 商品主仓仓库编号；
2、用户仓库绑定主仓，主仓仓库编号 = 商品主仓仓库编号。
销售区域： 用户销售区域（1） IN 商品销售区域（n）

[1]: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/auth-reference.html#_basic_auth

