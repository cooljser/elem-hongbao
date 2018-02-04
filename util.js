module.exports = {
	getRandomMobile: function () {
        var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
        var i = parseInt(10 * Math.random());
        var mobile = prefixArray[i];

        for (var j = 0; j < 8; j++) {
            mobile = mobile + Math.floor(Math.random() * 10);
        }
        
        return mobile;
    },
    fmtDate: function (date, fmt = 'yyyy-MM-dd HH:mm:ss') {
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1,(date.getFullYear()+"").substr(4 - RegExp.$1.length));            
        }
        
        for (var k in o) {        
            if(new RegExp("(" + k + ")").test(fmt)){
                fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? 
                    (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));                                    
            }
        }
        return fmt;
    },
    getDefaultUser: function() {
        return {
            method: 'phone',
            device_id: '',
            platform: 0,
            hardware_id: '',
            track_id: 'undefined',
            unionid: 'fuck',
            openId: '',
            sign: '',
            group_sn: '',
            weixin_avatar: 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKNpepsCnC60WmUhVgZrwK3HfBiaH8BTeceiadOmctQDcH1YwqVQqicicv18oTPjNjvuia1HQhlLlJUNAg/0',
            weixin_username: '佛祖保佑',
            phone: ''
        }
    }
};