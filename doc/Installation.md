
# Installation - 安装
安装 `Elastic Stack` 要基于 `ElasticSearch` 的版本进行。插件的版本要与 `ElasticSearch` 的版本保持一致

- 版本升级
  - > [Elasticsearch Reference [5.4] » Setup Elasticsearch » Upgrading Elasticsearch][1]

- ElasticSearch 
  - version : 5.4.3
  - 安装
    - > [Download Elasticsearch][10]
    - 下载安装包
      ```
      wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.3.zip
      ```
    - 解压缩
      ```
      unzip elasticsearch-5.4.3.zip
      ```
  - 修改配置
    ```
    vim config/elasticsearch.yml
    ``` 
    ***
    ```
    cluster.name: "xx"                              ## 集群名称
    node.name: "xxx"                                ## 当前节点名称
    bootstrap.memory_lock: false                    ## 关闭 Memory lock check
    bootstrap.system_call_filter: false             ## 关闭 System call filter check
    network.host: "0.0.0.0"                         ## 该节点绑定的IP地址
    http.port: 9210                                 ## http请求端口
    http.cors.enabled: true                         ## 开放http请求权限
    http.cors.allow-origin: "*"                     ## 开放http请求白名单，全局可访问
    transport.tcp.port: 9310                        ## 节点间通信端口
    ```
    - 参考说明
      - `bootstrap.memory_lock`
        - > [Elasticsearch Reference [5.4] » Setup Elasticsearch » Bootstrap Checks » Memory lock check][13]
      - `bootstrap.system_call_filter`
        - > [Elasticsearch Reference [5.4] » Setup Elasticsearch » Bootstrap Checks » System call filter check][14]
      - `Network Settings`
        - > [Elasticsearch Reference [5.4] » Modules » Network Settings][16]
      - `HTTP`
        - > [Elasticsearch Reference [5.4] » Modules » HTTP][17]
      - `Transport` 
        - > [https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-transport.html][18] 
  - 启动
    ```
    ./bin/elasticsearch &
    ``` 

- X-Pack
  - version : 5.4.3
  - 安装
    - > [X-Pack for the Elastic Stack [5.4] » Installing X-Pack][20]
  - 修改账号密码
    - > [X-Pack for the Elastic Stack [5.4] » Securing Elasticsearch and Kibana » Getting Started with Security][21]
    - > The default password for the `elastic` user is `changeme`.


- ElasticSearch-analysis-ik
  - version : 5.4.3
  - 安装
    - > [GitHub >> elasticsearch-analysis-ik][30]
  
- ElasticSearch-analysis-pinyin
  - version : 5.4.3
  - 安装
    - > [GitHub >> elasticsearch-analysis-pinyin][40]
  
[1]: https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html
[10]: https://www.elastic.co/cn/downloads/elasticsearch
[13]: https://www.elastic.co/guide/en/elasticsearch/reference/current/_memory_lock_check.html
[14]: https://www.elastic.co/guide/en/elasticsearch/reference/current/system-call-filter-check.html
[16]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html
[17]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html
[18]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-transport.html
[20]: https://www.elastic.co/guide/en/x-pack/current/installing-xpack.html
[21]: https://www.elastic.co/guide/en/x-pack/current/security-getting-started.html#security-getting-started
[30]: https://github.com/medcl/elasticsearch-analysis-ik
[40]: https://github.com/medcl/elasticsearch-analysis-pinyin
