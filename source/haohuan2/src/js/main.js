var main_data={
	test:false,
}
$(document).ready(function() {
    $('.content_box').show();
  		function redirectOpenOrDownLoad () {
        var ua = navigator.userAgent;
        var platform = {
          // android终端或者uc浏览器
          android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
          androidVersion: 0,
          // 是否为iPhone或者QQHD浏览器
          iPhone: ua.indexOf('iPhone') > -1,
          // 是否iPadip
          iPad: ua.indexOf('iPad') > -1,
          //ios version
          iosVersion: 0,
          //windows phone
          wPhone: ua.indexOf('Windows Phone') > -1,
          //是否在 微信 客户端内
          isWeixin: ua.indexOf('MicroMessenger') > -1
        };

        var out = /iPhone OS (\d+)/.exec(ua);
        if (out) {
          platform.iosVersion = parseInt(out[1], 10);
        } else if (out = /Android (\d+)/.exec(ua)) {
          platform.androidVersion = parseInt(out[1], 10);
        }

        var browserHidden = function () {
			if (typeof document.hidden !== 'undefined') {
				return document.hidden;
			} else if (typeof document.mozHidden !== 'undefined') {
				return document.mozHidden;
			} else if (typeof document.msHidden !== 'undefined') {
				return document.msHidden;
			} else if (typeof document.webkitHidden !== 'undefined') {
				return document.webkitHidden;
			}

          return false;
        };
        //下面代码来自网络,创建一个iframe,延迟后判断是否页面跳转了
        function callNative(url, callback, universalLinks) {
			if (!url) {
				return;
			}
			var oFrame = document.createElement('iframe');
			oFrame.style.display = 'none';
			var body = document.body;
			var timer;
			var clear = function (evt, isTimeout) {
				(typeof callback === 'function') && callback(isTimeout);
				window.removeEventListener('pagehide', hide, true);
				if (!oFrame) {
				  return;
				}

				oFrame.onload = null;
				body.removeChild(oFrame);
				oFrame = null;
			};
			var hide = function (e) {
				clearTimeout(timer);
				clear(e, false);
			};
			var timer1 = 75,
            timer2 = 1200,
            timerDuration = 1300;
			window.addEventListener('pagehide', hide, true);
			if (platform.iosVersion >= 9) {
				oFrame = null;
				window.location.href = url;

			} else {
				oFrame.onload = clear;
				oFrame.src = url;
				body.appendChild(oFrame);
			}
			var now = +new Date();

			timer = setTimeout(function () {
				timer = setTimeout(function () {
					var newTime = +new Date();
					var duration = newTime - now;
					if (duration > timerDuration) {
						clear(null, false);
					} else if (!browserHidden()) {
						clear(null, true);
					}
				}, timer2);
			}, timer1);
		}

        !function () {
			//var YING_YONG_BAO_URL = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ucredit.haohuan';
	        var YING_YONG_BAO_URL = 'http://sj.qq.com/myapp/detail.htm?apkName=com.renrendai.haohuan';
			var appStoreURL = 'https://itunes.apple.com/cn/app/id1309415987?mt=8';
			var androidDownloadURL = 'http://m.haohuan.com/download/android/haohuan_release.apk';
			//var wechatURL = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ucredit.haohuan';//微信应用宝下载url
			var APP_SCHEMA = "haohuan://";
			var universalLinks = 'https://api-m.haohuan.com?debug=true';

			if (platform.wPhone) {
				util.dialogMsg('抱歉，暂不支持您的设备');
				return;
			}

			var finalDownloadURL = androidDownloadURL;

			if (platform.iPhone || platform.iPad) {
				finalDownloadURL = appStoreURL;
			}

			if (platform.isWeixin) {
				APP_SCHEMA = null;
				finalDownloadURL = YING_YONG_BAO_URL;
			}
			if (APP_SCHEMA) {
            //先尝试调起本地APP
				callNative(APP_SCHEMA, function (isTimeout) {
					if (isTimeout) {
						setTimeout(function () {
							window.location.href = finalDownloadURL;
						}, 0);
					}
				}, universalLinks);

			} else {
				location.href = finalDownloadURL;
			}
        }();
    }
	$('.g_head .download').on('click',function(){
		redirectOpenOrDownLoad();
	})
})

