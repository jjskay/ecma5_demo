var initConfig = {
	preprocess: function (content, url, next) {
		if(url.indexOf('home.html')>-1){
			$$.get('http://zf.ilaohuyou.cn/ajax.json', function(data){
				var template = Template7.compile(content);
                // Compile content template with received JSON data
                var resultContent = template(JSON.parse(data));
                // Now we call "next" callback function with result content
                next(resultContent);
			})
		}else{
			next(content);			
		}
	},
	preroute: function(viewe, options){

	},
	// Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
    template7Data: {
    	'page:home': {
    		tel: 12334455,
    		email: '1234@qq.com'
    	}
    },
	cache: true,
	cacheDuration: 1000*60*5,
	pushState: true,
	template7Pages: true

}

var myApp = new Framework7(initConfig);
/* Initialize views */
window.mainView = myApp.addView('.view-main', {
  dynamicNavbar: true,
  domCache: true
})

window.$$ = Dom7;
window.f7 = myApp;
mainView.router.load({
	url: 'src/views/home.html',
	reload: true,
	animatePages: false
})
var routerBack = function(){
	mainView.router.back();
}
var homeInit = function(page){
	console.log(page)
}

var loginInit = function(page){
	var currentPage = $$($$('.pages>.page')[$$('.pages>.page').length - 1]);
	var currentNav = $$($$('.navbar>.navbar-inner')[$$('.navbar>.navbar-inner').length - 1]);
	currentNav.find('a.login-back')[0].onclick = routerBack;
	var userInput = currentPage.find('input[name="username"]');
	var passwordInput = currentPage.find('input[name="password"]');
	var loginBtn = currentPage.find('.login-btn');

	loginBtn[0].onclick = function(){
		var username = userInput.val();
		var password = passwordInput.val();
		if(!username){
			f7.alert('提示', '请输入你的用户名！');
			return;
		}else if(!password){
			f7.alert('提示', '请输入你的密码！');
			return;
		}
		f7.showPreloader('登录中...');
	}

}

myApp.onPageInit('*', function (page) {
  var name = page['name'];
  name == 'home' && homeInit(page);
  name == 'login' && loginInit(page);
})
 

