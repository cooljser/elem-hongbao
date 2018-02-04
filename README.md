# 让每个人都能抢到大红包
http://www.elemhb.top/

## 项目介绍
身边很多人每天都要使用饿了么点外卖，经常会有人发链接让我帮点一下，觉得挺烦的。便想能不能做一个自动抢大红包的程序，因此就产生了这个工具。

## 原理说明
1. 红包链接上包含大红包的信息。
如：https://h5.ele.me/hongbao/#hardware_id=&is_lucky_group=True&lucky_number=7&track_id=&platform=0&sn=29e6ac3a7d9d505a&theme_id=2121&device_id=
可以发现lucky_number=7,即第7个是大红包。
2. 饿了么拼手气红包可以分享到微信或者qq后，都可以绑定或修改手机号。
3. 饿了么每个红包最多可以被10个人领取，因此需要准备十个账号。如第7个是大红包，则用6个小号当垫子，到第7个时，切换成目标手机号领取即可。

## 使用教程
1. 克隆项目
	```
	git clone git@github.com:cooljser/elem-hongbao.git
	```

2. 安装依赖
	```
	npm i
	```

3. 修改config.js中的账号信息
一共需要准备10个账号，因为一个红包一个用户最多领取一次。
	```
	账号必须字段:
	openId: 公共平台id(微信||qq)
	sign: 饿了么账号id
	非必须字段：
	weixin_avatar：用户头像
	weixin_username：用户名称
	```

4. 如何获取openId、sign？
	使用chrome手机调试模式打开红包链接，并设置device的User-Agent为
	```
	Mozilla/5.0 (Linux; Android 5.1; m1 metal Build/LMY47I; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043409 Safari/537.36 V1_AND_SQ_7.2.5_744_YYB_D QQ/7.2.5.3305 NetType/WIFI WebP/0.3.0 Pixel/1080
	```
	然后使用qq帐号登录，接着F12打开开发者工具，Application->Cookie->snsInfo，复制Value。然后在控制台中执行decodeURIComponent(Value)，就可以得到当前用户的信息了。其中eleme_key对应的就是sign，openid对应openId。

5. 进入项目目录，运行
	```
	node server.js
	```
	然后，浏览器打开http://localhost即可看到页面。

## QQ交流

- 246080018