!function(){"use strict";angular.module("eeArmApp",["ngAnimate","ui.router","ngMaterial"])}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("eeArmApp").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){}var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],e}angular.module("eeArmApp").directive("eeArmNav",t)}(),function(){"use strict";function t(t){function e(e,n,o,i){var s,a=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){a.type(t).pause()["delete"]()}),s=e.$watch("vm.contributors",function(){angular.forEach(i.contributors,function(t){a.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){s()})}function n(t,e){function n(){return o().then(function(){t.info("Activated Contributors View")})}function o(){return e.getContributors(10).then(function(t){return i.contributors=t,i.contributors})}var i=this;i.contributors=[],n()}var o={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:n,controllerAs:"vm"};return n.$inject=["$log","githubContributor"],o}angular.module("eeArmApp").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(t,e){function n(n){function i(t){return t.data}function s(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return n||(n=30),e.get(o+"/contributors?per_page="+n).then(i)["catch"](s)}var o="https://api.github.com/repos/Swiip/generator-gulp-angular",i={apiHost:o,getContributors:n};return i}angular.module("eeArmApp").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,e){function n(){}function o(){}var i={getSettings:n,saveSettings:o};return i}angular.module("eeArmApp").factory("eeArmSettings",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,e,n){function o(){d=!1}function i(e){t.debug("armRequestCompleteSetState",e),l.robot.base=e.data.base,l.robot.body=e.data.body,l.robot.neck=e.data.neck,l.robot.claw=e.data.claw,r=!0,d=!1}function s(e){t.error("Arm request failed.\n"+angular.toJson(e.data,!0)),d=!1,r=!1}function a(t,e,o){return{method:"POST",url:n.host+t,timeout:o||2e3,headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(t){var e=[];for(var n in t)e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")},data:e}}function c(t){return{method:"GET",url:n.host+t,timeout:2e3,cache:!1}}var r=!1,d=!1,l={};return l.robot={base:90,body:90,neck:90,claw:90},l.connected=r,l.start=function(){d=!0,e(c("/arm")).then(i)["catch"](function(){d=!1})},l.increase=function(e){r&&180!==l.robot[e]&&!d&&(l.robot[e]+=n.increments[e],l.robot[e]>180&&(l.robot[e]=180),t.debug(l.robot),l.moveTo(l.robot))},l.decrease=function(e){r&&0!==l.robot[e]&&!d&&(l.robot[e]-=n.increments[e],l.robot[e]<0&&(l.robot[e]=0),t.debug(l.robot),l.moveTo(l.robot))},l.moveTo=function(t){d=!0,e(a("/arm",{base:l.robot.base,body:l.robot.body,neck:l.robot.neck,claw:l.robot.claw})).then(i)["catch"](s)},l.addStep=function(t){d=!0,e(a("/add",{base:l.robot.base,body:l.robot.body,neck:l.robot.neck,claw:l.robot.claw,steps:0,delay:t})).then(o)["catch"](s)},l.saveSteps=function(){d=!0,e(a("/savesteps",null)).then(o)["catch"](s)},l.clearLastStep=function(){d=!0,e(a("/pop",null)).then(o)["catch"](s)},l.clearSteps=function(){d=!0,e(a("/clear",null)).then(o)["catch"](s)},l.playSteps=function(){d=!0,e(a("/play",null)).then(o)["catch"](s)},l.goToStart=function(){d=!0,e(a("/gostart",null,4e3)).then(i)["catch"](s)},l}angular.module("eeArmApp").factory("eeArmMovement",t),t.$inject=["$log","$http","appSettings"]}(),function(){"use strict";function t(t,e){return function(n){var o=[],i=function(){o.push(Array.prototype.slice.call(arguments))};return t.addEventListener("deviceready",function(){e.debug("deviceready"),o.forEach(function(t){n.apply(this,t)}),i=n},!1),function(){return i.apply(this,arguments)}}}angular.module("eeArmApp").factory("cordovaReady",t),t.$inject=["$window","$log"]}(),function(){"use strict";function t(t,e,n,o){t.addStep=function(){o.addStep(500),e.hide()},t.saveSteps=function(){o.saveSteps(),e.hide()},t.clearLastStep=function(){o.clearLastStep(),e.hide()},t.clearSteps=function(){o.clearSteps(),e.hide()},t.playSteps=function(){o.playSteps(),e.hide()},t.goToStart=function(){o.goToStart(),e.hide()}}angular.module("eeArmApp").controller("BottomSheet",t),t.$inject=["$scope","$mdBottomSheet","$log","eeArmMovement"]}(),function(){"use strict";function t(){var t={base:12,body:12,neck:12,claw:12},e="http://192.168.4.1",n={increments:t,host:e};return n}angular.module("eeArmApp").factory("appSettings",t)}(),function(){"use strict";function t(t,e,n,o,i,s){t.navBack=function(){o.history.back()}}angular.module("eeArmApp").controller("SettingsController",t),t.$inject=["$scope","$element","$http","$window","$log","eeArmMovement"]}(),function(){"use strict";function t(t,e,n,o,i,s,a,c){function r(e){t.indicators[e]=!0,o(function(){t.indicators[e]=!1},200)}t.indicators={},t.eeArmMovement=c,t.increase=function(t){c.increase(t),r(t)},t.decrease=function(t){c.decrease(t),r(t)},t.addStep=function(){c.addStep(500)},t.saveSteps=function(){c.saveSteps()},t.clearLastStep=function(){c.clearLastStep()},t.clearSteps=function(){c.clearSteps()},t.playSteps=function(){c.playSteps()},t.goToStart=function(){c.goToStart()},t.connect=function(){c.start()},t.resizeContent=function(){var n=1024,o=1124,i=e.find("#content").width(),s=e.find("#content").height(),a=n/o;s>i/a&&(s=i/a),i>s*a&&(i=s*a),t.contentWidth=i,t.contentHeight=s},t.openSideNav=function(){i("left").open()},t.openBottomSheet=function(){s.show({templateUrl:"app/components/bottomSheet/bottomSheet.html",parent:"#main"})},t.resizeContent(),c.start()}angular.module("eeArmApp").controller("MainController",t),t.$inject=["$scope","$element","$http","$timeout","$mdSidenav","$mdBottomSheet","$log","eeArmMovement"]}(),function(){"use strict";function t(t,e,n,o,i,s){t.navBack=function(){o.history.back()}}angular.module("eeArmApp").controller("ArmSettingsController",t),t.$inject=["$scope","$element","$http","$window","$log","eeArmMovement"]}(),function(){"use strict";function t(t,e,n,o,i,s){t.host=s.host,t.navBack=function(){o.history.back()},t.save=function(){s.host=t.host}}angular.module("eeArmApp").controller("AppSettingsController",t),t.$inject=["$scope","$element","$http","$window","$log","appSettings"]}(),function(){"use strict";function t(t,e,n,o,i,s,a){a(function(){e(function(){n.navigator.splashscreen.hide()},750)}),n.addEventListener("deviceready",function(){t.debug("ready"),e(function(){n.navigator.splashscreen.hide()},750)},!1),o.$state=i,o.$stateParams=s,t.debug("runBlock end")}angular.module("eeArmApp").run(t),t.$inject=["$log","$timeout","$window","$rootScope","$state","$stateParams","cordovaReady"]}(),function(){"use strict";function t(t,e){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("settings",{url:"/settings",templateUrl:"app/settings/settings.html",controller:"SettingsController",controllerAs:"settings"}).state("appSettings",{url:"/appsettings",templateUrl:"app/appSettings/appSettings.html",controller:"AppSettingsController",controllerAs:"appSettings"}).state("armSettings",{url:"/armsettings",templateUrl:"app/armSettings/armSettings.html",controller:"ArmSettingsController",controllerAs:"armSettings"}),e.otherwise("/")}angular.module("eeArmApp").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("eeArmApp").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,e,n){t.debugEnabled(!0),n.options.timeOut=3e3,n.options.positionClass="toast-top-right",n.options.preventDuplicates=!0,n.options.progressBar=!1,e.theme("default").primaryPalette("cyan").accentPalette("light-blue")}angular.module("eeArmApp").config(t),t.$inject=["$logProvider","$mdThemingProvider","toastr"]}(),angular.module("eeArmApp").run(["$templateCache",function(t){t.put("app/appSettings/appSettings.html",'<div layout="column" class="hundies" id="main"><md-toolbar><div class="md-toolbar-tools"><md-button class="md-icon-button" aria-label="Back" ng-click="navBack()"><md-icon md-svg-icon="assets/images/icons/left.svg"></md-icon></md-button><div flex=""></div><h1><span>eeArm</span></h1><div flex=""></div></div></md-toolbar><div id="content" flex=""><md-content layout-padding=""><md-subheader class="md-no-sticky">App Settings</md-subheader><md-input-container flex=""><label>Host</label> <input ng-model="host"></md-input-container><md-button flex="50" class="md-primary md-raised" ng-click="save()">Save</md-button></md-content></div></div>'),t.put("app/armSettings/armSettings.html",'<div layout="column" class="hundies" id="main"><md-toolbar><div class="md-toolbar-tools"><md-button class="md-icon-button" aria-label="Back" ng-click="navBack()"><md-icon md-svg-icon="assets/images/icons/left.svg"></md-icon></md-button><div flex=""></div><h1><span>eeArm</span></h1><div flex=""></div></div></md-toolbar><div id="content" flex=""><md-content><md-subheader class="md-no-sticky">Arm Settings</md-subheader><md-list-item><md-icon md-svg-icon="assets/images/icons/smartphone.svg"></md-icon><p>App Settings</p></md-list-item><md-list-item><md-icon md-svg-icon="assets/images/icons/tool.svg"></md-icon><p>Arm Settings</p></md-list-item><md-list-item><md-icon md-svg-icon="assets/images/icons/levels.svg"></md-icon><p>Calibration</p></md-list-item></md-content></div></div>'),t.put("app/main/main.html",'<div layout="column" class="hundies" id="main"><md-toolbar><div class="md-toolbar-tools"><md-button class="md-icon-button" aria-label="Settings" ui-sref="settings"><md-icon md-svg-icon="assets/images/icons/cogs.svg"></md-icon></md-button><div flex=""></div><h1><span>eeArm</span></h1><div flex=""></div><md-button class="md-icon-button" aria-label="Settings" ng-click="connect()"><md-icon md-svg-icon="assets/images/icons/connect.svg"></md-icon></md-button></div></md-toolbar><div id="content" flex="" layout="column" layout-align="center center" layout-wrap=""><div id="robot-control-wrapper" layout="column" ng-style="{height: contentHeight, width: contentWidth}"><div class="robot-indicator robot-connected ng-hide" ng-style="{height: contentHeight, width: contentWidth}" ng-show="eeArmMovement.connected"></div><div class="robot-indicator robot-base ng-hide" ng-style="{height: contentHeight, width: contentWidth}" ng-show="indicators.base"></div><div class="robot-indicator robot-body ng-hide" ng-style="{height: contentHeight, width: contentWidth}" ng-show="indicators.body"></div><div class="robot-indicator robot-neck ng-hide" ng-style="{height: contentHeight, width: contentWidth}" ng-show="indicators.neck"></div><div class="robot-indicator robot-claw ng-hide" ng-style="{height: contentHeight, width: contentWidth}" ng-show="indicators.claw"></div><div layout="row" flex="30"><div ng-click="decrease(\'claw\')" flex=""></div><div ng-click="increase(\'claw\')" flex=""></div></div><div layout="row" flex="25"><div ng-click="increase(\'neck\')" flex="40"></div><div ng-click="decrease(\'neck\')" flex=""></div></div><div layout="row" flex="25"><div ng-click="decrease(\'body\')" flex=""></div><div ng-click="increase(\'body\')" flex=""></div></div><div layout="row" flex=""><div ng-click="decrease(\'base\')" flex=""></div><div ng-click="increase(\'base\')" flex=""></div></div></div></div><md-toolbar><div class="md-toolbar-tools" layout="row" layout-align="space-between center" layout-wrap=""><md-button class="md-icon-button" aria-label="Add" ng-click="addStep()"><md-icon md-svg-icon="assets/images/icons/plus.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="Undo" ng-click="clearLastStep()"><md-icon md-svg-icon="assets/images/icons/undo.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="Go to start" ng-click="goToStart()"><md-icon md-svg-icon="assets/images/icons/flag.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="Play" ng-click="playSteps()"><md-icon md-svg-icon="assets/images/icons/play.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="More" ng-click="openBottomSheet()"><md-icon md-svg-icon="assets/images/icons/vertical.svg"></md-icon></md-button></div></md-toolbar></div>'),t.put("app/settings/settings.html",'<div layout="column" class="hundies" id="main"><md-toolbar><div class="md-toolbar-tools"><md-button class="md-icon-button" aria-label="Back" ng-click="navBack()"><md-icon md-svg-icon="assets/images/icons/left.svg"></md-icon></md-button><div flex=""></div><h1><span>eeArm</span></h1><div flex=""></div></div></md-toolbar><div id="content" flex=""><md-content><md-subheader class="md-no-sticky">Settings</md-subheader><md-list-item ng-click="$state.go(\'appSettings\')"><md-icon md-svg-icon="assets/images/icons/smartphone.svg"></md-icon><p>App Settings</p></md-list-item><md-list-item ui-sref="armSettings"><md-icon md-svg-icon="assets/images/icons/tool.svg"></md-icon><p>Arm Settings</p></md-list-item><md-list-item><md-icon md-svg-icon="assets/images/icons/levels.svg"></md-icon><p>Calibration</p></md-list-item></md-content></div></div>'),t.put("app/components/bottomSheet/bottomSheet.html",'<md-bottom-sheet ng-controller="BottomSheet" class="md-grid" layout="row" ng-cloak=""><md-list flex="" layout="row" layout-align="center center"><md-list-item><md-button class="md-grid-item-content" ng-click="addStep()"><md-icon md-svg-src="assets/images/icons/plus.svg"></md-icon><div class="md-grid-text">Add Step</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="saveSteps()"><md-icon md-svg-src="assets/images/icons/save.svg"></md-icon><div class="md-grid-text">Save Steps</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="clearLastStep()"><md-icon md-svg-src="assets/images/icons/undo.svg"></md-icon><div class="md-grid-text">Clear Last</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="goToStart()"><md-icon md-svg-src="assets/images/icons/flag.svg"></md-icon><div class="md-grid-text">Go to Start</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="playSteps()"><md-icon md-svg-src="assets/images/icons/play.svg"></md-icon><div class="md-grid-text">Play steps</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="clearSteps()"><md-icon md-svg-src="assets/images/icons/remove.svg"></md-icon><div class="md-grid-text">Clear Steps</div></md-button></md-list-item></md-list></md-bottom-sheet>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);