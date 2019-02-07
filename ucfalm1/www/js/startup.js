function trackAndCircle(){
	alert('Tracking location and Drawing shapes');
	trackLocation();
	addShapes();
}

function startup(){
	document.addEventListener('DOMContentLoaded',function(){
		trackAndCircle();
	},false);
}