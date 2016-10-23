
myApp.onPageInit('*', function (page) {
  var name = page['name'];
  name == 'home' && homeInit(page);
  name == 'login' && loginInit(page);
})
 

