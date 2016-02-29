document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.querySelector('#stage'),
        homepage = doc.querySelector('#page-1'),
        screenHeight = win.innerHeight,
        screenWidth = win.innerWidth,
        carouselSwipeStart = 0,
        originalScreenPosition = 0,
        mouseDown = 0,
        videos = doc.getElementsByClassName("zoetrope_video");

    // Loading Checks
    function getBgUrl(el) {
        var bg = win.getComputedStyle(el,null).backgroundImage;
        return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    }

    function checkImagesLoaded(arr){
        arr.forEach(function(bgImg){
            console.log('hello');
            var image = document.createElement('img');
                image.src = getBgUrl(document.getElementById(bgImg));
                console.log(image);
                image.onload = function () {
                    console.log('Loaded');
                }
        });
    }

    var bgImgElements = ['timelapse_reel-1','timelapse_reel-2']

    checkImagesLoaded(bgImgElements);

    //Initial Title Animation
    setTimeout(function(){
        stage.classList.add('title_animate')
    }, 2000);

    //Timelapse Variables
    var NUM_OF_FRAMES = 50,
        INCREMENTS = 100/NUM_OF_FRAMES,
        TIMELAPSE = doc.querySelector('#timelapse_inner'),
        TIMELAPSE_OVERLAY = doc.querySelector('#timelapse_overlay'),
        TIMELAPSE_CONTAINER = doc.querySelector('#timelapse_container');

    //Set Background based on current screen ratio
    setBackgroundProps();

    //Menu variables
    var MENUPATH = 'M200,40H0V0h200V40z M200,80H0v40h200V80z M200,160H0v40h200V160z',
        menuIcon = document.getElementById('menu_icon');

    //Overall Event Listeners
    body.addEventListener('mouseup', handleMouseUp, false);
    win.addEventListener('resize', handleResize, false);

    function handleMouseUp(e){

        switch (e.target.id) {
            case 'menu_icon':
                stage.classList.add('menu_active');
                TweenMax.to(MENUPATH,1, {morphSVG: {shape: filmPath, shapeIndex:1}});
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

            if(e.clientX - carouselSwipeStart < -100 && e.clientX < carouselSwipeStart){
                movePanelLeft();
                carousel.style.webkitTransform = "rotateY(" + currentCarouselPosition + "deg)";
                console.log("Minus = " + (carouselSwipeStart - e.clientX));
            } else {
                carousel.style.webkitTransform = "rotateY(" + currentCarouselPosition + "deg)";
            }

            if(carouselSwipeStart + e.clientX > 100 && e.clientX > carouselSwipeStart){
                movePanelRight();
                carousel.style.webkitTransform = "rotateY(" + currentCarouselPosition + "deg)";
                console.log("Plus = " + currentCarouselPosition + e.clientX);
            } else {
                carousel.style.webkitTransform = "rotateY(" + currentCarouselPosition + "deg)";
            }

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
        timelapseScale(TIMELAPSE_OVERLAY, e.clientX, 20);
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

        ele.style.webkitTransform = "translate3d(" + - Math.max(Math.min((percent* INCREMENTS),98),0) + "%,0,0)";
    }

    function timelapseScale(ele, xPos, factor){
        var percent = (xPos/screenWidth)/factor;
        ele.style.webkitTransform = "scale(" + (1 + percent) + ")";
    }

    //Menu






    //Carousel Variables
    var carousel = doc.querySelector('#zoetrope_carousel'),
        currentCarouselPosition = 0,
        degrees = 60,
        activeClass = 1;

    carousel.style.webkitTransform = "rotateY(0deg)";

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


        carousel.addEventListener('mousemove', function(e) {
          //Swiping Carousel Desktop
            if(mouseDown === 1 && e.clientX < carouselSwipeStart){
                carousel.style.webkitTransform = "rotateY(" + (currentCarouselPosition - e.clientX/10) + "deg)";
            }
            if(mouseDown === 1 && e.clientX > carouselSwipeStart){
                carousel.style.webkitTransform = "rotateY(" + (currentCarouselPosition + e.clientX/10) + "deg)";
            }
        }, false);

        doc.addEventListener('mousedown', function(e) {
            mouseDown = 1;
            carouselSwipeStart = e.clientX;
        }, false);



        doc.addEventListener('mouseout', function(e) {
            mouseDown = 0;
        }, false);

    //custom functions

        function movePanelRight(){
            currentCarouselPosition += 60;
            var lastClass = activeClass;
            activeClass > 1 ? activeClass -= 1 : activeClass = 6;
            updateClass(carousel, activeClass);
            playVideo(videos, activeClass);
            console.log("last class = " + lastClass);
            stopVideo(videos, lastClass);
        }

        function movePanelLeft(){
            currentCarouselPosition -= 60;
            var lastClass = activeClass;
            activeClass < 6 ? activeClass += 1 : activeClass = 1;
            updateClass(carousel, activeClass);
            playVideo(videos, activeClass);
            stopVideo(videos, lastClass);
        }

        function updateClass(ele,activeNum){
            ele.className = "active-" + activeNum;
        }

        function playVideo(videoArr, num){
            videoArr[num-1].play();
        }

        function stopVideo(videoArr, num){
            videoArr[num-1].pause();
        }


    //SVG icons
        var buildingBackground = document.querySelector("#building-1"),
            // homeIconPath = MorphSVGPlugin.convertToPath(document.querySelector("#building-2")),
            filmPath = "M91.5,161.9H32.2v-55.7h59.3V161.9z M95.8,112.3h77.7v29H95.8 V112.3z M127.5,153.4H95.8v-8h31.7V153.4z M178,111.7l9-5v38.7l-9-3.9V111.7z M32,54.6c0,0,19.2-28.7,41.2-10.5 s18.2,38.6,18.2,38.6H32V54.6z M32,87.2h59.5v14.7H32V87.2z M116.5,107.9h-15.8V97.4h15.8V107.9z M28,101.9l-15,2.5V85.2l15,2 V101.9z";

    //mobile
    homepage.addEventListener('touchstart',handleStart, false);
    homepage.addEventListener('touchend', handleEnd, false);
    homepage.addEventListener('touchmove', handleMove, false);

    function handleStart (e) {
    	// e.preventDefault();
    }

    function handleEnd (e) {
    	// e.preventDefault();
    }

    function handleMove (e) {

        changeLogoColor(LOGO,e.touches[0].clientX);

        timelapseMove(TIMELAPSE, e.touches[0].clientX);
        timelapseScale(TIMELAPSE_CONTAINER, e.touches[0].clientX, 20);
        timelapseScale(TIMELAPSE_OVERLAY, e.touches[0].clientX, 20);
    }


}, false);
