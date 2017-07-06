
# Installation - 安装
安装 `Elastic Stack` 要基于 `ElasticSearch` 的版本进行。插件的版本要与 `ElasticSearch` 的版本保持一致

- ElasticSearch 
  - version : 5.4.3
  - 安装
    - > [Download Elasticsearch][1]
    ```
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.3.zip
    ```
  - 修改配置

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
  

[1]: https://www.elastic.co/cn/downloads/elasticsearch
[20]: https://www.elastic.co/guide/en/x-pack/current/installing-xpack.html
[21]: https://www.elastic.co/guide/en/x-pack/current/security-getting-started.html#security-getting-started
[30]: https://github.com/medcl/elasticsearch-analysis-ik
[40]: https://github.com/medcl/elasticsearch-analysis-pinyin
