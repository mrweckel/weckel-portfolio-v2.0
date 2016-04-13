document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.querySelector('#stage'),
        homepage = doc.querySelector('#page-1'),
        screenHeight = win.innerHeight,
        screenWidth = win.innerWidth,
        originalScreenPosition = 0,
        mouseDown = 0,
        mobileDevice = false;

    //Loading Animation
        stage.classList.add('start_loading_animation');

    //Loading Checks
        function getBgUrl(el) {
            var bg = win.getComputedStyle(el,null).backgroundImage;
            return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
        }

        function checkImagesLoaded(arr,cb){

            var lastElement = arr.length - 1,
                timePassed = false,
                imgsLoaded = false;

            setTimeout(
                function(){
                    timePassed = true;
                    if(imgsLoaded === true){
                        return cb();
                    }
            }, 6000);

            arr.forEach(function(bgImg,index){
                var image = document.createElement('img');
                    image.src = getBgUrl(document.getElementById(bgImg));
                    image.onload = function () {
                        if(index === lastElement){
                            imgsLoaded = true;
                            console.log(imgsLoaded);
                            if(timePassed === true){
                                return cb();
                            }
                        }
                    };
            });
        }

        var bgImgElements = ['timelapse_reel-1','timelapse_reel-2'];

        checkImagesLoaded(bgImgElements,removeLoadingContainer);


    //Initial Title Animation
        function removeLoadingContainer(){
            stage.classList.remove('container_loading_active');
                stage.classList.remove('start_loading_animation');
                setTimeout(function(){
                    stage.classList.add('title_animate');
                }, 1000);
        }

    //Timelapse Variables
    var NUM_OF_FRAMES = 50,
        INCREMENTS = 100/NUM_OF_FRAMES,
        TIMELAPSE = doc.querySelector('#timelapse_inner'),
        TIMELAPSE_OVERLAY = doc.querySelector('#timelapse_overlay'),
        TIMELAPSE_CONTAINER = doc.querySelector('#timelapse_container');

    //Set Background based on current screen ratio
    setBackgroundProps();

    //Menu variables
    var closeButton = document.getElementById('close_button_path').getAttribute('d'),
        menuIcon = document.getElementById('menu_icon_path'),
        menuIconPath = menuIcon.getAttribute('d');

    //Overall Event Listeners
    body.addEventListener('mouseup', handleMouseUp, false);
    win.addEventListener('resize', handleResize, false);

    function handleMouseUp(e){

        console.log("You tapped " + e.target.id);

        switch (e.target.id) {

            case 'menu_icon_container':
                stage.classList.add('menu_active');
                stage.classList.remove('title_animate');
                TweenMax.to(menuIcon,1, {morphSVG: {shape: closeButton, shapeIndex:5}});
                break;

            case 'close_button_container':
                stage.classList.remove('menu_active');
                stage.classList.add('title_animate');
                TweenMax.to(menuIcon,1, {morphSVG: {shape: menuIconPath, shapeIndex:5}});
                break;

            //arrow functionality:
            case 'nav_arrow-1':
                scrollToElement(250, win.innerHeight);
                stage.className = "page_active-2";
                playVideo(videos,1);
                break;

            case 'nav_arrow-2':
                scrollToElement(250, win.innerHeight*2);
                stage.className = "page_active-3";
                break;

            default:
                break;
        }
    }

    doc.addEventListener('mouseup', function(e) {

          //Menu Icon Functionality
            if(e.target.id === "home_icon"){
                buildingBackground.style.opacity = "0";
                TweenMax.to(homeIconPath,1, {morphSVG: {shape: filmPath, shapeIndex:1}});
            }
            mouseDown = 0;

        }, false);

    function handleResize(e){
        setBackgroundProps();
    }

    //Auto scroll functionality
    function scrollToElement(scrollDuration, elementPos) {
        var scrollStep = elementPos / (scrollDuration / 15);

        var scrollInterval = setInterval(function(){
              if(window.scrollY < elementPos){
                window.scrollBy( 0, scrollStep );
              } else {
                clearInterval(scrollInterval);
              }
            },15);
    }

    //Homepage Event Listeners
    homepage.addEventListener('mousemove', handleMouseMove, false);

    function handleMouseMove(e){
        // Logo color
        changeLogoColor(LOGO, e.clientX);

        //Timelapse
        timelapseMove(TIMELAPSE, e.clientX);
        timelapseScale(TIMELAPSE_CONTAINER, e.clientX, 20);
    }


    //Logo Variables
    var LOGO = doc.querySelector('#logo_svg'),
        HORIZONTAL_MARGIN = screenWidth;

    function changeLogoColor(ele,xPos){
        var horizontalPercent = Math.floor(xPos/(HORIZONTAL_MARGIN * 0.25) * 10);

        ele.style.fill = "hsl(" + (horizontalPercent + 10) + ",100%,52%)";
    }



    //Title Variables
    var TITLE = doc.querySelector('#title'),
        SUBTITLE = doc.querySelector('#subtitle');

    function timelapseMove(ele,xPos) {
        var percent = Math.floor(xPos/screenWidth*NUM_OF_FRAMES);

        ele.style.webkitTransform = "translate3d(" + - Math.max(Math.min((percent* INCREMENTS),98),0) + "%,0,200px)";
    }

    function timelapseScale(ele, xPos, factor){
        var percent = (xPos/screenWidth)/factor;
        ele.style.webkitTransform = "scale(" + (1 + percent) + ") translateZ(250px)";
    }

    function setBackgroundProps () {
        screenHeight = win.innerHeight;
        screenWidth  = win.innerWidth;

        if(screenWidth/screenHeight < 1.6){
            TIMELAPSE_CONTAINER.classList.add('background-switch');
        } else {
        TIMELAPSE_CONTAINER.classList.remove('background-switch');
        }
    }
    //Event Listeners

        doc.addEventListener('mouseout', function(e) {
            mouseDown = 0;
        }, false);


    //SVG icons
        var buildingBackground = document.querySelector("#building-1"),
            // homeIconPath = MorphSVGPlugin.convertToPath(document.querySelector("#building-2")),
            filmPath = "M91.5,161.9H32.2v-55.7h59.3V161.9z M95.8,112.3h77.7v29H95.8 V112.3z M127.5,153.4H95.8v-8h31.7V153.4z M178,111.7l9-5v38.7l-9-3.9V111.7z M32,54.6c0,0,19.2-28.7,41.2-10.5 s18.2,38.6,18.2,38.6H32V54.6z M32,87.2h59.5v14.7H32V87.2z M116.5,107.9h-15.8V97.4h15.8V107.9z M28,101.9l-15,2.5V85.2l15,2 V101.9z";

    //mobile

    //mobile specific variables
    var hotspot = doc.getElementById('scrub_hotspot');

    console.log(hotspot);

    //Check for mobile
    var isMobile = {
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

    mobileDevice = isMobile.any() ?  stage.classList.add('mobile_device') : false;

    homepage.addEventListener('touchstart',handleStart, false);
    homepage.addEventListener('touchend', handleEnd, false);
    homepage.addEventListener('touchmove', handleMove, false);

    function handleStart (e) {
    	// e.preventDefault();
    }

    function handleEnd (e) {
    	// e.preventDefault();

        returnHotspot(hotspot);
    }

    function handleMove (e) {

        var horizontalMove = e.touches[0].clientX;

        changeLogoColor(LOGO,horizontalMove);

        timelapseMove(TIMELAPSE, horizontalMove);
        timelapseScale(TIMELAPSE_CONTAINER, horizontalMove, 20);

        scrubHotspotMove(hotspot, horizontalMove);

    }

    function scrubHotspotMove(el, xPos){

        el.className = 'inactive';

        var perc = xPos/screenWidth*100;

        console.log(perc, perc/2);

        el.style.transform = 'translate3d(' + xPos + 'px, -50%, 0)';
        // if(xPos/screenWidth*100 > 50){
        //     el.style.transform = 'translateX(' + (perc/2) + '%)';
        // } else {
        //     el.style.transform = 'translateX(' + (0 - xPos/2) + '%)';
        // }


    }

    function returnHotspot(el){
        el.className = 'active';
    }


}, false);
