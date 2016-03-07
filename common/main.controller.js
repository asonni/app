(function(){
  /* global angular:false */
  /* jshint unused:false */

  'use strict';

  angular.module('retinaeApp')
  .controller('pagesController', [ '$scope', '$rootScope', 'pagesService', 'singlePageService', 'tagsService', '$filter', '$timeout', '$location', '$window', '$routeParams', 'jwplayer', 'VideoTools', 'rackspace', '$interval', function ($scope, $rootScope, pagesService, singlePageService, tagsService, $filter, $timeout, $location, $window, $routeParams, jwplayer, VideoTools, rackspace,$interval) {
    var pageObj = this;

    pageObj.loading = true;

    // rackspace is defined as constants in the module
    
    pageObj.test = true;

    pageObj.filtering = '';

    pageObj.thumbsBaseUrl = rackspace.thumbs;
    pageObj.imagesBaseUrl = rackspace.images;

    pageObj.ads = {
      defaultTag: 'http://www.adotube.com/php/services/player/OMLService.php?avpid=oRYYzvQ&platform_version=vast20&ad_type=linear&groupbypass=1&HTTP_REFERER=http://www.longtailvideo.com&video_identifier=longtailvideo.com,test', 
      visible: false,
      setupPlayer: function(){
        pageObj.adsPlayer = jwplayer('ads-player');
        
        pageObj.adsPlayer.setup({
          file: "http://f1bc7778405f27e9d564-7620cf1c2f93a8669fb01d1f221a5e8c.r68.cf3.rackcdn.com/blank.mp4",
          //mute: true,
          controls: false
        });

        pageObj.ads.eventsHandler();
      },
      play: function(tagUrl, resume){
        if(!resume){
          pageObj.timer = 0;
          pageObj.timerStart(3000, function(){
            pageObj.ads.overlay.closeActive.show();
          });
        }
        var tag = tagUrl || this.defaultTag;
        console.log('Play Ads');
        if(!isMobile() && !resume){
          pageObj.adsPlayer.playAd(tag)
        }else{
          pageObj.adsPlayer.play();
          //pageObj.adsPlayer.playAd(tag)
        }
      },
      stop: function(){
        console.log('Stop player');
        pageObj.adsPlayer.pause(true)
        pageObj.adsPlayer.stop()
      },
      eventsHandler: function(){
        pageObj.adsPlayer.on('adClick', function(){
          console.log('Ad Click!!');
        })
        pageObj.adsPlayer.on('adRequest', function(){
          console.log('Ad Started!!');
          this.visible = true;
        })
      },
      checkState: function(v){
        console.log('STATE', pageObj.adsPlayer.getState(), 'WinVisible', v);
        if(pageObj.adsPlayer.getState() == 'paused' && v == 'visible'){
          console.log('Play Video Again');
          pageObj.ads.play(null, 'resume');
        }
      },
      overlay: {
        value: null,
        show: function(val){
          this.value = val;
          pageObj.ads.play();
        },
        hide: function(){
          pageObj.ads.stop();
          this.value = null;
          console.log('Hide player');
        },
        closeActive: {
          value: false,
          show: function(){
            this.value = true;
          },
          hide: function(){
            this.value = false;
          }
        },
        continue: function(){
          pageObj.adsPlayer.play();
        }
      }
    }

    $

    pageObj.timer = 0;

    pageObj.timerStart = function(timeLimit, callback) {
      var remaining = timeLimit, h, m, s;
      var startTime = +new Date();

      timeLimit += 1000;

      var instance = function() {
        if (remaining > 0) {                      console.log('## TIMER ##',startTime, remaining, ' ', h, m, s);
          remaining = timeLimit - ((+new Date()) - startTime);
          h = Math.floor(remaining / 3600000);
          m = Math.floor(remaining % 3600000 / 60000);
          s = Math.floor(remaining % 3600000 % 60000 / 1000);
          $timeout(function(){
            pageObj.timer = s;
          });
          window.setTimeout(instance, 500);
        } else {                       console.log('## TIMER COMPLETE ##');
          $timeout(function(){
            pageObj.timer = s;
          });
          return callback();
        }
      };

      window.setTimeout(instance, 0);

      //instance();
    };

    var isMobile = function(){
      var a = navigator.userAgent || navigator.vendor || window.opera,
        resp = (/(android|bb\d+|meego|android|ipad|playbook|silk).+mobile|avantgo|bada\/|blackberry|blazer|nexus|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) ? true : false;
        return resp;
    }

    var getPage = function(page, pages){
      var single_object = $filter('filter')(pages, function (d) {return d.id == page;})[0];
      return single_object;
    }

    var addThisStyles = function(styles){
      $('body').append('<style>'+styles+'</style>')
    }

    pageObj.currImgPath = (isMobile()) ? rackspace.images_mobile : rackspace.images;

    var resizeTiles = function(img, counter){
      var proccess = function(){
        var newStyle = '#main .tiles .tile {min-height: ' + parseInt(img.height() + 18 + 10) + 'px;}' + 
          '#main .tiles .tile img{min-height: ' + img.height() + 'px;}' +
          '#main .img-container{height: ' + img.height() + 'px;}';
        
        addThisStyles(newStyle);

        $timeout(function(){
          pageObj.loading = false;
        })

        // $('.preview .img-wrapper').css({'height': $('.preview .img-wrapper').width() * 0.6652360515021459, 'overflow': 'hidden'});
        // $('.preview .img-wrapper img').css({'min-height': $('.preview .img-wrapper').width() * 0.6652360515021459, 'width': '100%'});
      }

      if(counter == 25 || img.height() > 40){
        proccess();
        return true;
      }else{
        return false;
      }
    }

    var measureTiles = function(){
      var interval,
        counter = 0;

      interval = setInterval(function(){
        var img = $('.tiles .tile:eq(0) .item img');
        if(resizeTiles(img, counter)){
          clearInterval(interval);
        }
        counter += 1;
      }, 200);
    };

    var defineMenu = function(arr, active){
      var max = arr.length,
        tmpArr = [];
      for(var i = 0; i < max; i++){
        if(arr[i].exclude_from_menu != "true" || !arr[i].exclude_from_menu){
          var obj = {}
          obj.active = (arr[i].id == active) ? true : false;
          obj.url = "/#!/page/"+arr[i].id;
          obj.text = arr[i].title;
          tmpArr.push(obj);
        }
      }
      return tmpArr;
    }

    var addThumbnails = function(pages){

      var getThumb = function(i){
        var img = i.split('pictures/');
        return rackspace.thumbs+img[1];
      }

      for (var i = pages.length - 1; i >= 0; i--) {
        if(pages[i].image){
          pages[i].imageThumb = rackspace.thumbs+pages[i].image;
        }
      };

      return pages;
    }

    var lazyPagesChanged = false;

    pageObj.keyPress = function(evt){
      var regex = /^[0-9a-zA-ZäöüÄÖÜ]+$/;
      pageObj.selectedTag = '';
      if (regex.test(pageObj.filtering) && !lazyPagesChanged){
        pageObj.lazyPages.pages = pageObj.pages;
        lazyPagesChanged = true;
      }
    }

    pageObj.lazyPages = {
      pages: [],
      display: 18,
      currStartFrom: -1,
      getMore: function(callback){
        var _this = this;
        if(this.currStartFrom == this.pages.length)
          return false;

        _this.currStartFrom = _this.pages.length;
        var nextItems = pageObj.pages.slice(_this.pages.length, (_this.pages.length + _this.display));
        for(var i=0; i<nextItems.length; i++){
          _this.pages.push(nextItems[i]);
        }
        if(callback)
          return callback();
      }
    };

    pageObj.mouseEnterLeave = function(action){
      if(!isMobile() || action != 'show'){
        pageObj.showMenu = (action == 'show') ? true : false;
      }
    }
    pageObj.showtagList = false;
    pageObj.clickShowTags = function(){
      if(pageObj.landingPage){
        pageObj.showTags = !pageObj.showTags;
      }else{
        pageObj.page = getPage('landing', pageObj.pages);
        $location.path('/page/'+pageObj.page.id);
        pageObj.landingPage = (pageObj.page.id == "landing") ? true : false;
        pageObj.showTags = true;
      }
      pageObj.showSearch = false;
        
        // angular.element(".tagsIcon").toggleClass("clicked");
        // angular.element(".tagsOverlay").css("height","350px");
        // if(angular.element(".tagsOverlay").css("height") == "350px")
        //   angular.element(".tagsOverlay").css("height","0px");
    }
    
    pageObj.hideTags = function(){
      pageObj.showTags = false;
    }

    pageObj.mouseLeave = function(){
      if(isMobile()){
        pageObj.showMenu = false;
      }else{
        if(pageObj.showMenu){
          pageObj.showMenu = false;
        }
      }
    }

    pageObj.searchFunctionality = function(){
      pageObj.loginPage = false;
      if(pageObj.landingPage){
        pageObj.showSearch = !pageObj.showSearch;
        if(pageObj.showSearch){
          pageObj.filtering = "";
          pageObj.selectedTag = '';
        }
      }else{
        pageObj.page = getPage('landing', pageObj.pages);
        $location.path('/page/'+pageObj.page.id);
        //window.history.pushState(null, pageObj.page.title, "#/page/"+pageObj.page.id+"?search=true");
        pageObj.landingPage = (pageObj.page.id == "landing") ? true : false;
        pageObj.showSearch = true;
        //measureTiles();
      }
      pageObj.showTags = false;
    }

    pageObj.userLogin = function(){
      console.log(pageObj.pages);
      
      // pageObj.pages.push(pageObj.login);
      if(getPage('login', pageObj.pages) != undefined) {
        pageObj.page = getPage('login', pageObj.pages);
        $location.path('/page/'+pageObj.page.id);
      } else {
        pageObj.login = {
          id: 'login',
          image: '',
          short_description: "Go to the login.",
          title: "Login"
        };
        pageObj.pages.push(pageObj.login);
        $location.path('/page/'+pageObj.login.id);
      }  
    }

    pageObj.goToPage = function(pageId){
      if(!isNaN(pageId)){
        pageId = pageObj.pages[pageId].id;
      }
      //history.pushState(null, pageObj.page.title, "/#/page/"+pageId);
      $location.path('/page/'+pageId);
      pageObj.page = getPage(pageId, pageObj.pages);
      pageObj.landingPage = (pageObj.page.id == "landing") ? true : false;
    }

    pageObj.menuShowHide = function(){
      pageObj.showMenu = (pageObj.showMenu == false) ? true : false;
    }

    pageObj.filterByTag = function(tagId){
      pageObj.selectedTag = (tagId) ? tagId : '';
      if(!lazyPagesChanged){
        pageObj.lazyPages.pages = pageObj.pages;
        lazyPagesChanged = true;
      }
    }

    pageObj.getTag = function(){
      return pageObj.selectedTag || null;
    }


    var width,
      height;
    var processImage = function(img, counter){

      var marginLeft = function(){
        img.css({
          'margin-left': '-'+(img.width()/2)+'px'
        });
      }

      if((width != img.width() || height != img.height()) && counter > 0){
        marginLeft();
        return true;
      }

      width = img.width();
      height = img.height();

      if(counter == 15){
        marginLeft();
        return true;
      }else{
        return false;
      }

    }

    var isEmptyObj = function(obj){
      return (JSON.stringify(obj) == '{}');
    }

    var fixBgImages = function(landing){
      var interval,
        counter = 0;

      if(landing)
        counter = 10;

      $('.background-img > img').addClass('tmp-hidden');
      
      if($(window).width() < 1024){
        interval = setInterval(function(){
          var img = $('.background-img > img');
          if(processImage(img, counter)){
            clearInterval(interval);
            $('.background-img > img').removeClass('tmp-hidden');
          }
          counter += 1;
        }, 50);
      };
    }

    pageObj.goTo = function(item, delay){
      var time = delay || "slow"; 
      $('body,html').animate({scrollTop: $(item).offset().top}, time);
    };

    //////////////////////////////////////
    // JWPLAYER Related stuff
    //////////////////////////////////////

    pageObj.videoState = {};

    pageObj.isMobile = isMobile();


    pageObj.showPreview = function(page){
      pageObj.selectedPage = page;
    }

    pageObj.resetPreview = function(){
      pageObj.selectedPage = null;
    }
    
    var resetState = function(type){
      pageObj.videoState.playing = false;
      pageObj.videoState.playPauseImg = 'assets/imgs/play-btn.png';
      pageObj.videoState.type = type || null;
    };

    resetState();

    var playingFunction = function(type, playing){
      $timeout(function(){
        pageObj.videoState.playing = playing;
        pageObj.videoState.playPauseImg = (playing) ? 'assets/imgs/pause-btn.png' : 'assets/imgs/play-btn.png';
        pageObj.videoState.type = type;
      })

      if(type == 'normal' && playing == true){
        $window.ga('send', 'event', {
          'eventCategory': 'Video Normal',
          'eventAction': 'play'
        });
      }
    }

    var playersReady = false;

    pageObj.playerObj = {
      background: {},
      normal: {}
    }

    pageObj.videoObj = {
      background: {},
      normal: {}
    }

    pageObj.currentVideo = {
      type: null,
      pageId: null,
      get: function(){
        return {type: this.type, pageId: this.page};
      },
      set: function(type, pageId){
        this.type = type;
        this.pageId = pageId;
      }
    }

    var currentPageId = '';

    pageObj.currVideoSrc = null;
    pageObj.currNormalVideoSrc = null;
      
    pageObj.supVideoBg = true;

    pageObj.isVideo = true;

    var sliderOpts = {
      navigateByClick: "false",
      loop: "true",
      keyboardNavEnabled: "true",
      sliderDrag: "true",
      autoHeight: "true",
      arrowsNavAutoHide: "false"
    }

    var bindVideoEvents = function(type){
      pageObj.normalVideoState;

      $(vObject[type].el).off('play');
      $(vObject[type].el).off('pause');

      $(vObject[type].el).on('play', function (e) {
        
        if(type == 'background'){
          console.log('playing bg video');
          playingFunction(type, true);
          angular.element("#backgroundVideoContainer").fadeIn(200);
        }else{
          console.log('playing normal video');
          playingFunction(type, true);
          pageObj.normalVideoState = 'PLAYING';
        }
        
      });
      $(vObject[type].el).on('pause', function (e) {

        if(type == 'normal'){
          console.log('pause normal video');
          pageObj.normalVideoState = 'PAUSED';
        }

      });
    }

    var vObject = {
      background: {
        el: null,
        id: 'playerBg'
      },
      normal: {
        el: null,
        id: 'playerNormal'
      },
      reset: function(type){
        if(type){
          this[type].el = null;
        }else{
          this.background.el = null;
          this.normal.el = null;
        }
      }
    };

    pageObj.videoControl = {
      play: function(type){
        if(type == 'normal')
          pageObj.showNormalPlayer = true;

        vObject[type].el.play();
      },
      set: function(obj){
        console.log('Video set');
        vObject[obj.type].el = document.getElementById(vObject[obj.type].id);
        bindVideoEvents(obj.type);
        $timeout(function(){
          if(obj.type == 'normal'){
            pageObj.currVideoSrc = null;
            pageObj.currNormalVideoSrc = obj.file;
          }else{
            pageObj.currVideoSrc = obj.file;
            pageObj.currNormalVideoSrc = null;
          }
          $timeout(function(){
            vObject[obj.type].el.load();
          });
        });
      },
      close: function(type){
        if(type == 'normal'){
          vObject[type].el.pause();
          pageObj.showNormalPlayer = false;
          playingFunction(type, false);
        }
      },
      stop: function(type){
        vObject[type].el.stop();
        playingFunction(type, false);
        pageObj.displayPlayBtn = showPlayButton(type);
        // if(!isMobile()){
        //   $('#main-content').mCustomScrollbar("update");
        // }
      },
      pause: function(type){
        playingFunction(type, false);
        vObject[type].el.pause();
      },
      playPause: function(type){
        if(pageObj.normalVideoState == 'PLAYING'){
          this.pause(type);
        }else{
          this.play(type);
          // if(!isMobile()){
          //   $('#main-content').mCustomScrollbar("disable");
          // }
        }
      }
    }

    var resetVideoObj = function(){
      pageObj.videoObj.background = null,
      pageObj.videoObj.normal = null
    }

    var shuffle = function(array){
      var currentIndex = array.length, temporaryValue, randomIndex, tmpArray = array;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = tmpArray[currentIndex];
        tmpArray[currentIndex] = tmpArray[randomIndex];
        tmpArray[randomIndex] = temporaryValue;
      }

      return tmpArray;
    }

    var getNextItem = function(length1, length2, index){
      if(index < length1 && index < length2){
        return index;
      }else{
        return (length1 > length2) ? index % length2 : index % length1;
      }
    }

    var checkForCoincidence = function(arr, ind){
      var single_object = $filter('filter')(arr, function (d) {return d.index == ind;});
      return (single_object ? single_object[0] : null);
    }

    var checkForClickable = function(ind){

      pageObj.slide_link = false;

      if(!pageObj.page.links){
        return false
      }

      var link = checkForCoincidence(pageObj.page.links, (ind+1));

      if(!link){
        return false;
      };

      //$timeout(function(){
        pageObj.slide_link = link.url;
        $('.slider-element .slick-active').css('cursor', 'pointer');
      //})
    }

    var checkForLinks = function(ind){
      if(!pageObj.page.links){
        return false
      }

      var link = checkForCoincidence(pageObj.page.links, ind);

      if(!link){
        return false;
      };

      var win = window.open(link.url, '_blank');
      win.focus();
    }

    var checkForAds = function(ind){
      if(!pageObj.page.ads){
        return false
      }

      var ad = checkForCoincidence(pageObj.page.ads, ind);

      if(!ad){
        return false;
      };

    }

    pageObj.checkForEvents = function(ind){
      checkForLinks(ind+1);
      checkForAds(ind+1);
    }

    var getVideoType = function(ind, max){
      var type = 'normal';

      if(!pageObj.page || !pageObj.page.normal_videos){
        type = 'background';
      }

      var normal_video;
      if(pageObj.page.normal_videos){
        normal_video = checkForCoincidence(pageObj.page.normal_videos, ind);
      }
      
      if(!normal_video){
        type = 'background';
      }

      return type;
    }

    var checkForNormalVideo = function(normal_video){
      if(!pageObj.page.normal_videos || (pageObj.page.normal_videos && !pageObj.page.normal_videos.length))
        return false;

      if(normal_video){
        playingFunction('normal', false);
        pageObj.loading = false;
        pageObj.videoControl.set({type: 'normal', file: rackspace.videos_normal+normal_video.name});
        pageObj.displayPlayBtn = showPlayButton('normal');
      }

    }

    var preloadImgs = function(lst){

      console.log('PreloadImgs');

      var images = [],
        c=0,
        loadedCounter = 0;

      var loadTheRest = function(){
        for (var i = 3; i < lst.length; i++) {
          images[i] = new Image();
          images[i].src = lst[i];
        }
      }

      var imgReady = function(i){
        c+=1;
        if($('[src="'+lst[i]+'"]').width() > 200 || c == 50){
          loadedCounter+=1;
          loadTheRest();
          $rootScope.$broadcast('firstImgLoaded');
        }else{
          setTimeout(function() {
            imgReady(i);
          }, 500);
        }
      }

      for(var i = 0; i < 3; i++){
        images[i] = new Image();
        images[i].src = lst[i];
      }

      $(images[0]).load(function(){
        imgReady(0);
        checkForPlaceholderImages(0, lst[0]);
      })

      //console.log(images[0]);

    }

    // var preloadVideos = function(lst){

    //   var videos = [];
    //   for (var i = 0; i < lst.length; i++) {
    //     videos[i] = document.createElement("VIDEO");
    //     videos[i].src = lst[i].file;
    //   }

    //   console.log(videos);
    // }

    var checkForPlaceholderImages = function(ind, source, s2){
      $timeout(function(){
        if(pageObj.page.video){
          pageObj.page.currImage = source;
        }
        if(pageObj.page.normal_videos){
          var normal_video = checkForCoincidence(pageObj.page.normal_videos, ind);
          if(normal_video){
            pageObj.page.currImage = (isMobile()) ? rackspace.thumbs+pageObj.page.image : rackspace.images+pageObj.page.image;
          }
        }
      })

    };

    var checkForCustomSlider = function(){
      var baseUrl = (isMobile() ? rackspace.images_mobile : rackspace.thumbs);
      if(!pageObj.page.custom_slider)
        return false;

      pageObj.page.currImage = (!pageObj.page.image ? null : baseUrl+'/'+pageObj.page.image);  
      pageObj.custom_slider_index = 1;

      $timeout(function(){
        var sldr = $('.custom-slider').slick({
          adaptiveHeight: true
        });

        sldr.on('afterChange', function(event, slick, currentSlide, nextSlide){
          if(pageObj.custom_slider_index-1 != currentSlide){
            $timeout(function(){
              pageObj.custom_slider_index = currentSlide + 1;
            })
          }
        })

        pageObj.loading = false;
      }, 200)
    };

    var showOverlayAdd = function(){
      pageObj.ads.overlay.show();
    }

    pageObj.slidesCounter = 1;

    var checkForAd = function(currSld){

      if(pageObj.ads.overlay.value)
        return false;

      pageObj.slidesCounter += 1;

      if(pageObj.slidesCounter == 7){
        pageObj.ads.overlay.show('<p>Ads System</p>');
        pageObj.slidesCounter = 0;
      }
    }

    var currSldNumber = 0;

    var showPlayButton = function(type){
      return (type == 'normal') ? true : false;
    }

    var getFileNameAndExtension = function(string){
      var ind = string.lastIndexOf('.');
      if(ind == -1){
        return false;
      }
      var extension = string.slice(string.lastIndexOf('.'));
      var name = string.split(extension)[0];
      return {name: name, extension: extension};
    }

    var getSources = function(srcs, type, forceImg){
      var videoSrc = srcs,
        sources = [],
        max,
        imgType = isMobile() || forceImg,
        videosBgUrl = (isMobile()) ? rackspace.images_mobile : rackspace.videos;

      if(forceImg)
        videosBgUrl = (isMobile()) ? rackspace.images_mobile : rackspace.videos_placeholders;

      if(type == 'background'){
        if(typeof(videoSrc) != "string"){
          max = videoSrc.length;
          for(var i = 0; i < max; i++){
            var fileParts = getFileNameAndExtension(videoSrc[i]);
            sources[i] = videosBgUrl + fileParts.name + (imgType ? '.jpg' : '_5s_'+fileParts.extension);
          }
        }else{
          var fileParts = getFileNameAndExtension(videoSrc);
          sources[0] = videosBgUrl + fileParts.name + (imgType ? '.jpg' : fileParts.extension);
        }
      }else if(type == 'normal'){
        sources[0] = rackspace.videos_normal + videoSrc;
      }

      return sources;
    }


    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    // EVENTS

    var measuredTiles = false;

    var fixSliderArrows = function(){
      $('.slick-prev, .slick-next').css({
        'top': (($('.background-img').height() - 175 - 70) / 2) + 'px'
      });
    }

    var fixSliderMinHeight = function(dotsHeight){
      var dotsHeight = dotsHeight || 50;
      $('.slick-slider .slick-track, .slick-slider, .slick-list').css({
        'min-height': ($('.background-img').height() - $('header').outerHeight() - 120 - dotsHeight) + 'px'
      })
    }

    var fixDotsPosition = function(length){
      var rowsQuant = parseInt(length / 35),
        dotHeight = 22,
        totDotsHeight = 45 + (rowsQuant * dotHeight);
      $('.dots-wrapper').css({
        'bottom': '-' + totDotsHeight + 'px'
      })

      $('.slick-dots').css({
        'bottom': '0px'
      })

      $('.slick-slider').css({
        'margin-bottom': (20 + totDotsHeight) + 'px'
      })

      return totDotsHeight;
    }

    var fixTitleSize = function(){
      //console.log($(window).width(), $('.logo-box .page-title').width() + $('.logo > img').width() + 45 );
      pageObj.longTitle = ($(window).width() < $('.logo-box .page-title').width() + $('.logo > img').width() + 45);
    }

    /////////////////////
    ////* AUTOSLIDER *///
    /////////////////////
    var AutoSlider = {
      defaults: {
        breakPoint: 300
      },
      getRidOfHTML: function(txt){
        return txt.replace(/<([\/p]|[\/script])+>+/gm, '');
      },
      lessThanLimitCtrl: function(arr, i){
        var max = arr.length,
          obj = {},
          tmpArr = arr[i],
          j = 0;

        i++
        for(j = i; j < max; j++){
          if(arr[j] != ""){
            tmpArr += '<br><br>'+ arr[j];
          }
          if(tmpArr.length > this.defaults.breakPoint){
            break;
          }
        }
        return {text: tmpArr, index: j};
      },
      processText: function(txt, cls){
        var sliderEl, arr, max, 
          newArr = [];

        if(this.defaults.breakPoint && txt.length < this.defaults.breakPoint){
          return ['<p>'+txt+'</p>'];
        }

        arr = txt.split('<br><br>');
        max = arr.length;

        for(var i = 0; i < max; i++){
          if(arr[i] != ""){
            var link = checkForCoincidence(pageObj.page.links, i+1);
            var clickItem = (link && link.url) ? '<a class="click-to-view" ng-href="'+link.url+'" target="_blank">click to view</a>' : '';
            if(this.defaults.breakPoint && arr[i].length < this.defaults.breakPoint){
              var obj = AutoSlider.lessThanLimitCtrl(arr, i);
              newArr.push('<p>' + AutoSlider.getRidOfHTML(obj.text) + '</p>' + clickItem);
              i = obj.index;
            }else{
              newArr.push('<p>' + AutoSlider.getRidOfHTML(arr[i]) + '</p>' + clickItem);
            }
          }
        }

        return newArr;
      }
    }
    /////////////////////

    var currSlide = 0;
    
    var moveSliderDots = function(newSlide, cls){

      var orientation = (newSlide > currSlide) ? 'next' : 'prev',
        elemToSlide = $('.'+cls+' .slick-dots li:first'),
        currMargin = parseInt(elemToSlide.css('margin-left').replace('px', '')),
        newMargin = (orientation == 'next') ? (currMargin - 32) : (currMargin + 32);

      elemToSlide.animate({
        'margin-left': newMargin+'px'
      }, 200)

      currSlide = newSlide;
    }

    // pageObj.getSliderContent = function(item, ind){
    //   //checkForLinks(ind);

    //   $timeout(function(){
    //     var clickItem = '<a class="click-to-view '+(pageObj.slide_link ? "clickable" : "")+'" ng-href="'+pageObj.slide_link+'" target="_blank">click to view</a>';
    //     return item + clickItem;
    //   })
    // }

    pageObj.sliderGoTo = function(sld){
      if(sld == 'last'){
        sld = pageObj.sldrLength - 1;
      }else if(sld == 'first'){
        sld = 0;
      }else if(parseInt(sld).isNaN){
        return false;
      }
      $('.dots-slider').slick('slickGoTo', sld);
    }

    var createSlider = function(el){
      var cls = '.'+el;
      
      pageObj.sldrLength = $(cls+' li').length;

      var timer = (pageObj.page.autoSlideTimer) ? parseFloat(pageObj.page.autoSlideTimer) * 1000 : false;

      pageObj.dotsSliderLength = $(cls+' li').length;

      var sldr = $('.'+el).slick({
        //dots: true,
        adaptiveHeight: true,
        autoplay: (timer) ? true : false,
        autoplaySpeed: timer,
        speed: (pageObj.page.slider_animation_speed ? 700 : 500),
        fade: (pageObj.page.slider_fade ? true : false),
        cssEase: (pageObj.page.slider_ease ? 'linear' : "")
      });
      pageObj.dotsSldr = false;
      
      if(!isMobile()){
        $timeout(function(){
          $('#main-content').css({
            'max-height': $('.background-img').height() + 'px',
            'height': $('.background-img').height() + 'px',
            'overflow-y': 'auto'
          })
          //.mCustomScrollbar();

          fixSliderArrows();

          var dotsHeight = 0;


          fixSliderMinHeight(dotsHeight);

        }, 100);
      }


      pageObj.currentSlide = 1;
      sldr.on('beforeChange', function(event, slick, currentSlide, nextSlide){

        pageObj.displayPlayBtn = false;
        $timeout(function(){pageObj.displayClick = false;})

        checkForPlaceholderImages(nextSlide, pageObj.imgSources['background'][getNextItem(pageObj.imgSources['background'].length, pageObj.sldrLength, nextSlide)]);
      
        if(angular.element("#backgroundVideoContainer")[0].style.opacity == "")
          angular.element("#backgroundVideoContainer").fadeOut(500);

        $timeout(function(){pageObj.slide_link = false;})

      });

      sldr.on('afterChange', function(event, slick, currentSlide, nextSlide){
        if(pageObj.currentSlide-1 != currentSlide){
          checkForClickable(currentSlide);
          pageObj.currentSlide = currentSlide + 1;
          if(!isMobile()){
            var type = getVideoType(currentSlide, pageObj.sldrLength)
            if(type == 'background'){
              pageObj.videoControl.set({type: type, file: pageObj.currSources[getNextItem(pageObj.currSources.length, pageObj.sldrLength, currentSlide)]});
            }
          }
          
          var normal_video = null;

          if(pageObj.page.normal_videos && pageObj.page.normal_videos.length){
            normal_video = checkForCoincidence(pageObj.page.normal_videos, currentSlide);
            checkForNormalVideo(normal_video);
          }

          checkForAd();

          $timeout(function(){pageObj.displayClick = true;})
        }

      });

      sldr.slick('slickPause');

    }

    var checkForSliders = function(){
      if(pageObj.page.custom_slider){
        checkForCustomSlider();
      }else{
        createSlider('slider-element');
        checkForClickable(0);
      }

      pageObj.loading = false;
    }

    var preparePage = function(){
      var slider = null;
      playersReady = false;
      if(pageObj.page){
        if(pageObj.videoObj.background.src){
          playingFunction('background', false);
          pageObj.videoObj.background.src = '';
        }
        if(pageObj.playerObj.normal){
          playingFunction('normal', false);
          pageObj.videoObj.normal.src = '';
        }

        pageObj.isVideo = false;
        resetState();

        if(pageObj.page.main_text){

          if(pageObj.page.type === "presentation"){
            AutoSlider.defaults.breakPoint = null;
          }else{
            AutoSlider.defaults.breakPoint = 300;
          }

          //pageObj.page.main_text = AutoSlider.processText(pageObj.page.main_text, sliderClass);
          pageObj.page.contentArr = AutoSlider.processText(pageObj.page.main_text, 'slider-element');
          
          $timeout(function(){
            var type;
            pageObj.imgSources = {'background': null, 'normal': null};
            if(pageObj.page.video && !pageObj.page.custom_slider){
              type = 'background';
              if(typeof pageObj.page.video.src != "string" && pageObj.page.video.src.length > 1){
                if(pageObj.page.shuffle)
                  pageObj.page.video.src = shuffle(pageObj.page.video.src);
                
                pageObj.currSources = getSources(pageObj.page.video.src, 'background');
                //preloadVideos(pageObj.currSources);

              }
              pageObj.imgSources['background'] = getSources(pageObj.page.video.src, 'background', true);

              angular.element("#backgroundVideoContainer").fadeOut(0);
              preloadImgs(pageObj.imgSources['background']);
            }

            var normal_video = null;

            if(pageObj.page.normal_videos && pageObj.page.normal_videos.length){
              normal_video = checkForCoincidence(pageObj.page.normal_videos, 0);
              checkForNormalVideo(normal_video);
            }
            
            if(pageObj.page.video && !pageObj.page.custom_slider && !normal_video && !isMobile()){
              pageObj.videoControl.set({type: type, file: pageObj.currSources[0]});
            }

            checkForSliders();
            //checkForVideos(0, sldrLength);
            fixTitleSize();
          })
        }
        if(isMobile()){
          $('.menu-wrapper').css('width', $(window).width()+'px');
        }
      }else{
        alert('Page not existing. Redirecting to home');
        $location.path('/');
      }

      
    };

    angular.element($window).bind('orientationchange', function () {
      $('.menu-wrapper').css('width', $(window).width()+'px');
    });

    var adjustBrowsePageSizes = function(){
      $('.right-content').height($(window).height() - $('.content header').outerHeight());
      $('.right-content').css('top', $('.content header').outerHeight()+'px');
      $('.menu-wrapper').css('width', $(window).width()+'px');
    }

    setTimeout(function(){
      pageObj.ads.setupPlayer();
    })

    var changePage = function(data){
      //pageObj.loading = true;

      // Remove slick slider if any
      // if($('.slider-element').hasClass('slick-initialized')){
      //   $('.slider-element').slick('unslick');
      // }

      // if($('.dots-slider').hasClass('slick-initialized')){
      //   $('.dots-slider').slick('unslick');
      // }
      /////////////////////////////

      pageObj.page = getPage(pageObj.pageId, pageObj.pages);
      if(!pageObj.page ){
        alert('Page not existing. Redirecting to home');
        $location.path('/');
        return false;
      }
      if(vObject){
        vObject.reset();
      }
      pageObj.menu = defineMenu(pageObj.pages, pageObj.page.id);
      pageObj.landingPage = (pageObj.page.id == "landing") ? true : false;
      pageObj.loginPage = (pageObj.page.id == "login") ? true : false;
      $window.ga('send', 'pageview', { page: pageObj.page.title });
      if((!pageObj.landingPage) && (!pageObj.loginPage)){
        singlePageService.getPage(pageObj.pageId).success(function(data){
          pageObj.page = data;
          preparePage();
        })
        .error(function(){
          alert('Page not existing. Redirecting to home');
          $location.path('/');
        });
      }else{
        resetState();
        $timeout(function(){
          if(!isMobile()){
            var aditionalGap = (isMobile) ? 55 : 30;
            $('.right-content').height($(window).height() - 20);
            pageObj.selectedPage = pageObj.pages[0];
          }else{
            if(isMobile()){
              $timeout(function(){
                adjustBrowsePageSizes();
              }, 300)
            }else{
              adjustBrowsePageSizes();
            }
          }
          $('.landing-page-content .right-content').on('scroll', function() {
            if($(this).scrollTop() + $(this).innerHeight() + 300 >= this.scrollHeight) {
              console.log('load more...');
              $timeout(function(){
                pageObj.lazyPages.getMore();
              })
            }
          })
          pageObj.lazyPages.getMore(function(){
            if(!measuredTiles){
              if(isMobile()){
                $timeout(function(){
                  measureTiles();
                  measuredTiles = true;
                }, 1000)
              }else{
                measureTiles();
                measuredTiles = true;
              }
            }
          });
          pageObj.page.currImage = (pageObj.page.image ? rackspace.images+pageObj.page.image : null);
        }, 100);
      }
    }

    $scope.$on('firstImgLoaded', function(){
      $timeout(function(){
        pageObj.loading = false;
        if(pageObj.page.autoSlideTimer){
          $timeout(function(){
            $('.slider-element').slick('slickPlay');
          }, 1000)
        }
      })

    });

    var prevId,
      counterRender = 0,
      isReadyToRender,
      readyType = '',
      afterRender;

    afterRender = function(){
      if(pageObj.pageId != prevId){
        changePage();
        prevId = pageObj.pageId;
      }
    }  

    isReadyToRender = function(type, callback){
      if(!readyType || readyType && readyType != type){
        readyType = type;
        counterRender += 1;
      }
      if(counterRender > 2){
        return callback();
      }
    }

    $scope.$on('$routeChangeSuccess', function() {
      pageObj.pageId = $routeParams.page || 'home';

      if(pageObj.pages){
        if(pageObj.pageId != prevId){
          changePage();
          prevId = pageObj.pageId;
        }
      }else{
        isReadyToRender('route', afterRender);
      }
    });

    pagesService.success(function(data){
      pageObj.pages = data.data.pages;
      isReadyToRender('service', afterRender)
    });

    pageObj.showTags = false;

    tagsService.success(function(data){
      pageObj.tags = data.data.tags;
      isReadyToRender('tags', afterRender)
    });


    (function() {
      var hidden = "hidden";

      // Standards:
      if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
      else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
      else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
      else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
      // IE 9 and lower:
      else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
      // All others:
      else
        window.onpageshow = window.onpagehide
        = window.onfocus = window.onblur = onchange;

      function onchange (evt) {

        var windowVisibility = 'hidden';

        var v = "visible", h = "hidden",
            evtMap = {
              focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
            };

        evt = evt || window.event;
        if (evt.type in evtMap)
          windowVisibility = evtMap[evt.type];
        else
          windowVisibility = this[hidden] ? "hidden" : "visible";

        pageObj.ads.checkState(windowVisibility);
      }

      // set the initial state (but only if browser supports the Page Visibility API)
      // if( document[hidden] !== undefined )
      //   onchange({type: document[hidden] ? "blur" : "focus"});
    })();

  }])
  .directive('onFinishRender', function ($timeout, $rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          // $timeout(function () {
          //   console.log('finished render');
          // });
          $(window).ready(function(){
            scope.$emit('loaded');
          })
        }
      }
    };
  })
  .filter('selectedTags', function() {
    return function(items, tag) {
      var filtered = [];
      if(!tag){
        return items;
      };
      for (var i = 0; i < items.length; i++) {
        if(items[i].tag){
          var tgs = items[i].tag;
          if(typeof tgs != 'string'){
            if (tgs.indexOf(tag) != -1) {
              filtered.push(items[i]);
            }
          }else{
            if (tgs == tag) {
              filtered.push(items[i]);
            }
          }
        }
      }
      return filtered;
    };
  })
  .filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
      return $sce.trustAsResourceUrl(recordingUrl);
    };
  }]);

})();