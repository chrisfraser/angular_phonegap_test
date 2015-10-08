!function(){"use strict";angular.module("eeArmApp",["ngAnimate","ui.router","ngMaterial"])}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("eeArmApp").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){}var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],e}angular.module("eeArmApp").directive("eeArmNav",t)}(),function(){"use strict";function t(t){function e(e,n,o,i){var a,c=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){c.type(t).pause()["delete"]()}),a=e.$watch("vm.contributors",function(){angular.forEach(i.contributors,function(t){c.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){a()})}function n(t,e){function n(){return o().then(function(){t.info("Activated Contributors View")})}function o(){return e.getContributors(10).then(function(t){return i.contributors=t,i.contributors})}var i=this;i.contributors=[],n()}var o={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:n,controllerAs:"vm"};return n.$inject=["$log","githubContributor"],o}angular.module("eeArmApp").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(t,e){function n(n){function i(t){return t.data}function a(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return n||(n=30),e.get(o+"/contributors?per_page="+n).then(i)["catch"](a)}var o="https://api.github.com/repos/Swiip/generator-gulp-angular",i={apiHost:o,getContributors:n};return i}angular.module("eeArmApp").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,e){function n(){}function o(){}var i={getSettings:n,saveSettings:o};return i}angular.module("eeArmApp").factory("eeArmSettings",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,e,n){function o(){r=!1}function i(t){s.base=t.base,s.body=t.body,s.neck=t.neck,s.claw=t.claw,r=!1}function a(e){t.error("Arm request failed.\n"+angular.toJson(e.data,!0)),r=!1}var c=!1,r=!1,s={},l={};return l.getRobot=function(){return s},l.start=function(){r=!0,e.get(n.host+"/arm",{timeout:5e3,cache:!1}).then(i)["catch"](function(){r=!1,c=!0,s.base=90,s.body=90,s.neck=0,s.claw=90})},l.increase=function(t){c&&180!==s[t]&&!r&&(s[t]+=n.increments[t],s[t]>180&&(s[t]=180),l.moveTo(s))},l.decrease=function(t){c&&0!==s[t]&&!r&&(s[t]-=n.increments[t],s[t]<0&&(s[t]=0),l.moveTo(s))},l.moveTo=function(t){r=!0,e.post(n.host+"/arm",{base:t.base,body:t.body,neck:t.neck,claw:t.claw},{timeout:1e3,cache:!1}).then(i)["catch"](a)},l.addStep=function(t){r=!0,e.post(n.host+"/add",{base:s.base,body:s.body,neck:s.neck,claw:s.claw,steps:0,delay:t},{timeout:1e3,cache:!1}).then(o)["catch"](a)},l.saveSteps=function(){r=!0,e.get(n.host+"/savesteps",{timeout:1e3,cache:!1}).then(o)["catch"](a)},l.clearLastStep=function(){r=!0,e.get(n.host+"/pop",{timeout:1e3,cache:!1}).then(o)["catch"](a)},l.clearSteps=function(){r=!0,e.get(n.host+"/clear",{timeout:1e3,cache:!1}).then(o)["catch"](a)},l.playSteps=function(){r=!0,e.get(n.host+"/go",{timeout:1e3,cache:!1}).then(o)["catch"](a)},l.goToStart=function(){r=!0,e.get(n.host+"/gostart",{timeout:1e3,cache:!1}).then(i)["catch"](a)},l}angular.module("eeArmApp").factory("eeArmMovement",t),t.$inject=["$log","$http","appSettings"]}(),function(){"use strict";function t(t){return function(e){var n=[],o=function(){n.push(Array.prototype.slice.call(arguments))};return t.addEventListener("deviceready",function(){n.forEach(function(t){e.apply(this,t)}),o=e},!1),function(){return o.apply(this,arguments)}}}angular.module("eeArmApp").factory("cordovaReady",t),t.$inject=["$window"]}(),function(){"use strict";function t(t,e,n,o){t.addStep=function(){o.addStep(500),e.hide()},t.saveSteps=function(){o.saveSteps(),e.hide()},t.clearLastStep=function(){o.clearLastStep(),e.hide()},t.clearSteps=function(){o.clearSteps(),e.hide()},t.playSteps=function(){o.playSteps(),e.hide()},t.goToStart=function(){o.goToStart(),e.hide()}}angular.module("eeArmApp").controller("BottomSheet",t),t.$inject=["$scope","$mdBottomSheet","$log","eeArmMovement"]}(),function(){"use strict";function t(){var t={base:12,body:12,neck:12,claw:12},e="http://192.168.4.1",n={increments:t,host:e};return n}angular.module("eeArmApp").factory("appSettings",t)}(),function(){"use strict";function t(t,e,n,o,i,a,c){t.increase=function(t){c.increase(t),a.debug("Robot: \n"+angular.toJson(c.getRobot(),!0))},t.decrease=function(t){c.decrease(t)},t.addStep=function(){c.addStep(500)},t.saveSteps=function(){c.saveSteps()},t.clearLastStep=function(){c.clearLastStep()},t.clearSteps=function(){c.clearSteps()},t.playSteps=function(){c.playSteps()},t.goToStart=function(){c.goToStart()},t.resizeContent=function(){var n=1024,o=1124,i=e.find("#content").width(),a=e.find("#content").height(),c=n/o;a>i/c&&(a=i/c),i>a*c&&(i=a*c),t.contentWidth=i,t.contentHeight=a},t.openSideNav=function(){o("left").open()},t.openBottomSheet=function(){i.show({templateUrl:"app/components/bottomSheet/bottomSheet.html",parent:"#main"})},t.resizeContent(),c.start()}angular.module("eeArmApp").controller("MainController",t),t.$inject=["$scope","$element","$http","$mdSidenav","$mdBottomSheet","$log","eeArmMovement"]}(),function(){"use strict";function t(t,e,n,o){o(function(){n.navigator.splashscreen&&e(function(){n.navigator.splashscreen.hide()},750)}),t.debug("runBlock end")}angular.module("eeArmApp").run(t),t.$inject=["$log","$timeout","$window","cordovaReady"]}(),function(){"use strict";function t(t,e){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),e.otherwise("/")}angular.module("eeArmApp").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("eeArmApp").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-top-right",e.options.preventDuplicates=!0,e.options.progressBar=!1}angular.module("eeArmApp").config(t),t.$inject=["$logProvider","toastr"]}(),angular.module("eeArmApp").run(["$templateCache",function(t){t.put("app/main/main.html",'<div layout="column" class="hundies" id="main"><md-toolbar><div class="md-toolbar-tools"><div flex=""></div><h1><span>eeArm</span></h1><div flex=""></div></div></md-toolbar><div id="content" flex="" layout="column" layout-align="center center" layout-wrap=""><div id="robot-control-wrapper" layout="column" ng-style="{height: contentHeight, width: contentWidth}"><div layout="row" flex="30"><div ng-click="decrease(\'claw\')" flex=""></div><div ng-click="increase(\'claw\')" flex=""></div></div><div layout="row" flex="25"><div ng-click="increase(\'neck\')" flex="40"></div><div ng-click="decrease(\'neck\')" flex=""></div></div><div layout="row" flex="25"><div ng-click="decrease(\'body\')" flex=""></div><div ng-click="increase(\'body\')" flex=""></div></div><div layout="row" flex=""><div ng-click="decrease(\'base\')" flex=""></div><div ng-click="increase(\'base\')" flex=""></div></div></div></div><md-toolbar><div class="md-toolbar-tools" layout="row" layout-align="space-between center" layout-wrap=""><md-button class="md-icon-button" aria-label="Add" ng-click="addStep()"><md-icon md-svg-icon="assets/images/icons/plus.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="Undo" ng-click="clearLastStep()"><md-icon md-svg-icon="assets/images/icons/undo.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="Go to start" ng-click="goToStart()"><md-icon md-svg-icon="assets/images/icons/flag.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="Play" ng-click="playSteps()"><md-icon md-svg-icon="assets/images/icons/play.svg"></md-icon></md-button><md-button class="md-icon-button" aria-label="More" ng-click="openBottomSheet()"><md-icon md-svg-icon="assets/images/icons/vertical.svg"></md-icon></md-button></div></md-toolbar></div>'),t.put("app/components/bottomSheet/bottomSheet.html",'<md-bottom-sheet ng-controller="BottomSheet" class="md-grid" layout="row" ng-cloak=""><md-list flex="" layout="row" layout-align="center center"><md-list-item><md-button class="md-grid-item-content" ng-click="addStep()"><md-icon md-svg-src="assets/images/icons/plus.svg"></md-icon><div class="md-grid-text">Add Step</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="saveSteps()"><md-icon md-svg-src="assets/images/icons/save.svg"></md-icon><div class="md-grid-text">Save Steps</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="clearLastStep()"><md-icon md-svg-src="assets/images/icons/undo.svg"></md-icon><div class="md-grid-text">Clear Last</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="goToStart()"><md-icon md-svg-src="assets/images/icons/flag.svg"></md-icon><div class="md-grid-text">Go to Start</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="playSteps()"><md-icon md-svg-src="assets/images/icons/play.svg"></md-icon><div class="md-grid-text">Play steps</div></md-button></md-list-item><md-list-item><md-button class="md-grid-item-content" ng-click="clearSteps()"><md-icon md-svg-src="assets/images/icons/remove.svg"></md-icon><div class="md-grid-text">Clear Steps</div></md-button></md-list-item></md-list></md-bottom-sheet>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);