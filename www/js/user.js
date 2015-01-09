var AppUserModul = angular.module('app.user', ['ionic']);

AppUserModul.controller('UserController', function($scope, $ionicModal, $location ,$timeout) {
  // Form data for the login modal
  $scope.back = function(){
    console.log("goback");
    history.go(-1);
  };
  // $http({url: 'http://xinjia.phalcon.codinuts.com/api/login', sync: false})
    // .success(function(json){
    //     $scope.adver = json;
    //     console.log(json);
    // });
    //console.log("i am here!");
})

AppUserModul.controller('LoginController', function($scope, $ionicModal,$http,$location,$timeout,$ionicPopup) {
   //系统检测已经登陆用户自动登陆
   var islogin = eval("("+localStorage.getItem("isAuthed")+")");
   if(islogin == 1){
    $location.path("/app/home");
   }

  //返回按钮
  $scope.back = function(){
    console.log("goback");
    history.go(-1);
  };
  
  //登陆页面数据模型
  $scope.entity = {};
  
  //获取数据的URL地址
  $ionicModal.fromTemplateUrl('view/user/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.usermodal = modal;
  });
  
  //获取页面数据
  $data = $scope.entity;
  
  /*
   *登陆函数
   */
  $scope.login = function(){    
    var db = eval("("+localStorage.getItem("userdata")+")");                    
    localStorage.setItem('isAuthed', "0");
    if(db == null) {
    //确定json格式，创建表
        db = {
              "items": []
            }; 
    }
    var islogin = eval("("+localStorage.getItem("isAuthed")+")");
    if(islogin == null) {
        //确定json格式，创建是否登录表
        islogin = {              
            "items":[]
            };              
    }
    $http({
      url:"http://xinjia.phalcon.codinuts.com/api/index/login",
      method:"post",
      data: $data,
      headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data,status,headers,config){
        console.log(data.code);
        if(data.code == "200"){
            localStorage.setItem('isAuthed', "1");
            db.items[0]=angular.toJson(data);
            localStorage.setItem('userdata', angular.toJson(db));  
            console.log("success!");
            $location.path('/app/home');
            var sendPopup = $ionicPopup.alert({
            title: '登陆成功',
            template: '尊敬的用户，欢迎您登入信佳管理系统！',
            buttons: [
                {
                    text: '确定',
                    type: 'button-positive'
                    }
                ]
            });        
        }else{
          console.log("fault!");
          var sendPopup = $ionicPopup.alert({
            title: '登陆失败',
            template: '您的账号或密码错误，请重新输入！',
            buttons: [
                {
                    text: '确定',
                    type: 'button-positive'
                    }
                ]
            });
        }
        sendPopup.then(function(res) {
             console.log("come in home!");
          });
      }).error(function(data,status,headers,config){
        console.log(data);
      });
  }
});

AppUserModul.controller('InfoController', function($scope, $ionicModal, $location ,$timeout) {
  // Form data for the login modal
  $scope.back = function(){
    console.log("goback");
    history.go(-1);

  };
});

AppUserModul.controller('RebuildController', function($scope, $ionicModal, $location ,$timeout) {
  // Form data for the login modal
  $scope.back = function(){
    console.log("goback");
    history.go(-1);

  };
});

App.config(function($stateProvider, $urlRouterProvider){
     $stateProvider.state('user', {
        url: '/user',
        templateUrl: 'view/user/index.html',
        controller: 'UserController'
    })
    $stateProvider.state('user-login', {
        url: '/user/login',
        templateUrl: 'view/user/login.html',
        controller: 'LoginController'
    })

    $stateProvider.state('user-rebuild', {
        url: '/user/rebuild',
        templateUrl: 'view/user/rebuild.html',
        controller: 'RebuildController'
    })
     $stateProvider.state('user-info', {
        url: '/user/info',
        templateUrl: 'view/user/info.html',
        controller: 'InfoController'
    });
});


