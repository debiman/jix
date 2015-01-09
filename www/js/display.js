var AppDispalyModul = angular.module('app.dispaly', ['ionic']);

AppDispalyModul.controller('DisplayController', function($scope, $ionicModal, $location ,$timeout,$ionicPopup,$http) {
  
  /*
   *检测当前本地是否已经登陆
   */
  var islogin = eval("("+localStorage.getItem("isAuthed")+")");
  if(islogin == 0){
    var sendPopup = $ionicPopup.alert({
        title: '抱歉',
        template: '系统检测到您未登录，请登录！',
        buttons: [
            {
                text: '确定',
                type: 'button-positive'
                }
            ]
        }); 
      console.log("请重新登陆");
      $location.path('/user/login'); 
    };
  
  $scope.back = function(){
    console.log("goback");
    history.go(-1);
  };

  /*
   *从服务器获取店面列表
   */
 $http({url: 'http://xinjia.phalcon.codinuts.com/api/index/shoplist', sync: false})
  .success(function(json){
      $scope.entitys = json;    
      console.log(json);
    });  
  
});

AppDispalyModul.controller('DetailController', function($scope, $http,$ionicModal,$stateParams, $location ,$timeout) {

  /*
   *返回上一级函数
   */
  $scope.back = function(){
    console.log("goback");
    history.go(-1);
  };

  $http({url: 'http://xinjia.phalcon.codinuts.com/api/index/shopdetail/'+$stateParams.entityId, sync: false})
    .success(function(json){
        $scope.entitys = json;
        console.log(json);    
      }); 
  $scope.upload = function($fenqu){
    $location.path('display/upload/'+$stateParams.entityId+'/'+$fenqu);
    console.log($fenqu);
  }
});

AppDispalyModul.controller('UploadController', function($scope, $ionicModal,$stateParams,$location ,$timeout) {
  $scope.part = $stateParams.part;
  $scope.entityId = $stateParams.entityId;
  $scope.back = function(){
    console.log("goback");
    history.go(-1);
  };
});

AppDispalyModul.controller('OpinionController', function($scope, $ionicModal, $location ,$timeout,$http,$stateParams) {
  $scope.back = function(){
    console.log("goback");
    history.go(-1);
  };
  $http({url: 'http://xinjia.phalcon.codinuts.com/api/index/medialist/'+$stateParams.entityId, sync: false})
  .success(function(json){
      $scope.acceptdata = json;  
      $scope.entitys = $scope.acceptdata.usersArray; 
      $scope.modified = json.modified;
      console.log(json);
    });


  $http({url: 'http://xinjia.phalcon.codinuts.com/api/index/shopdetail/'+$stateParams.entityId, sync: false})
    .success(function(json){
        $scope.shop = json;
        console.log(json);    
      }); 
 // $http({url: 'http://xinjia.phalcon.codinuts.com/api/index/shopname/'+$stateParams.entityId, sync: false})
 //  .success(function(json){
 //     $scope.shopname = json;
 //    });


});

App.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('dispaly', {
        url: '/display/list',
        templateUrl: 'view/display/index.html',
        controller: 'DisplayController'
    });
    $stateProvider.state('dispaly-detail', {
        url: '/display/detail/:entityId',
        templateUrl: 'view/display/detail.html',
        controller: 'DetailController'
    });
    $stateProvider.state('dispaly-upload', {
        url: '/display/upload/:entityId/:part',
        templateUrl: 'view/display/upload.html',
        controller: 'UploadController'
    });
    $stateProvider.state('dispaly-opinion', {
        url: '/display/opinion/:entityId',
        templateUrl: 'view/display/opinion.html',
        controller: 'OpinionController'
    });
});


