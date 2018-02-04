var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var Util = require('./util.js');
var api = require('./api.js');
var users = require('./config.js');
var qs = require('querystring');

var options = {
    root: __dirname
};

app.use(bodyParser.json({limit: '1mb'}));

app.use(bodyParser.urlencoded({           
	extended: true
}));

app.get('/', function(req, res){	
    res.sendFile('index.html', options);
});

app.get('/wechat.png', function(req, res){	
    res.sendFile('wechat.png', options);
});

let msgs = {
	2: '你已经领过了!',
	3: '领到了!',
	4: '领到了!',
	5: '每天最多领5个!',
};

app.post('/getHongbao', async function(req, res, next) {
	let {url, mobile} = req.body;
	if (url && mobile) {		
		let params = qs.parse(url);
		let luckyNumber = params['lucky_number'];
		let sn = params['sn'];

		if (!luckyNumber || !sn) {
			res.json({code: 20000, msg: '红包链接错误!'});
			return;
		}
		
		log('----------开始领大红包' + sn + ', luckyNumber is ' + luckyNumber + ', target mobile is ' + mobile + '----------');
		
		let isLucky = false;
		let isFinished = false;
		
		//都是垫背的
		for (let i = 0; i < users.length && !isFinished; i++) {		
			//如果是大红包，则用最后一个帐号领取
			let u = isLucky ? users[users.length - 1] : users[i];
			let user = Object.assign({}, Util.getDefaultUser(), u, {group_sn: sn});
			user.phone = isLucky ? mobile : Util.getRandomMobile();
			
			await api.changePhone(user);
		
			await api.getElemeHongbao(user).then(r=>{
				log(JSON.stringify(r));
				let code = r['ret_code'];
				let records = r['promotion_records'];
				let count = records.length;
				
				if (isLucky) {
					res.json({code: 10000, msg: msgs[code]});
					isFinished = true;
				} else {
					if (count >= luckyNumber) {
						res.json({code: 20000, msg: '没有大红包了!'});
						isFinished = true;
					} else if (count == luckyNumber - 1) {
						isLucky = true;
					}
				}
			}).catch(e=>i = i - 1);

			await sleep(1000);
		}
	}
});

var sleep = time=>new Promise((resolve, reject)=>setTimeout(e=>resolve(), time));

function log(msg) {
	fs.writeFile('log.txt', '\n\n' + new Date() + ':\n' + msg, {flag: 'a'}, function (err) {
		if (err) throw err;
	});
};

var server = app.listen(80, function(){
	console.log('express started......');
})