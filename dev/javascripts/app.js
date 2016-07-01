/*jslint browser:true */
/*jslint node: true */
'use strict';

var Portfolio = {};


// SETTINGS
Portfolio.Settings = function() {

    this.doc = document;
    this.win = window;
    this.body = this.doc.body;
    this.screenHeight = this.win.innerHeight;
    this.screenWidth = this.win.innerWidth;
    this.originalScreenPosition = 0;
    this.mobileDevice = false;
};

Portfolio.Settings.prototype = {

    checkMobile: function() {

        var isMobile =
            {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };
        return isMobile.any();
    }
};

//TIMELAPSE OBJECT
Portfolio.Timelapse = function(doc) {

    this.bgImgElements = ['timelapse_reel-1','timelapse_reel-2'];
    this.numOfFrames = 50;
    this.increments = 100/this.numOfFrames;
    this.bgThreshold = 1.6;
    this.ele = doc.querySelector('#timelapse_inner');
    this.overlay = doc.querySelector('#timelapse_overlay');
    this.container = doc.querySelector('#timelapse_container');
};

Portfolio.Timelapse.prototype = {

    setBackgroundProps: function(screenWidth,screenHeight) {

        if(screenWidth/screenHeight < this.bgThreshold){
            this.container.classList.add('background-switch');
        } else {
            this.container.classList.remove('background-switch');
        }
    }
};

//MENU OBJECT
Portfolio.Menu = function() {

    this.closeButton  = document.getElementById('close_button_path').getAttribute('d');
    this.icon     = document.getElementById('menu_icon_path');
    this.iconPath = this.icon.getAttribute('d');
};

//VIEW
Portfolio.View = function(doc) {

    this.stage = doc.querySelector('#stage');
    this.homepage = doc.querySelector('#page-1');
    this.logo = doc.getElementById('logo_svg');
    this.hotspotContainer =  doc.getElementById('scrub_hotspot_container');
    this.hotspot = doc.getElementById('scrub_hotspot');

};

//CONTROLLER
Portfolio.Controller = function() {

};

Portfolio.Controller.prototype = {

    getBgUrl: function(el) {

        var bg = window.getComputedStyle(el,null).backgroundImage;
        return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    },

    checkImagesLoaded: function(arr, cb) {

        var lastElement = arr.length - 1,
            timePassed = false,
            imgsLoaded = false;

        var that = this;

        //In case images load very quickly, wait a bit before ending opening animation
        setTimeout(
            function() {
                timePassed = true;
                if (imgsLoaded === true) {
                    return cb;
                }
            }, 6000);

        arr.forEach(function(bgImg, index) {

            var image = document.createElement('img');
            image.src = that.getBgUrl(document.getElementById(bgImg));
            image.onload = function() {
                if (index === lastElement) {
                    imgsLoaded = true;
                    if (timePassed === true) {
                        return cb;
                    }
                }
            };
        });
    },

    killLoadAnimation: function(el) {

        el.classList.remove('container_loading_active');
        el.classList.remove('start_loading_animation');
        setTimeout(function(){
            el.classList.add('title_animate');
        }, 1000);
    },

    handleMouseUp: function(e) {

        this.onMouseUp({target: e.target, id: e.target.id});
    },

    handleResize: function(cb) {
        return cb();
    },

    //Auto scroll functionality
    //Maybe switch to requestAnimationFrame
    scrollToElement: function(scrollDuration, elementPos) {

        var scrollStep = elementPos / (scrollDuration / 15);

        var scrollInterval = setInterval(function() {
              if(window.scrollY < elementPos){
                window.scrollBy( 0, scrollStep );
              } else {
                clearInterval(scrollInterval);
              }
            },15);
    },

    handleMouseMove: function(e) {

        this.horizontalMove({x: e.clientX});
    },

    changeLogoColor: function(ele,xPos,horizontalMargin) {

        var horizontalPercent = Math.floor(xPos/(horizontalMargin * 0.25) * 10);
        ele.style.fill = "hsl(" + (horizontalPercent + 10) + ",100%,52%)";
    },

    timelapseMove: function(ele, xPos, screenWidth, frames, increments) {

        var percent = Math.floor(xPos/screenWidth*frames);
        ele.style.webkitTransform = "translate3d(" + - Math.max(Math.min((percent * increments),98),0) + "%,0,200px)";
    },

    timelapseScale: function(ele, xPos, screenWidth, factor) {

        var percent = (xPos/screenWidth)/factor;
        ele.style.webkitTransform = "scale(" + (1 + percent) + ") translateZ(250px)";
    },

    handleMove: function(e) {
        self.touchMove({x: e.touches[0].clientX, y: e.touches[0].clientY});
    },

    handleStart: function(e) {

    },

    handleEnd: function(e) {

        self.touchEnd({event: e});
    },

    scrubHotspotMove: function(el, parent, xPos, yPos, screenWidth) {

        parent.className = 'inactive';

        var startingX = screenWidth/2;

        if(xPos < startingX){
          el.style.transform = 'translate3d(' + -(startingX - xPos) + 'px,0px, 0)';
        } else {
          el.style.transform = 'translate3d(' + (xPos - startingX) + 'px,0px, 0)';
        }
    },

    returnHotspot: function(parentEl) {

        parentEl.className = 'active';
    }
};



document.addEventListener('DOMContentLoaded', initPortfolio, false);

function initPortfolio() {

    //Create objects
    var Settings   = new Portfolio.Settings();
    var Timelapse  = new Portfolio.Timelapse(Settings.doc);
    var Menu       = new Portfolio.Menu();
    var View       = new Portfolio.View(Settings.doc);
    var Controller = new Portfolio.Controller();


     //Add Loading Animation
    View.stage.classList.add('start_loading_animation');

    //Loading Checks
    Controller.checkImagesLoaded(Timelapse.bgImgElements,Controller.killLoadAnimation(View.stage));

    //Set Background based on current screen ratio
    Timelapse.setBackgroundProps(Settings.screenWidth, Settings.screenHeight);

    //Overall Event Listeners
    Settings.body.addEventListener('mouseup', Controller.handleMouseUp.bind(Controller), false);
    Settings.win.addEventListener('resize', Timelapse.setBackgroundProps(Settings.screenWidth, Settings.screenHeight), false);
    View.homepage.addEventListener('mousemove', Controller.handleMouseMove.bind(Controller), false);

    //Click handling
    Controller.onMouseUp = function(args){

        console.log(args);

        switch (args.id) {

            case 'menu_icon_container':
                View.stage.classList.add('menu_active');
                View.stage.classList.remove('title_animate');
                TweenMax.to(Menu.icon,1, {morphSVG: {shape: Menu.closeButton, shapeIndex:5}});
                break;

            case 'close_button_container':
                View.stage.classList.remove('menu_active');
                View.stage.classList.add('title_animate');
                TweenMax.to(Menu.icon,1, {morphSVG: {shape: Menu.iconPath, shapeIndex:5}});
                break;

            case 'home_icon':
                buildingBackground.style.opacity = "0";
                TweenMax.to(homeIconPath,1, {morphSVG: {shape: filmPath, shapeIndex:1}});
                break;

            default:
                break;
        }
    };

    //Mousemove Handling
    Controller.horizontalMove = function(args) {

        Controller.changeLogoColor(View.logo, args.x, Settings.screenWidth);

        Controller.timelapseMove(Timelapse.ele, args.x, Settings.screenWidth, Timelapse.numOfFrames, Timelapse.increments);

        Controller.timelapseScale(Timelapse.container, args.x, Settings.screenWidth, 20);
    };


    //Mobile
    Settings.mobileDevice = Settings.checkMobile() ?  true : false;

    if(Settings.mobileDevice){

        View.stage.classList.add('mobile_device');

        View.homepage.addEventListener('touchstart', Controller.handleStart, false);
        View.homepage.addEventListener('touchend'  , Controller.handleEnd  , false);
        View.homepage.addEventListener('touchmove' , Controller.handleMove , false);
    }

    Controller.touchMove = function(args) {

        var horMove = args.x;
        var vertMove = args.y;

        Controller.changeLogoColor(View.logo, args.x, Settings.screenWidth);

        Controller.timelapseMove(Timelapse.ele, args.x, Settings.screenWidth, Timelapse.numOfFrames, Timelapse.increments);

        Controller.timelapseScale(Timelapse.container, args.x, Settings.screenWidth, 20);

        Controller.scrubHotspotMove(View.hotspot, View.hotspotContainer, horMove, vertMove, Settings.screenWidth);
    };

    Controller.touchEnd = function(args) {
        Controller.returnHotspot((View.hotspotContainer));
    };
}
