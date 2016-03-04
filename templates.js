angular.module("retinaeApp").run(["$templateCache", function($templateCache) {$templateCache.put("common/page.tpl.html","<article id=\"main-content\">\n  \n  <!-- Background element -->\n  <div class=\"background-img\" ng-include src=\"\'modules/mod-background/background.tpl.html\'\"></div>\n\n  <div class=\"grid-container\">\n    \n    <div class=\"content\">\n      \n      <!-- Header -->\n      <header class=\"clearfix\" ng-include src=\"\'modules/mod-header/header.tpl.html\'\"></header>\n\n      <main id=\"main\">\n        \n        <!-- Single Page -->\n        <div ng-if=\"!pageObj.landingPage\">\n          <div ng-include src=\"\'pages/single-page.tpl.html\'\"></div>\n        </div>\n        \n        <!-- Browser Page -->\n        <div ng-if=\"pageObj.landingPage\" class=\"landing-page\">\n          <div ng-include src=\"\'pages/browser.tpl.html\'\"></div>\n        </div>\n\n      </main>\n\n    </div>\n\n  </div>\n\n</article>");
$templateCache.put("pages/browser.tpl.html","<div class=\"clearfix landing-page-content\">\n  \n  <!-- PREVIEW MODULE -->\n  <section ng-class=\"{\'inactive\': !pageObj.selectedPage}\" class=\"grid-33 hide-on-tablet hide-on-mobile preview\">\n    <h3 class=\"preview-title\">{{pageObj.selectedPage.title}}</h3>\n    <p class=\"thereIsMoreText\" ng-bind=\"pageObj.selectedPage.short_description\">...</p>\n    <div class=\"img-wrapper\"><img ng-src=\"{{pageObj.thumbsBaseUrl+pageObj.selectedPage.image || pageObj.selectedPage.slider_content[0].image}}\"/></div>\n  </section>\n  \n  <!-- GRID MODULE -->\n  <section class=\"grid-66 tablet-grid-100 mobile-grid-100 right-content grid-module\">\n    \n   <!--  <div class=\"clearfix\">\n      <div class=\"grid-60 tags-wrapper\">\n        <div class=\"filters-bar\">\n          <a href=\"\" class=\"tags-button\" ng-click=\"pageObj.showTags = !pageObj.showTags\"><span>More </span><span class=\"icon glyphicon glyphicon-chevron-down\"></span></a>\n          <a href=\"\" ng-show=\"pageObj.selectedTag\" class=\"clear-filter\" ng-click=\"pageObj.filterByTag(0)\">Clear Filter <span class=\"icon glyphicon glyphicon-remove\"></span></a>\n        </div>\n      </div>\n    </div> -->\n\n      <p class=\"show-results\" ng-show=\"pageObj.filtering\">Showing results for {{pageObj.filtering}}</p>\n      <p class=\"show-results\" ng-show=\"pageObj.selectedTag\">Showing results for tag {{pageObj.tags[pageObj.selectedTag].name}}</p>\n      <ul class=\"tiles clearfix\">\n        <li ng-repeat=\"page in pageObj.filteredPages = (pageObj.lazyPages.pages | filter:{title: pageObj.filtering}:false | selectedTags:pageObj.getTag())\" ng-if=\"page.id != \'landing\'\" class=\"tile grid-33 tablet-grid-33 mobile-grid-50\" title=\"{{page.title}}\" on-finish-render=\"allRendered\">\n          <a href=\"\" ng-mouseover=\"pageObj.showPreview(page)\" ng-click=\"pageObj.goToPage(pageObj.selectedPage.id)\" class=\"item\">\n            <div class=\"img-container\">\n              <img class=\"image-tile\" ng-src=\"{{pageObj.thumbsBaseUrl+page.image}}\"/>\n            </div>\n            <h3 class=\"title\">{{page.title}}</h3>\n          </a>\n        </li>\n        <p class=\"list-placeholder\" ng-show=\"!pageObj.filteredPages.length\">0 results found for your current filter selection</p>\n      </ul>\n\n  </section>\n\n</div>\n\n <div class=\"overlay expanded tagsOverlay\" ng-mouseleave=\"pageObj.hideTags()\" ng-class=\"{active: pageObj.showTags}\">\n  \n  <ul class=\"tags clearfix\">\n    \n    <li class=\"grid-15 tablet-grid-25 mobile-grid-50\" ng-repeat=\"tag in pageObj.tags\" ng-click=\"pageObj.filterByTag(tag.id); pageObj.showTags = !pageObj.showTags; pageObj.hideTags()\" ng-class=\"{active: pageObj.selectedTag == tag.id}\">\n      <a href=\"\">{{tag.name}}</a>\n    </li>\n    <li class=\"clearTags\"><a href=\"\" ng-click=\"pageObj.filterByTag(); pageObj.showTags = !pageObj.showTags; pageObj.hideTags()\">Reset</a></li>\n\n  </ul>\n\n</div>");
$templateCache.put("pages/login.tpl.html","<div class=\"col-md-5 col-md-offset-1\">\n  <div class=\"pull-left\">\n    <img src=\"../assets/imgs/retinae-logo-white.png\" class=\"img-responsive logo-img\" alt=\"\">\n  </div>\n  <div class=\"pull-right\">\n    <div class=\"menu-icons\">\n      <div class=\"dropdown\" ng-show=\"vm.isLoggedIn\">\n        <a aria-hidden=\"true\" href=\"#\" class=\"glyphicon glyphicon-user glyphiconUser\"></a>\n        <div class=\"dropdown-content\">\n          <a href=\"#\">My Profile</a>\n          <a ng-click=\"vm.logout()\">Log out</a>\n        </div>\n      </div>\n      <a aria-hidden=\"true\" ng-controller=\"pagesController\" ng-click=\"pageObj.searchFunctionality()\" class=\"glyphicon glyphicon-search glyphiconSearch\"></a>\n      <a aria-hidden=\"true\" href=\"#\" class=\"glyphicon glyphicon-cog glyphiconCog\"></a>\n    </div>\n  </div>\n  <form>\n    <div class=\"well well-sm\">\n      <h4>\n        <strong class=\"title-auth\">\n          Log In / <a ng-click=\"vm.goToRegister()\">Register</a>\n        </strong>\n      </h4>\n      <div class=\"error-message\" ng-show=\"vm.errorLogin\">\n        {{ vm.errorLogin }}\n      </div>\n      <div class=\"form-group\">\n        <input type=\"email\" ng-model=\"loginModal.email\" class=\"form-control input-email\" placeholder=\"Email\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" ng-model=\"loginModal.password\" class=\"form-control input-password\" placeholder=\"Password\">\n      </div>\n      <h4>\n        <strong class=\"title-auth\">\n          Login via \n          <a ng-click=\"vm.twitterLogin()\"><i class=\"fa fa-twitter-square fa-lg\"></i></a>\n          <a ng-click=\"vm.facebookLogin()\"><i class=\"fa fa-facebook-square fa-lg\"></i></a>\n          <a ng-click=\"vm.googleLogin()\"><i class=\"fa fa-google-plus-square fa-lg\"></i></a>\n        </strong>\n      </h4>\n      <br>\n      <button type=\"submit\" class=\"btn btn-circle btn-default\">Go </button>\n    </div>\n  </form>\n</div>");
$templateCache.put("pages/register.tpl.html","<div class=\"col-md-5 col-md-offset-1\">\n  <div class=\"pull-left\">\n    <img src=\"../assets/imgs/retinae-logo-white.png\" class=\"img-responsive logo-img\" alt=\"\">\n  </div>\n  <div class=\"pull-right\">\n    <div class=\"menu-icons\">\n      <div class=\"dropdown\" ng-show=\"vm.isLoggedIn\">\n        <a aria-hidden=\"true\" href=\"#\" class=\"glyphicon glyphicon-user glyphiconUser\"></a>\n        <div class=\"dropdown-content\">\n          <a href=\"#\">My Profile</a>\n          <a ng-click=\"vm.logout()\">Log out</a>\n        </div>\n      </div>\n      <a aria-hidden=\"true\" ng-controller=\"pagesController\" ng-click=\"pageObj.searchFunctionality()\" class=\"glyphicon glyphicon-search glyphiconSearch\"></a>\n      <a aria-hidden=\"true\" href=\"#\" class=\"glyphicon glyphicon-cog glyphiconCog\"></a>\n    </div>\n  </div>\n  <form novalidate=\"novalidate\" name=\"registerForm\" ng-submit=\"vm.register(registerForm.$valid)\">\n    <div class=\"well well-sm\">\n      <h4>\n        <strong class=\"title-auth\">\n          Register / <a ng-click=\"vm.goToLogin()\">Log In</a>\n        </strong>\n      </h4>\n      <div class=\"error-message\" ng-show=\"vm.errorRegister\">\n        {{ vm.errorRegister }}\n      </div>\n      <!-- <div class=\"error-message\" ng-show=\"!registerForm.email.$valid && !registerForm.$pristine\">\n        The email is invalid\n      </div> -->\n      <div class=\"error-message\" ng-show=\"registerForm.email.$error.email && (!registerForm.$pristine || registerForm.$submitted)\">\n        The email is invalid\n      </div>\n      <div class=\"error-message\" ng-show=\"registerForm.email.$error.required  && (!registerForm.$pristine || registerForm.$submitted)\">\n        The email filed is required\n      </div>\n      <div class=\"form-group\">\n        <input type=\"text\" ng-model=\"registerModel.name\" class=\"form-control input-name\" placeholder=\"Name\" required=\"required\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"email\" ng-model=\"registerModel.email\" name=\"email\" class=\"form-control input-reg-email\" placeholder=\"Email\" required=\"required\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" ng-model=\"registerModel.password\" class=\"form-control input-password\" placeholder=\"Password\" required=\"required\">\n      </div>\n      <h4>\n        <strong class=\"title-auth\">\n          Login via \n          <a ng-click=\"vm.twitterLogin()\"><i class=\"fa fa-twitter-square fa-lg\"></i></a>\n          <a ng-click=\"vm.facebookLogin()\"><i class=\"fa fa-facebook-square fa-lg\"></i></a>\n          <a ng-click=\"vm.googleLogin()\"><i class=\"fa fa-google-plus-square fa-lg\"></i></a>\n        </strong>\n      </h4>\n      <br>\n      <button type=\"submit\" class=\"btn btn-circle btn-default\">Go </button>\n    </div>\n  </form>\n</div>");
$templateCache.put("pages/single-page.tpl.html","<div ng-if=\"pageObj.page.contentArr\" class=\"grid-100 slider-wrepper\" ng-class=\"{clickable: pageObj.displayClick}\" ng-init=\"pageObj.dotsSldr = true;\">\n  <div class=\"play-btn-wrapper\">\n    <a ng-if=\"pageObj.videoState.type == \'normal\' && pageObj.currNormalVideoSrc && pageObj.displayPlayBtn\" ng-click=\"pageObj.videoControl.playPause(\'normal\')\" data-d=\"{{pageObj.videoState.type}}\" class=\"play-video\" ng-class=\"{\'paused\': pageObj.videoState.playing}\"><img ng-src=\"{{pageObj.videoState.playPauseImg || \'assets/imgs/play-btn.png\'}}\" alt=\"play\" title=\"play\"/></a>\n  </div>  \n  <div class=\"slider-element\" ng-class=\"{presentation: pageObj.page.type == \'presentation\'}\" ng-show=\"!pageObj.page.custom_slider\">\n    <li ng-repeat=\"item in pageObj.page.contentArr track by $index\" ng-bind-html=\"item\" ng-click=\"pageObj.checkForEvents($index)\"></li>\n  </div>\n  <!-- <a class=\"click-to-view\" ng-href=\"{{pageObj.slide_link}}\" ng-class=\"{clickable: pageObj.slide_link}\" target=\"_blank\">click to view</a> -->\n  <p class=\"slider-page-number\" ng-show=\"pageObj.currentSlide\"><span ng-bind=\"pageObj.currentSlide\"></span><span class=\"separator\"> of </span><span ng-bind=\"pageObj.sldrLength\"</p>\n  <!-- <div class=\"clearfix\" ng-if=\"pageObj.dotsSldr == true;\">\n    <div class=\"grid-30 prefix-35 dots-slider-wrapper\" style=\"height: 26px; position: relative;\">\n      <ul class=\"dots-slider\">\n        <li ng-repeat=\"item in pageObj.page.contentArr\" class=\"\"><span class=\"button\">&nbsp;</span></li>\n      </ul>\n      <a href=\"\" class=\"dot-arrows left\" ng-click=\"pageObj.sliderGoTo(\'first\')\">&nbsp;</a>\n      <a href=\"\" class=\"dot-arrows right\" ng-click=\"pageObj.sliderGoTo(\'last\')\">&nbsp;</a>\n      <p class=\"sldr-index\" ng-if=\"pageObj.sldrLength\">\n        <span ng-bind=\"pageObj.currentSlide\"></span><span class=\"separator\"> of </span><span ng-bind=\"pageObj.sldrLength\"></span>\n      </p>\n    </div>\n  </div> -->\n</div>\n\n<div ng-show=\"pageObj.showNormalPlayer && pageObj.videoState.type == \'normal\' && pageObj.currNormalVideoSrc\" class=\"video-wrapper\">\n  <video id=\"playerNormal\" controls>\n    <source src=\"{{pageObj.currNormalVideoSrc | trustUrl}}\" data-t=\"{{pageObj.currNormalVideoSrc}}\" type=\"video/mp4\">\n  Your browser does not support the video tag.\n  </video>\n  <a href=\"\" class=\"close-btn glyphicon glyphicon-remove\" ng-click=\"pageObj.videoControl.close(\'normal\')\"></a>\n</div>\n\n<div class=\"custom-slider-wrapper\" ng-show=\"pageObj.page.custom_slider && pageObj.page.custom_slider.length\">\n  <ul class=\"custom-slider slider-element\">\n    <li ng-repeat=\"cs in pageObj.page.custom_slider\">\n      <h3 class=\"slider-title\" ng-show=\"cs.title\" ng-bind=\"cs.title\"></h3>\n      <img ng-src=\"{{(pageObj.isMobile ? pageObj.thumbsBaseUrl : pageObj.imagesBaseUrl) + cs.image}}\" alt=\"cs.title\">\n    </li>\n  </ul>\n  <p class=\"slider-page-number\" ng-show=\"pageObj.custom_slider_index\"><span ng-bind=\"pageObj.custom_slider_index\"></span><span class=\"separator\"> of </span><span ng-bind=\"pageObj.page.custom_slider.length\"</p>\n</div>\n");
$templateCache.put("modules/mod-background/background.tpl.html","<img ng-src=\"{{pageObj.page.currImage}}\" ng-show=\"pageObj.page.currImage\" ng-class=\"{mobile: pageObj.isMobile}\" class=\"bg-image\"/>\n<div id=\"backgroundVideoContainer\" ng-show=\"!pageObj.landingPage && pageObj.videoState.playing && pageObj.videoState.type == \'background\' && pageObj.currVideoSrc\" class=\"video-container\">\n  <video id=\"playerBg\" class=\"bg-video\" muted autoplay loop>\n	  <source src=\"{{pageObj.currVideoSrc | trustUrl}}\" data-t=\"{{pageObj.currVideoSrc}}\" type=\"video/mp4\">\n	Your browser does not support the video tag.\n	</video>\n</div>\n\n<div class=\"container-wrapper bg-video-overlay test active\"></div>\n\n<!-- <div ng-class=\"{\'active\': pageObj.videoObj.background && pageObj.videoState.type == \'background\' && pageObj.isVideo || pageObj.isMobileBgImg, \'test\': pageObj.test}\" class=\"container-wrapper bg-video-overlay\"></div> -->\n");
$templateCache.put("modules/mod-header/header.tpl.html","<div class=\"grid-100 logo-box\">\n  <h1 class=\"logo\" ng-click=\"pageObj.test = !pageObj.test; pageObj.ads.play();\"><img src=\"assets/imgs/retinae-logo-white.png\" alt=\"retinae\"/></h1>\n  <h3 class=\"page-title\" ng-class=\"{\'line-break\': pageObj.longTitle}\">{{pageObj.page.title}}</h3>\n</div>\n<div class=\"grid-100 text-right-mobile menu-content\">\n  <div class=\"menu-icons\">\n    \n    <a aria-hidden=\"true\" ng-click=\"pageObj.userAuth()\" class=\"icon glyphicon glyphicon-user user\"></a>\n\n    <a aria-hidden=\"true\" ng-click=\"pageObj.searchFunctionality()\" class=\"icon glyphicon glyphicon-search search\"></a>\n    \n    <a aria-hidden=\"true\" ng-click=\"pageObj.clickShowTags()\" class=\"icon glyphicon glyphicon-tag tagsIcon\" ng-class=\"{clicked: pageObj.showTags}\"></a>\n  \n    <a aria-hidden=\"true\" ng-mouseenter=\"pageObj.mouseEnterLeave(\'show\')\" ng-click=\"pageObj.menuShowHide()\" ng-class=\"{active: pageObj.showMenu}\" ng-mouseleave=\"pageObj.mouseLeave(\'hide\')\" class=\"icon menuIcon glyphicon glyphicon-menu-hamburger\"></a>\n\n    <div ng-show=\"pageObj.showSearch && pageObj.pageId == \'landing\'\"class=\"search-wrapper\">\n      <input type=\"text\" id=\"search\" name=\"search\" ng-model=\"pageObj.filtering\" placeholder=\"Type here to filter\" ng-keyup=\"pageObj.keyPress($event)\"/>\n    </div>\n  \n  </div>\n  <div ng-init=\"pageObj.showMenu = false\" ng-class=\"{active: pageObj.showMenu}\" ng-mouseleave=\"pageObj.mouseEnterLeave(\'hide\')\" class=\"menu-wrapper\">\n    <ul class=\"menu clearfix\">\n      <li ng-repeat=\"itm in pageObj.menu\" ng-class=\"{active: itm.active}\" class=\"grid-15 tablet-grid-25 mobile-grid-50\"><a ng-href=\"{{itm.url}}\">{{itm.text}}</a></li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"ov-wrapper overlays\" ng-show=\"pageObj.ads.overlay.value\">\n  <div class=\"content ads\">\n    <div id=\"ads-player\"></div>\n  </div>\n  <span class=\"overlay-close-timer\" ng-show=\"pageObj.timer > 0\">{{pageObj.timer}}s</span>\n  <a href=\"\" class=\"close-btn glyphicon glyphicon-remove\" ng-class=\"{active: !(pageObj.timer > 0)}\" ng-click=\"(pageObj.timer > 0) || pageObj.ads.overlay.hide()\"></a>\n</div>");}]);