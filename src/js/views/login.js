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