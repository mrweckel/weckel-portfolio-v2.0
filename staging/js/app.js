document.addEventListener('DOMContentLoaded', function(){

 'use strict';

	var doc   = document,
	    win   = window,
	    body  = document.body,
	    stage = doc.getElementById('stage'),
	    logo = doc.getElementById('logo_container'),
	    logoSize = logo.getBoundingClientRect(),
	    xPos = 0,
	    yPos = 0;

	 var classes = ['circle', 'up','right','left','down'],
	     rand = classes[Math.floor(Math.random() * classes.length)];



	win.addEventListener('resize', function(){
		logoSize = logo.getBoundingClientRect();
		console.log(logo.getBoundingClientRect());
	});

	doc.addEventListener('mousemove', function(e){
	  xPos = e.clientX;
	  yPos = e.clientY;

	  if(xPos <= logoSize.right && xPos >= logoSize.left && yPos >= logoSize.top && yPos <= logoSize.bottom){
	  	logo.className = 'morph-' + rand;
	  } else {
	  	logo.className = '';
	  	rand = classes[Math.floor(Math.random() * classes.length)];
	  }

	}, false);
	doc.addEventListener('mousedown',function(e){
		console.log(e);
		if(e.srcElement != logo){
			stage.className = 'flash_animation';
			setTimeout(function(){stage.className = ''},250);
		}
	},false);

	// doc.addEventListener('mouseup',function(e){
	// 	console.log(e);
	// 	if(e.srcElement != logo){

	// 	}
	// },false);

}, false);