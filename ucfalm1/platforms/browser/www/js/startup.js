function trackAndCircle(){
	alert('Tracking location and Drawing shapes');
	zoomOnMap();
	trackLocation();
	addShapes();
}

function startup(){
	document.addEventListener('DOMContentLoaded',function(){
		trackAndCircle();
	},false);
}