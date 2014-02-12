btcserver
=========

Server for btcnow


###TODO

1. 左侧拖动 更改数据库 排序，并呈现到右侧(刷新机制)
2. 左侧点击 更改数据库显示属性
3. 中间展示 stats 接口3个数据
4. 文章列表下拉刷新
5. ios7 优先 ios6 样式匹配
6. 少两个 icon 图片  57 114

###btcserver

1. 增量抓取 自动抓取
2. 去重
3. 抓取专门页面的内容 存到数据库里
4. 如果请求单独的页面 可以先尝试直接返回string 显示 
5. 直接构建页面输出
5. 如果不好做 那么清除数据库 重新来



* 1 排序不好做可以先放放



####API LIST

#####ticker
http://d.bitjin.com/ticker



#####exchanger
http://d.bitjin.com/exchangerBTC.json

#####stats
http://blockchain.info/stats?format=json
next_difficulty always 11


Difficulty History

http://bitcoinwisdom.com/bitcoin/difficulty

####文章来源中英
中文

* <http://yibite.com/news/>
* <http://8btc.com>
* <http://www.bitecoin.com>
* <http://www.btc798.com/>
* <http://p2pbucks.com/>
* <http://www.bitell.com/>

英文

* <http://www.reddit.com/r/Bitcoin>
* <On Bitcoin>
* <Wired>
* <CoinDesk>
* <newsBTC>
* <Bitcoin Examiner>