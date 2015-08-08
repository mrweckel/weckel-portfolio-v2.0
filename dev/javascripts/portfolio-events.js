Portfolio.Events = function(){

}

Portfolio.Events.prototype = {
	mouseMove: function(){
		document.addEventListener('mousemove', function(e){
	 		console.log("xpos = " + e.clientX);
	 		console.log("ypos = " + e.clientY);
	 	}, false);
	}
}