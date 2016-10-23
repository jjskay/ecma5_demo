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