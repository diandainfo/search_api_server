
# Installation - 安装
安装 `Elastic Stack` 要基于 `ElasticSearch` 的版本进行。插件的版本要与 `ElasticSearch` 的版本保持一致

- 参考资料
  - > [centos7虚拟机安装elasticsearch5.0.x-安装篇][000]
  - > [Elasticsearch 5.0.0集群安装][001]
  - > [记录Linux下安装elasticSearch时遇到的一些错误][002]
  - > [Elasticsearch5.0 安装问题集锦][003]
  - > [Elasticsearch5.0 安装问题集锦][004]

[000]: http://blog.csdn.net/u012371450/article/details/51776505
[001]: https://zhuanlan.zhihu.com/p/22241634?refer=dataeye
[002]: http://blog.sina.com.cn/s/blog_c90ce4e001032f7w.html
[003]: http://www.cnblogs.com/woxpp/p/6061073.html
[004]: http://www.cnblogs.com/sloveling/p/elasticsearch.html

***

- 版本管理
  - Upgrade
    - > [Elasticsearch Reference [5.4] » Setup Elasticsearch » Upgrading Elasticsearch][01]
  - History
    - > [Past Releases[02]

[01]: https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html
[02]: https://www.elastic.co/downloads/past-releases
***

- ## ElasticSearch
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
        - > [Elasticsearch Reference [5.4] » Modules » Transport][18] 
  - 启动
    ```
    bin/elasticsearch &
    ```

[10]: https://www.elastic.co/downloads/elasticsearch
[13]: https://www.elastic.co/guide/en/elasticsearch/reference/current/_memory_lock_check.html
[14]: https://www.elastic.co/guide/en/elasticsearch/reference/current/system-call-filter-check.html
[16]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html
[17]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html
[18]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-transport.html

***

- ## Logstash
  - version : 5.4.3
  - 安装
    - > [Download Logstash & Installation Steps][21]
    - 步骤
      ```
      wget https://artifacts.elastic.co/downloads/logstash/logstash-5.4.3.tar.gz
      tar -zxvf logstash-5.4.3.tar.gz
      ```
    - 配置
      > [Configuring Logstash for Filebeat Input][22] 
      - filter
        - > [logstash之filter插件][230]
        - > [Logstash Reference [5.4] » Filter plugins » grok][231]
        - > [Grok Debugger][232]
        - > [Grok List][233]
        - 日志数据清洗
          删除字段
          - > [logstash采集与清洗数据到elasticsearch案例实战][234]
          - > [How to remove fields in logstash/es][235]
        - eg.
          ```
          [2017-07-19 14:53:33.262] [INFO] search -  320600 -1 爽歪歪 1
          [2017-07-19 18:31:08.957] [INFO] search -  320600 -1 娃哈哈 5
          ```
          以上的日志，可使用以下解析：
          ```
          \[%{TIMESTAMP_ISO8601:logdate}\] \[%{LOGLEVEL:level}\] %{WORD} \-  %{NUMBER:city_id} %{NUMBER:store_id} (?<keyword>\S+?) %{NUMBER:count}
          ```
      - output
        输出到`ElasticSearch`的配置
        - 设置自定义的`index`和`type`
          - > [Elasticsearch Output Configuration Options][241]
          - > 设置 [index][242] 和 [type][243]
        - 设置 `index template`
          - > [Using Logstash to help create an Elasticsearch mapping template][245]
    - 启动
      ```
      ./bin/logstash -f search-pipeline.conf --config.reload.automatic &
      ps -ef | grep logstash
      ```
  - 参考文档
    - > [What should be the logstash grok filter for this log4j log?][291]

[21]: https://www.elastic.co/downloads/logstash
[22]: https://www.elastic.co/guide/en/logstash/5.4/advanced-pipeline.html#_configuring_logstash_for_filebeat_input
[230]: http://zengestudy.blog.51cto.com/1702365/1832818
[231]: https://www.elastic.co/guide/en/logstash/5.4/plugins-filters-grok.html
[232]: https://grokdebug.herokuapp.com/
[233]: https://github.com/logstash-plugins/logstash-patterns-core/tree/master/patterns
[234]: http://www.infocool.net/kb/Other/201610/206636.html
[235]: https://discuss.elastic.co/t/how-to-remove-fields-in-logstash-es/77039

[241]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-elasticsearch.html#plugins-outputs-elasticsearch-options
[242]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-elasticsearch.html#plugins-outputs-elasticsearch-index
[243]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-elasticsearch.html#plugins-outputs-elasticsearch-document_type
[245]: https://www.elastic.co/blog/logstash_lesson_elasticsearch_mapping

[291]: https://stackoverflow.com/questions/37931563/what-should-be-the-logstash-grok-filter-for-this-log4j-log

***

- ## Filebeat
  - version : 5.4.3
  - 安装
    - > [Installation Steps][701]
    - 步骤
      - 下载 release 对应的 tar.gz [Filebeat 5.4.3][702]
        ```
        wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-5.4.3-linux-x86_64.tar.gz
        tar -zxvf filebeat-5.4.3-linux-x86_64.tar.gz
        ```
      - 配置 `filebeat.yml`
        > [Configuring Filebeat to Send Log Lines to Logstash][703] 
        ```
        filebeat.prospectors:
        - input_type: log
          paths:
            - .../search_api_server/trunk/logs/search.log  ## 搜索日志的存储目录
        output.logstash:
          hosts: ["localhost:5043"]     ## Logstash的请求地址
        ```
      - 创建 `search-pipeline.conf` 配置见[./search-pipeline.conf](./search-pipeline.conf)
      - 启动
        ```
        ./filebeat -e -c filebeat.yml -d "publish" &
        ps -ef | grep filebeat
        ```
       - 过程持久化
         - > [Logstash Reference [5.4] » Setting Up and Running Logstash » Persistent Queues][711]


[701]: https://www.elastic.co/downloads/beats/filebeat
[702]: https://www.elastic.co/downloads/past-releases/filebeat-5-4-3
[703]: https://www.elastic.co/guide/en/logstash/5.4/advanced-pipeline.html#configuring-filebeat

[711]: https://www.elastic.co/guide/en/logstash/5.4/persistent-queues.html
***

- ## Kibana
  - version : 5.4.3
  - 安装
    ```
        wget https://artifacts.elastic.co/downloads/kibana/kibana-5.4.3-linux-x86_64.tar.gz
        tar -zxvf kibana-5.4.3-linux-x86_64.tar.gz
        bin/kibana-plugin install x-pack
    ```
  - 配置，参见 `X-Pack` 部分，`Kibana` 配置，在 `kibana.yml` 中配置相关信息
    ```
        server.port: 5601                               ## 访问端口
        server.host: "192.168.1.101"                    ## 访问地址
        server.name: "dd-kibana"                        ## 服务名称
        elasticsearch.url: "http://192.168.1.180:9210"  ## ES地址
    ```
  - 启动，使用 `development` 或 `production` 环境变量启动 `kibana`
    ```
         NODE_ENV=development bin/kibana
    ```

***

- ## X-Pack
  - version : 5.4.3
  - 安装
    - > [X-Pack for the Elastic Stack [5.4] » Installing X-Pack][40]
      ```
      bin/elasticsearch-plugin install x-pack
      ```
  - 配置X-Pack
    - 简单配置
      - > [Enabling and Disabling X-Pack Features][420]
    - 详细配置
      - > [X-Pack for the Elastic Stack [5.4] » X-Pack Settings][425] 
    - 配置信息
      - ## **关闭所有功能，生产由运维决定是否开启功能**
      - 在 `elasticsearch.yml ` 配置以下内容
        ```
        xpack.ml.enabled: false               ## 关闭机器学习功能 
        xpack.monitoring.enabled: false       ## 关闭监控功能
        xpack.security.enabled: false         ## 关闭安全功能
        xpack.watcher.enabled: false          ## 关闭观察者功能
        ``` 
      - 在 `kibana.yml` 配置以下内容
        ```
        xpack.ml.enabled: false               ## 关闭机器学习功能 
        xpack.monitoring.enabled: false       ## 关闭监控功能
        xpack.reporting.enabled: false        ## 关闭报告功能
        xpack.security.enabled: false         ## 关闭安全功能
        ```
  - 修改账号密码
    - > [X-Pack for the Elastic Stack [5.4] » Securing Elasticsearch and Kibana » Getting Started with Security][45]
    - > The default password for the `elastic` user is `changeme`.

[40]: https://www.elastic.co/guide/en/x-pack/current/installing-xpack.html
[420]: https://www.elastic.co/guide/en/x-pack/current/installing-xpack.html#xpack-enabling
[425]: https://www.elastic.co/guide/en/x-pack/current/xpack-settings.html
[45]: https://www.elastic.co/guide/en/x-pack/current/security-getting-started.html#security-getting-started

***

- ### ElasticSearch-head
  - version : 5.x 
  - 安装
    - > [mobz/elasticsearch-head][501] 
      ```
      git clone git://github.com/mobz/elasticsearch-head.git
      cd elasticsearch-head
      npm install
      ```
    - 后台运行
      - 运行
        ```
        npm run start &
        ```
      - 访问 `[ip]:9100`
    - 关闭后台进程
      ```
      ps -ef | grep "grunt"
      kill xxx
      ``` 

[501]: https://github.com/mobz/elasticsearch-head

***

- ### ElasticSearch-analysis-ik
  - version : 5.4.3
  - 安装
    - > [GitHub >> elasticsearch-analysis-ik][60]
    - 步骤
      - 下载release对应的zip [medcl/elasticsearch-analysis-ik > releases][601]
        ```
        wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.4.3/elasticsearch-analysis-ik-5.4.3.zip
        ``` 
      - 解压缩 
        ```
        unzip elasticsearch-analysis-ik-5.4.3.zip
        ```
      - 移动目录到 `elasticsearch-5.4.3` 下 `plugins/analysis-ik`
      - 重启es
  
- ### ElasticSearch-analysis-pinyin
  - version : 5.4.3
  - 安装
    - > [GitHub >> elasticsearch-analysis-pinyin][65]
  - 步骤同ik

[60]: https://github.com/medcl/elasticsearch-analysis-ik
[601]: https://github.com/medcl/elasticsearch-analysis-ik/releases
[65]: https://github.com/medcl/elasticsearch-analysis-pinyin

***

