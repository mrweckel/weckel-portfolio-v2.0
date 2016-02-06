document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.querySelector('#stage'),
        logoPath = doc.querySelector('#logo_svg'),
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

    console.log(videos);

    var carousel = doc.querySelector('#zoetrope_carousel'),
        currentCarouselPosition = 0,
        degrees = 60,
        activeClass = 1;
    carousel.style.webkitTransform = "rotateY(0deg)";

        //margins on each side of logo
    var horizontalMargin = screenWidth,
        horizontalPercent = 0;

    var verticalMargin = logoSize.top,
        verticalPercent = 0;

    //Event Listeners
        win.addEventListener('resize', function() {
          //homepage logo
            logoSize = logo.getBoundingClientRect();
            horizontalMargin = logoSize.left;

         //reset
            screenHeight = win.innerHeight;
            screenWidth = win.innerWidth;
        });

        homepage.addEventListener('mousemove', function(e) {
          //Logo color
            horizontalPercent = Math.floor(e.clientX/(horizontalMargin* 0.5) * 100);
            verticalPercent = Math.floor(e.clientY/verticalMargin) * 100;
            logoPath.style.fill = "hsl(" + (horizontalPercent+250) + ",100%,52%)";

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

          //Carousel Arrow
            // if(e.target.id === "carousel_arrow-right"){
            //     carousel.style.webkitTransform = "rotateY(" + (currentCarouselPosition - 60) + "deg)";
            //     movePanelRight();
            // }
            // if(e.target.id === "carousel_arrow-left"){
            //     carousel.style.webkitTransform = "rotateY(" + (currentCarouselPosition + 60) + "deg)";
            //     movePanelLeft();
            // }

          //Carousel functionality
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
            console.log("last class = " + lastClass)
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
            homeIconPath = MorphSVGPlugin.convertToPath(document.querySelector("#building-2")),
            filmPath = "M91.5,161.9H32.2v-55.7h59.3V161.9z M95.8,112.3h77.7v29H95.8 V112.3z M127.5,153.4H95.8v-8h31.7V153.4z M178,111.7l9-5v38.7l-9-3.9V111.7z M32,54.6c0,0,19.2-28.7,41.2-10.5 s18.2,38.6,18.2,38.6H32V54.6z M32,87.2h59.5v14.7H32V87.2z M116.5,107.9h-15.8V97.4h15.8V107.9z M28,101.9l-15,2.5V85.2l15,2 V101.9z";

    //mobile
    homepage.addEventListener('touchstart',handleStart, false);
    stage.addEventListener('touchend', handleEnd, false);
    stage.addEventListener('touchmove', handleMove, false);

    function handleStart (e) {
    	// e.preventDefault();
        console.log(e);
    }

    function handleEnd (e) {
    	// e.preventDefault();
    }

    function handleMove (e) {
      horizontalPercent = Math.floor(e.touches[0].clientX/(horizontalMargin*0.5) * 100);
      verticalPercent = Math.floor(e.clientY/verticalMargin) * 100;
      logoPath.style.fill = "hsl(" + (horizontalPercent+250) + ",100%,52%)";
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


}, false);
