// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var App = angular.module('app', [
  'ionic', 
  'app.dispaly',
  'app.know',
  'app.user',
  'flow',
  ])

App.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


App.config(['flowFactoryProvider', function (flowFactoryProvider) {
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      Math.uuid = function (len, radix) {
      var chars = CHARS, uuid = [], i;
      radix = radix || chars.length;
      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
      } else {
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
   
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random()*16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }
   
    return uuid.join('');
    };
    var randomid = Math.uuid(8, 16);


 flowFactoryProvider.defaults = {
      //  target: 'http://xinjia.phalcon.codinuts.com/api/index/push/site/node/init/'+randomid+'/'+,
        permanentErrors: [404, 500, 501],
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 4,
        singleFile: false
    };

    flowFactoryProvider.on('catchAll', function (event) {
        $obj = arguments['2'];
        if($obj){
            if($obj == '[object Event]'){
            }else{
            // var data = JSON.parse($obj);
            // var id = data.data;            
            console.log($obj);
            }
        }
    }); 

    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
}]);

App.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,$location) {
  $scope.login = function(){
      var islogin = eval("("+localStorage.getItem("isAuthed")+")");
      if(islogin == 0){
        var sendPopup = $ionicPopup.alert({
        title: '抱歉',
        template: '系统检测到您未登陆任何账号',
        buttons: [
            {
                text: '确定',
                type: 'button-positive'
                }
            ]
        });
        sendPopup.then(function(res) {
              $location.path('/user/login');
          });

      }else{
          var sendPopup = $ionicPopup.alert({
          title: '您已登陆信佳',
          template: '系统检测到您已经登陆到信佳管理系统，不许要再次登陆',
          buttons: [
              {
                  text: '确定',
                  type: 'button-positive'
                  }
              ]
          });
          sendPopup.then(function(res) {
                $location.path('/user/login');
            });
      }

  }
  
  /*
   *注销账号
   */
  $scope.logout = function(){
      var islogin = eval("("+localStorage.getItem("isAuthed")+")");
      if(islogin == 0){
        var sendPopup = $ionicPopup.alert({
        title: '抱歉',
        template: '系统检测到您未登陆任何账号',
        buttons: [
            {
                text: '确定',
                type: 'button-positive'
                }
            ]
        });
        sendPopup.then(function(res) {
              $location.path('/user/login');
          });

      }else{
        localStorage.setItem('isAuthed', "0");
        var sendPopup = $ionicPopup.alert({
        title: '注销成功',
        template: '您已经成功注销账号。',
        buttons: [
            {
                text: '确定',
                type: 'button-positive'
                }
            ]
        });
        sendPopup.then(function(res) {
              $location.path('/app/home');
          });
      }  
  };

  $scope.info = function(){
     $location.path('/user/info');
  }
})

App.controller('PlaylistsController', function($scope, $stateParams) {
})

App.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "view/home/menu.html",
      controller: 'AppCtrl'
    });

    $stateProvider.state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "view/home/home.html",
          controller: 'PlaylistsController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

