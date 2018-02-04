var request = require('request');

module.exports = {
	getElemeHongbao: function(data) {
		return new Promise(function(resolve, reject) {
			request({
				url: 'https://restapi.ele.me/marketing/promotion/weixin/' + data.openId,
				method: 'POST',
				body: JSON.stringify(data),
				credentials: 'include',
				headers: {
					'X-Shard': 'eosid=' + parseInt(data['group_sn'], 16)
				}
			}, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var r = JSON.parse(body)					
					resolve(r);
			    } else {
			    	console.log(error, response)
			    }    
			});
		});
	},

	getPhone: function(data) {
		return new Promise(function(resolve, reject) {
			request({
				url: 'https://restapi.ele.me/v1/weixin/' + data.openId + '/phone?sign=' + data.sign,
				method: 'GET'
			}, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(body);
					resolve(true);
			    } else {
			    	console.log(error, response)
			    }    
			});
		});
	},

	changePhone: function(data) {
		var param = {
			sign: data.sign,
			phone: data.phone
		};
		return new Promise(function(resolve, reject) {
			request({
				url: 'https://restapi.ele.me/v1/weixin/' + data.openId + '/phone',
				method: 'PUT',
				body: JSON.stringify(param),
				credentials: 'include',
				headers: {
					'X-Shard': 'eosid=' + parseInt(data['group_sn'], 16)
				}
			}, function(error, response, body) {
				if (!error && response.statusCode == 204) {
					resolve(data.phone);
			    } else {
			    	console.log(error, response.statusCode)
			    }    
			});
		});
	}
};