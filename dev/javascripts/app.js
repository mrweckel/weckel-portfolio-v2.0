document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.querySelector('#stage'),
        logo = doc.querySelector('#logo_container'),
        button = doc.querySelector('#button'),
        logoSize = logo.getBoundingClientRect(),
        xPos = 0,
        yPos = 0;

    //Sets the different class names for the transforms and caches a random value
    var classes = ['circle', 'up', 'right', 'left', 'down'],
        rand = classes[Math.floor(Math.random() * classes.length)];

    win.addEventListener('resize', function() {
        logoSize = logo.getBoundingClientRect();
        console.log(logo.getBoundingClientRect());
    });


    doc.addEventListener('mousemove', function(e) {
       addMorph(e.clientX, e.clientY);
    }, false);


    doc.addEventListener('mousedown', function(e) {
        console.log(e.srcElement.id);
        if (e.srcElement === button) {
            button.classList.add("button_down");
        } else {
            stage.className = 'flash_animation';
            setTimeout(function() {
                stage.className = '';
            }, 250);
        }
    }, false);

    doc.addEventListener('mouseup', function(e) {
        if (e.srcElement === button){
            button.classList.remove("button_down");
            stage.className = "page_active-2";
        }
    }, false);


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
    	console.log(e.touches[0].clientX, e.touches[0].clientY);
    	addMorph(e.touches[0].clientX, e.touches[0].clientY);
    }

    function addMorph (xPos, yPos) {
    	if (xPos <= logoSize.right &&
            xPos >= logoSize.left &&
            yPos >= logoSize.top &&
            yPos <= logoSize.bottom) {
    				xPos = 0;
            logo.className = 'morph-' + rand;
      } else {
          logo.className = 'ground_zero_delay';
          rand = classes[Math.floor(Math.random() * classes.length)];
      }
    }


}, false);