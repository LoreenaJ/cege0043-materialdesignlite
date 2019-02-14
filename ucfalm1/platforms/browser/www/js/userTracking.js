var userMarker;

function zoomOnMap(){
	alert('Zooming onto your position');
	navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position){
	mymap.setView([position.coords.latitude, position.coords.longitude], 15);
		}

function trackLocation(){
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
	}
	else{
		document.getElementById('showLocation').innerHTML = 'Geolocation is not supported by this browser.';
	}
}

function showPosition(position){
	if (userMarker){
		mymap.removeLayer(userMarker);
	}
	userMarker = L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap).bindPopup("<b>You are here</b>");
	document.getElementById('showLocation').innerHTML = 'Latitude:' + position.coords.latitude + '<br>Longitude:' + position.coords.longitude;
	getDistance();
}

function getDistance(){
	alert('getting distance');
	navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}

function getDistanceFromPoint(position){
	var lat = 52.2153181;
	var lng = 0.1417129;
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat, lng, 'K');
	if (distance <= 0.1){
		alert("Within proximity (100m)");
	}
}

function calculateDistance(lat1, lon1, lat2, lon2, unit){
			var radlat1 = Math.PI*lat1/180;
			var radlat2 = Math.PI*lat2/180;
			var radlon1 = Math.PI*lon1/180;
			var radlon2 = Math.PI*lon2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI*theta/180;
			var subAngle = Math.sin(radlat1)*Math.sin(radlat2) + Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);
			subAngle = Math.acos(subAngle);
			subAngle = subAngle*180/Math.PI;
			dist = (subAngle/360)*2*Math.PI*3956;

			if (unit == 'K'){dist = dist*1.609344;}
			if (unit == 'N'){dist = dist*0.8684;}
			return dist	
		}