document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        logoPath = doc.querySelector('#logo_svg'),
        logoSize = logo.getBoundingClientRect(),
        homepage = doc.querySelector('#page-1');

        //margins on each side of logo
    var horizontalMargin = win.innerWidth,
        horizontalPercent = 0;

    var verticalMargin = logoSize.top,
        verticalPercent = 0;


    win.addEventListener('resize', function() {
      //homepage logo
        logoSize = logo.getBoundingClientRect();
        horizontalMargin = logoSize.left;
    });

    homepage.addEventListener('mousemove', function(e) {
       horizontalPercent = Math.floor(e.clientX/(horizontalMargin* 0.5) * 100);
       verticalPercent = Math.floor(e.clientY/verticalMargin) * 100;
       logoPath.style.fill = "hsl(" + (horizontalPercent+250) + ",100%,52%)";
    }, false);


    doc.addEventListener('mousedown', function(e) {
    }, false);

    doc.addEventListener('mouseup', function(e) {
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
    console.log(e.touches[0].clientX);
      horizontalPercent = Math.floor(e.touches[0].clientX/(horizontalMargin*0.5) * 100);
      verticalPercent = Math.floor(e.clientY/verticalMargin) * 100;
      logoPath.style.fill = "hsl(" + (horizontalPercent+250) + ",100%,52%)";
    }

}, false);
