document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.querySelector('#stage'),
        logoSize = logo.getBoundingClientRect(),
        homepage = doc.querySelector('#page-1'),
        contactPage = doc.querySelector('#page-3'),
        bgGradient = doc.querySelector('#contact_background'),
        screenHeight = win.innerHeight,
        screenWidth = win.innerWidth,
        carouselSwipeStart = 0,
        originalScreenPosition = 0,
        mouseDown = 0,
        videos = doc.getElementsByClassName("zoetrope_video");

    //Event Listeners
    body.addEventListener('mouseup', function(e){
        console.log(e.target);
    });

    //Logo Variables
    var LOGO = doc.querySelector('#logo_svg'),
        HORIZONTAL_MARGIN = screenWidth;

    function changeLogoColor(ele,xPos){
        var horizontalPercent = Math.floor(xPos/(HORIZONTAL_MARGIN * 0.25) * 10);

        ele.style.fill = "hsl(" + (horizontalPercent + 10) + ",100%,52%)";
    }

    //Timelapse Variables
    var NUM_OF_FRAMES = 50,
        INCREMENTS = 100/NUM_OF_FRAMES,
        TIMELAPSE = doc.querySelector('#timelapse_inner'),
        TIMELAPSE_OVERLAY = doc.querySelector('#timelapse_overlay'),
        TIMELAPSE_CONTAINER = doc.querySelector('#timelapse_container');

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
    var MENUPATH = 'M200,40H0V0h200V40z M200,80H0v40h200V80z M200,160H0v40h200V160z',
        menuIcon = document.getElementById('menu_icon');

    //Carousel Variables
    var carousel = doc.querySelector('#zoetrope_carousel'),
        currentCarouselPosition = 0,
        degrees = 60,
        activeClass = 1;

    carousel.style.webkitTransform = "rotateY(0deg)";

    var verticalMargin = logoSize.top,
        verticalPercent = 0;

    //Event Listeners
        win.addEventListener('resize', function() {
          //homepage logo
            logoSize = logo.getBoundingClientRect();

         //reset
            screenHeight = win.innerHeight;
            screenWidth = win.innerWidth;

        if(screenWidth/screenHeight < 1.6){
            TIMELAPSE_CONTAINER.classList.add('background-switch');
        } else {
        TIMELAPSE_CONTAINER.classList.remove('background-switch');
        }

        console.log(screenWidth/screenHeight);
        });

        homepage.addEventListener('mousemove', function(e) {
          // Logo color
           changeLogoColor(LOGO, e.clientX);

            //Timelapse
            timelapseMove(TIMELAPSE, e.clientX);
            timelapseScale(TIMELAPSE_CONTAINER, e.clientX, 20);
            timelapseScale(TIMELAPSE_OVERLAY, e.clientX, 20);

        }, false);

        contactPage.addEventListener('mousemove', function(e) {
          //move font background gradient
            bgGradient.style.transform = 'translateX(' + e.clientX + 'px)';
        }, false);

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

        doc.addEventListener('mouseup', function(e) {
          //Navigation arrow functionality
            if(e.target.id === "nav_arrow-1"){
                console.log("hello");
                scrollToElement(250, win.innerHeight);
                stage.className = "page_active-2";
                playVideo(videos,1);
            }
            if(e.target.id === "nav_arrow-2"){
                console.log("hello");
                scrollToElement(250, win.innerHeight*2);
                stage.className = "page_active-3";
            }

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

function scrollToElement(scrollDuration, elementPos) {
    var scrollStep = elementPos / (scrollDuration / 15);

    var scrollInterval = setInterval(function(){
          if(window.scrollY < elementPos){
            window.scrollBy( 0, scrollStep );
          } else {
            clearInterval(scrollInterval);
          }
        },15);    }

//Page 3 functionality
// var emailCanvas = doc.querySelector('#contact_email_canvas'),
//     emailCanvasCtx = emailCanvas.getContext('2d');

// var path = new Path2D('M14.3,21.5h4.3l0.4,2.3h0.1c0.7-0.7,1.5-1.4,2.4-1.9c0.8-0.5,1.8-0.8,3-0.8c1.3,0,2.3,0.3,3.1,0.8c0.8,0.5,1.4,1.3,1.9,2.2c0.8-0.8,1.6-1.5,2.5-2.1c0.9-0.6,1.9-0.9,3.1-0.9c1.9,0,3.3,0.6,4.2,1.9c0.9,1.3,1.4,3,1.4,5.3v11.1h-5.3V28.9c0-1.3-0.2-2.2-0.5-2.7c-0.3-0.5-0.9-0.7-1.7-0.7c-0.9,0-1.9,0.6-3.1,1.7v12.1h-5.3V28.9c0-1.3-0.2-2.2-0.5-2.7c-0.3-0.5-0.9-0.7-1.7-0.7c-0.9,0-1.9,0.6-3,1.7v12.1h-5.3V21.5z');

// emailCanvasCtx.stroke(path);

}, false);
