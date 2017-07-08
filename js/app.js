var ViewModel = function() {

		this.locations = ko.observable(new Location(
			[
	          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
	          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
	          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
	          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
	          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
	          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        	])
        )

//         // Create a new blank array for all the listing markers.
//   		var markers = [];

//         // The following group uses the location array to create an array of markers on initialize.
// 		for (var i = 0; i < this.locations.length; i++) {
// 		  // Get the position from the location array.
// 		  var position = this.locations[i].location;
// 		  var title = this.locations[i].title;
// 		  // Create a marker per location, and put into markers array.
// 		  var marker = new google.maps.Marker({
// 		    position: position,
// 		    title: title,
// 		    animation: google.maps.Animation.DROP,
// 		    icon: defaultIcon,
// 		    id: i
// 		  });
// 		  // Push the marker to our array of markers.
// 		  markers.push(marker);
}

//locations model
var Location = function(data) {
	this.locations = ko.observableArray(data);
}

ko.applyBindings(new ViewModel());
