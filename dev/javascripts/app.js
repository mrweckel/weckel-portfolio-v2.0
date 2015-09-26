document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var doc = document,
        win = window,
        body = document.body,
        stage = doc.getElementById('stage'),
        logo = doc.getElementById('logo_container'),
        logoSize = logo.getBoundingClientRect(),
        xPos = 0,
        yPos = 0;

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
        console.log(e);
        if (e.srcElement != logo) {
            stage.className = 'flash_animation';
            setTimeout(function() {
                stage.className = '';
            }, 250);
        }
    }, false);


    stage.addEventListener('touchstart',handleStart, false);
    stage.addEventListener('touchend', handleEnd, false);
    stage.addEventListener('touchmove', handleMove, false);
    // stage.addEventListener('touchcancel', handleCancel, false);
    // stage.addEventListener('touchleave', handleEnd, false);

    function handleStart (e) {
    	e.preventDefault();
    }

    function handleEnd (e) {
    	e.preventDefault();
    	console.log(e);
    	logo.className = '';
    }

    function handleMove (e) {
    	console.log(e.touches[0].clientX, e.touches[0].clientY);
    	addMorph(e.touches[0].clientX, e.touches[0].clientY);
    }

    function addMorph (xPos, yPos) {
    	if (xPos <= logoSize.right && xPos >= logoSize.left && yPos >= logoSize.top && yPos <= logoSize.bottom) {
    				xPos = 0;
            logo.className = 'morph-' + rand;
      } else {
          logo.className = '';
          rand = classes[Math.floor(Math.random() * classes.length)];
      }
    }


}, false);