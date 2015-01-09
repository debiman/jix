var AppKnowModul = angular.module('app.know', [])

AppKnowModul.controller('KnowController', function($scope, $ionicModal, $timeout,$http,$stateParams) {
  $scope.back = function(){
  	console.log("goback");
  	history.go(-1);
  };

$http({url: 'http://xinjia.phalcon.codinuts.com/api/index/zhangjielist/'+$stateParams.entityId, sync: false})
    .success(function(json){
        $scope.entitys = json;
        console.log(json);    
      });  
});


AppKnowModul.controller('ListController', function($scope, $ionicModal, $timeout,$ionicPopup,$location,$http,$stateParams) {
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

  $http({url: 'http://xinjia.phalcon.codinuts.com/api/index/zhidulist', sync: false})
    .success(function(json){
        $scope.entitys = json;    
      });  
});

App.config(function($stateProvider, $urlRouterProvider){
     $stateProvider.state('know', {
        url: '/know/detail/:entityId',
        templateUrl: 'view/know/index.html',
        controller: 'KnowController'
    })
     $stateProvider.state('know-list', {
        url: '/know/list',
        templateUrl: 'view/know/list.html',
        controller: 'ListController'
    });
});


