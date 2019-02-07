var client;
var earthquakelayer;

function addPointLinePoly(){
		// adding in a point, triangle and circle

		// add point
		L.marker([51.5,-0.09]).addTo(mymap).bindPopup("<b>Hello World!</b><br/>I am a popup.").openPopup();

		// add a circle
		L.circle([51.508,-0.11],500,{
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(mymap).bindPopup("I am a circle.")
		
		// add a polygon with 3 end points (triangle)
		var myPolygon=L.polygon([
			[51.509,-0.08],
			[51.503,-0.06],
			[51.51,-0.047]
			],{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5
			}).addTo(mymap).bindPopup("I am a triangle.")
}

function getEarthquakes(){
	client = new XMLHttpRequest();
	client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
	client.onreadystatechange = earthquakeResponse;
	client.send();
}

function earthquakeResponse(){
			if (client.readyState == 4){
				var earthquakedata=client.responseText;
				loadEarthquakelayer(earthquakedata);
			}
		}

function loadEarthquakelayer(earthquakedata){
	var earthquakejson = JSON.parse(earthquakedata);
	earthquakelayer = L.geoJson(earthquakejson,
		{
			pointToLayer: function (feature, latlng)
			{
			if (feature.properties.mag > 1.75){return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>" + feature.properties.place + "</b>");
				}
			else {
				return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>" + feature.properties.place + "</b>");;
			}
			},
		}).addTo(mymap);

	mymap.fitBounds(earthquakelayer.getBounds());
}