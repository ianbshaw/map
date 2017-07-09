// These are the locations that will be shown to the user.
// Normally we'd have these in a database instead.
var locations = [
	{title: 'Stoneface Tavern', location: {lat: 35.176492, lng: -106.578093}},
	{title: 'Marble Brewery', location: {lat: 35.093066, lng: -106.646719}},
	{title: 'La Cumbre Brewing Co', location: {lat: 35.117511, lng: -106.614129}},
	{title: 'Tractor Brewing Co', location: {lat: 35.079849, lng: -106.602506}},
	{title: 'Fox & Hound', location: {lat: 35.141757, lng: -106.645010}}
	//{title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var map;

// Create a new blank array for all the listing markers.
var markers = [];

// This global polygon variable is to ensure only ONE polygon is rendered.
//var polygon = null;

// Create placemarkers array to use in multiple functions to have control
// over the number of places that show.
//var placeMarkers = [];

function initMap() {
	// Create a styles array to use with the map.
 	var styles = [
   		{
     	featureType: 'water',
     	stylers: [
       		{ color: '#19a0d8' }
     	]
   		},{
     	featureType: 'administrative',
     	elementType: 'labels.text.stroke',
     	stylers: [
       		{ color: '#ffffff' },
       		{ weight: 6 }
     	]
   		},{
     	featureType: 'administrative',
     	elementType: 'labels.text.fill',
     	stylers: [
       		{ color: '#e85113' }
     	]
   		},{
     	featureType: 'road.highway',
     	elementType: 'geometry.stroke',
     	stylers: [
       		{ color: '#efe9e4' },
	    	{ lightness: -40 }
     	]
   		},{
     	featureType: 'transit.station',
     	stylers: [
       		{ weight: 9 },
       		{ hue: '#e85113' }
     	]
   		},{
     	featureType: 'road.highway',
     	elementType: 'labels.icon',
     	stylers: [
       		{ visibility: 'off' }
     	]
   		},{
     	featureType: 'water',
     	elementType: 'labels.text.stroke',
     	stylers: [
       		{ lightness: 100 }
     	]
   		},{
     	featureType: 'water',
     	elementType: 'labels.text.fill',
     	stylers: [
       		{ lightness: -100 }
     	]
   		},{
     	featureType: 'poi',
     	elementType: 'geometry',
     	stylers: [
       		{ visibility: 'on' },
       		{ color: '#f0e4d3' }
     	]
   		},{
     	featureType: 'road.highway',
     	elementType: 'geometry.fill',
     	stylers: [
       		{ color: '#efe9e4' },
       		{ lightness: -25 }
     	]
   		}
 	];

 	// Constructor creates a new map - only center and zoom are required.
 	map = new google.maps.Map(document.getElementById('map'), {
   		center: {lat: 35.118089, lng: -106.598731}, 
   		zoom: 13,
   		styles: styles,
   		mapTypeControl: false
 	});

	var largeInfowindow = new google.maps.InfoWindow();

	// Style the markers a bit. This will be our listing marker icon.
 	var defaultIcon = makeMarkerIcon('0091ff');

 	// Create a "highlighted location" marker color for when the user
 	// mouses over the marker.
 	var highlightedIcon = makeMarkerIcon('FFFF24');

 	// The following group uses the location array to create an array of markers on initialize.
	for (var i = 0; i < locations.length; i++) {
		// Get the position from the location array.
		var loc = locations[i];
		var position = locations[i].location;
		var title = locations[i].title;
		// Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
     		position: position,
     		title: title,
     		animation: google.maps.Animation.DROP,
     		icon: defaultIcon,
     		id: i
   		});
		// Push the marker to our array of markers.
		markers.push(marker);		

		addListeners(marker, loc);
		
	}

	function addListeners(marker, loc) {
		// Create an onclick event to open the large infowindow at each marker.
		marker.addListener('click', function() {
	  		getVenue(loc, largeInfowindow, this);
		});

		// Two event listeners - one for mouseover, one for mouseout,
		// to change the colors back and forth.
		marker.addListener('mouseover', function() {
  			this.setIcon(highlightedIcon);
		});
		marker.addListener('mouseout', function() {
  			this.setIcon(defaultIcon);
		});
	}
	
	showListings();

}       

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow, venue) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infowindow.setContent('');
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });

    infowindow.setContent('<div>' + venue.name + '</div>');

    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
  }
}

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideMarkers(markers, selectedLocation) {
  for (var i = 0; i < markers.length; i++) {
  	if (markers[i].title != selectedLocation) {
    	markers[i].setMap(null);
	}	
  }
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

function getVenue(location, largeInfowindow, marker) {
	var venue;
  	var client_id = 'MLO2SWXCZ4MUZV1LEHPMY5O50HCGQU4IVD34XXLURUXTO5KD';
  	var client_secret = 'ULS1EZ3ZIQKKUBBFXIECLQYKGIMEFM3WN1NXPWZAQUSH3COQ';
  	var coords = location.location.lat + ',' + location.location.lng;
  	var url = 'https://api.foursquare.com/v2/venues/search?ll=' + coords + '&query=' + location.title + '&intent=checkin&client_id=' + client_id + '&client_secret=' + client_secret + '&v=20170701';
  	//alert(coords);
  	$.getJSON(url, function(data){

  		venue = data.response.venues[0];
  		populateInfoWindow(marker, largeInfowindow, venue);
  	}).error(function(e){
  		alert('Could not load venue');
  	});
}

var ViewModel = function() {
	this.locList = ko.observableArray();
  	for (var i = 0; i < locations.length; i++) {
    	this.locList.push(locations[i]);
  	}

  	this.currentLocation = ko.observable("");

  	this.locationClick = function (marker) {
  		var largeInfowindow = new google.maps.InfoWindow();
  		var venue = getVenue(marker);
  		//alert(markers[0].title);
  		for (var i = 0; i < markers.length; i++) {
			if (markers[i].title === marker.title) {
				getVenue(marker, largeInfowindow, markers[i]);
			}	
  		}
  	};

  	this.filter = function () {
    	var selectedLocation = document.getElementById('filter').value;
    	hideMarkers(markers, selectedLocation);	
  	};
};

//locations model
var Location = function(data) {
	this.location = ko.observable(data.location);
	this.title = ko.observable(data.title);
};

ko.applyBindings(new ViewModel());
