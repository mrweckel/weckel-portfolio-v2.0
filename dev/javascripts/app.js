document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        logoPath = doc.querySelector('#logo_svg'),
        logoSize = logo.getBoundingClientRect(),
        homepage = doc.querySelector('#page-1'),
        screenHeight = win.innerHeight;

        //margins on each side of logo
    var horizontalMargin = win.innerWidth,
        horizontalPercent = 0;

    var verticalMargin = logoSize.top,
        verticalPercent = 0;

    win.addEventListener('resize', function() {
      //homepage logo
        logoSize = logo.getBoundingClientRect();
        horizontalMargin = logoSize.left;

        screenHeight = win.innerHeight;
        console.log(screenHeight);
    });

    homepage.addEventListener('mousemove', function(e) {
       horizontalPercent = Math.floor(e.clientX/(horizontalMargin* 0.5) * 100);
       verticalPercent = Math.floor(e.clientY/verticalMargin) * 100;
       logoPath.style.fill = "hsl(" + (horizontalPercent+250) + ",100%,52%)";
    }, false);

    doc.addEventListener('mousedown', function(e) {

    }, false);

    doc.addEventListener('mouseup', function(e) {
        console.log(e.target);
        if(e.target.id === "nav_arrow"){
            console.log("hello");
            scrollToElement(250, win.innerHeight);
        }

        if(e.target.id === "home_icon"){
            console.log("hello");
          // TweenMax.to('#home_icon',1, {morphSVG:"M5.1,4.6l188.5,188.5 M5.1,193.2L193.7,4.6"});
        }
    }, false);


    //mobile
    homepage.addEventListener('touchstart',handleStart, false);
    stage.addEventListener('touchend', handleEnd, false);
    stage.addEventListener('touchmove', handleMove, false);

    function handleStart (e) {
    	e.preventDefault();
    }

    function handleEnd (e) {
    	e.preventDefault();
    }

    function handleMove (e) {
      horizontalPercent = Math.floor(e.touches[0].clientX/(horizontalMargin*0.5) * 100);
      verticalPercent = Math.floor(e.clientY/verticalMargin) * 100;
      logoPath.style.fill = "hsl(" + (horizontalPercent+250) + ",100%,52%)";
    }

  //Element scroll Functionality
  function scrollToElement(scrollDuration, elementPos) {
    var scrollStep = elementPos / (scrollDuration / 15);

    var scrollInterval = setInterval(function(){
          if(window.scrollY < elementPos){
            window.scrollBy( 0, scrollStep )
          } else {
            clearInterval(scrollInterval)
          }
        },15);    }


}, false);
