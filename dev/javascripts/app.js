document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.querySelector('#stage'),
        logoPath = doc.querySelector('#logo_svg'),
        button = doc.querySelector('#button'),
        logoSize = logo.getBoundingClientRect(),
        xPos = 0,
        yPos = 0

        //margins on each side of logo
    var horizontalMargin = win.innerWidth,
        horizontalPercent = 0;

    var verticalMargin = logoSize.top,
        verticalPercent = 0;


    win.addEventListener('resize', function() {
        logoSize = logo.getBoundingClientRect();
        horizontalMargin = logoSize.left;
        var diff = horizontalMargin - 323;

    });

    doc.addEventListener('mousemove', function(e) {
       horizontalPercent = Math.floor(e.clientX/(horizontalMargin*.5) * 100);
       verticalPercent = Math.floor(e.clientY/verticalMargin) * 100;

       console.log(e.clientX, e.clientY);
       console.log(verticalMargin);
       console.log(horizontalPercent);
       logoPath.style.fill = "hsl(" + (horizontalPercent+250) + ",100%,52%)";
    }, false);


    doc.addEventListener('mousedown', function(e) {

      console.log("hello");
    }, false);

    doc.addEventListener('mouseup', function(e) {
        if (e.srcElement === button){
            button.classList.remove("button_down");
            stage.className = "page_active-2";
        }
    }, false);

    //mobile
    stage.addEventListener('touchstart',handleStart, false);
    stage.addEventListener('touchend', handleEnd, false);
    stage.addEventListener('touchmove', handleMove, false);

    function handleStart (e) {
    	e.preventDefault();
    }

    function handleEnd (e) {
    	e.preventDefault();
    	console.log(e);
        logo.className = 'ground_zero';
    }

    function handleMove (e) {
    	addMorph(e.touches[0].clientX, e.touches[0].clientY);
    }

}, false);
