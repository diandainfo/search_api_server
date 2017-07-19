
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

- Logstash
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
        > [Logstash Reference [5.4] » Filter plugins » grok][231]
        > [Grok Debugger][232]
        > [Grok List][233]
      - eg.
        ```
        [2017-07-19 14:53:33.262] [INFO] search -  320600 -1 爽歪歪 1
        [2017-07-19 17:38:44.580] [INFO] search -  320600 -1 爽歪歪 1
        [2017-07-19 17:50:11.208] [INFO] search -  320600 -1 爽歪歪 1
        [2017-07-19 17:52:25.938] [INFO] search -  320600 -1 爽歪歪 1
        [2017-07-19 18:04:21.069] [INFO] search -  320600 -1 爽歪歪 1
        [2017-07-19 18:09:19.877] [INFO] search -  320600 -1 爽歪歪 1
        [2017-07-19 18:09:20.060] [INFO] search -  320600 -1 爽歪歪 1
        [2017-07-19 18:09:28.149] [INFO] search -  320600 -1 娃哈哈 5
        [2017-07-19 18:11:37.562] [INFO] search -  320600 -1 娃哈哈 5
        [2017-07-19 18:11:39.776] [INFO] search -  320600 -1 娃哈哈 5
        [2017-07-19 18:19:59.585] [INFO] search -  320600 -1 娃哈哈 5
        [2017-07-19 18:20:01.060] [INFO] search -  320600 -1 娃哈哈 5
        [2017-07-19 18:31:08.791] [INFO] search -  320600 -1 娃哈哈 5
        [2017-07-19 18:31:08.957] [INFO] search -  320600 -1 娃哈哈 5
        [2017-07-19 18:31:18.238] [INFO] search -  320600 -1 爽歪歪 1
        ```
        以上的日志，可使用以下解析：
        ```
        \[%{TIMESTAMP_ISO8601:logdate}\] \[%{LOGLEVEL:level}\] %{WORD} \-  %{NUMBER:city_id} %{NUMBER:store_id} (?<keyword>\S+?) %{NUMBER:count}
        ``` 
  - 参考文档
    > [What should be the logstash grok filter for this log4j log?][291] 

[21]: https://www.elastic.co/downloads/logstash
[22]: https://www.elastic.co/guide/en/logstash/5.4/advanced-pipeline.html#_configuring_logstash_for_filebeat_input
[231]: https://www.elastic.co/guide/en/logstash/5.4/plugins-filters-grok.html
[232]: https://grokdebug.herokuapp.com/
[233]: https://github.com/logstash-plugins/logstash-patterns-core/tree/master/patterns

[291]: https://stackoverflow.com/questions/37931563/what-should-be-the-logstash-grok-filter-for-this-log4j-log
***

- Filebeat
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
      - 启动
        ```
        sudo ./filebeat -e -c filebeat.yml -d "publish"
        ``` 


[701]: https://www.elastic.co/downloads/beats/filebeat
[702]: https://www.elastic.co/downloads/past-releases/filebeat-5-4-3
[703]: https://www.elastic.co/guide/en/logstash/5.4/advanced-pipeline.html#configuring-filebeat
***

- Kibana
  - ## *待刷*

***

- X-Pack
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

- ElasticSearch-head
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

- ElasticSearch-analysis-ik
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
  
- ElasticSearch-analysis-pinyin
  - version : 5.4.3
  - 安装
    - > [GitHub >> elasticsearch-analysis-pinyin][65]
  - 步骤同ik

[60]: https://github.com/medcl/elasticsearch-analysis-ik
[601]: https://github.com/medcl/elasticsearch-analysis-ik/releases
[65]: https://github.com/medcl/elasticsearch-analysis-pinyin

***

