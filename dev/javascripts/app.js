document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.querySelector('#stage'),
        logoPath = doc.querySelector('#logo_svg'),
        logoSize = logo.getBoundingClientRect(),
        homepage = doc.querySelector('#page-1'),
        screenHeight = win.innerHeight,
        screenWidth = win.innerWidth,
        originalScreenPosition = 0,
        mouseDown = 0;

    var carousel = doc.querySelector('#zoetrope_carousel'),
        currentCarouselPosition = 0,
        degrees = 60,
        sections = 0;

        //margins on each side of logo
    var horizontalMargin = screenWidth,
        horizontalPercent = 0;

    var verticalMargin = logoSize.top,
        verticalPercent = 0;

  //SVG icons
    var buildingBackground = document.querySelector("#building-1"),
        homeIconPath = MorphSVGPlugin.convertToPath(document.querySelector("#building-2")),
        filmPath = "M91.5,161.9H32.2v-55.7h59.3V161.9z M95.8,112.3h77.7v29H95.8 V112.3z M127.5,153.4H95.8v-8h31.7V153.4z M178,111.7l9-5v38.7l-9-3.9V111.7z M32,54.6c0,0,19.2-28.7,41.2-10.5 s18.2,38.6,18.2,38.6H32V54.6z M32,87.2h59.5v14.7H32V87.2z M116.5,107.9h-15.8V97.4h15.8V107.9z M28,101.9l-15,2.5V85.2l15,2 V101.9z";

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

    carousel.addEventListener('mousemove', function(e) {
      //Swiping Carousel Desktop
        if(mouseDown === 1){
            console.log(e.clientX);
            carousel.style.webkitTransform = "rotateY(" + e.clientX + "deg)";
        }

    }, false);

    doc.addEventListener('mousedown', function(e) {
        mouseDown = 1;
        sections = screenWidth/degrees;
        console.log(sections);
    }, false);

    doc.addEventListener('mouseup', function(e) {
      //Navigation arrow functionality
        if(e.target.classList[0] === "arrow"){
            console.log("hello");
            scrollToElement(250, win.innerHeight);
            stage.className = "page_active-2";
        }

      //Menu Icon Functionality
        if(e.target.id === "home_icon"){
            buildingBackground.style.opacity = "0";
            TweenMax.to(homeIconPath,1, {morphSVG: {shape: filmPath, shapeIndex:1}});
        }

      //Carousel Arrow
        if(e.target.id === "carousel_arrow-right"){
            carousel.style.webkitTransform = "rotateY(" + (currentCarouselPosition - 60) + "deg)";
            currentCarouselPosition -= 60;
        }
        if(e.target.id === "carousel_arrow-left"){
            carousel.style.webkitTransform = "rotateY(" + (currentCarouselPosition + 60) + "deg)";
            currentCarouselPosition += 60;
        }

      //Do not delete
        mouseDown = 0;

    }, false);

    carousel.addEventListener('ondrag', function(e) {
        console.log(e);
    }, false);


    //mobile
    homepage.addEventListener('touchstart',handleStart, false);
    stage.addEventListener('touchend', handleEnd, false);
    stage.addEventListener('touchmove', handleMove, false);

    function handleStart (e) {
    	e.preventDefault();
        console.log(e);
    }

    function handleEnd (e) {
    	e.preventDefault();
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
