var stationLatLong = [];


function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: {
			lat: 35.846,
			lng: -78.836
		}
	});
	var geocoder = new google.maps.Geocoder;
	var infowindow = new google.maps.InfoWindow;

	document.getElementById('submit').addEventListener('click', function () {
		geocodeLatLng(geocoder, map, infowindow);
	});
}

function geocodeLatLng(geocoder, map, infowindow) {
	// var latLngCoord = ["35.846916,-78.836095","35.855398,-78.795502"];
	for (var i = 0; i < latLngCoord.length; i++) {
		var input = latLngCoord[i];
		var latlngStr = input.split(',', 2);
		var latlng = {
			lat: parseFloat(latlngStr[0]),
			lng: parseFloat(latlngStr[1])
		};
		geocoder.geocode({
			'location': latlng
		}, function (results, status) {
			if (status === 'OK') {
				if (results[0]) {
					map.setZoom(11);
					var marker = new google.maps.Marker({
						position: results[0].geometry.location,
						map: map
					});
					infowindow.setContent(results[0].formatted_address);
					infowindow.open(map, marker);
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	};
}












// function initialize() {

// 	// for (var i=0; i < stationLatLong.length; i++) {
// 	var mapOptions, map, marker, searchBox,
// 		infoWindow = '';
// 		addressEl = document.querySelector( '#map-search' ),
// 		latEl = document.querySelector( '.latitude' ),
// 		longEl = document.querySelector( '.longitude' ),
// 		element = document.getElementById( 'map-canvas' );

// 	var objectLat = parseInt([i].lat);
// 	console.log(objectLat);

// 	mapOptions = {
// 		// How far the maps zooms in.
// 		zoom: 8,
// 		// Current Lat and Long position of the pin/
// 		center: new google.maps.LatLng( -34.397, 150.644 ),

// 		disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
// 		scrollWheel: true, // If set to false disables the scrolling on the map.
// 		draggable: true, // If set to false , you cannot move the map around.
// 		// mapTypeId: google.maps.MapTypeId.HYBRID, // If set to HYBRID its between sat and ROADMAP, Can be set to SATELLITE as well.
// 		// maxZoom: 11, // Wont allow you to zoom more than this
// 		// minZoom: 9  // Wont allow you to go more up.

// 	};

// 	/**
// 	 * Creates the map using google function google.maps.Map() by passing the id of canvas and
// 	 * mapOptions object that we just created above as its parameters.
// 	 *
// 	 */
// 	// Create an object map with the constructor function Map()
// 	map = new google.maps.Map( element, mapOptions ); // Till this like of code it loads up the map.

// 	/**
// 	 * Creates the marker on the map
// 	 *
// 	 */
// 	marker = new google.maps.Marker({
// 		position: mapOptions.center,
// 		map: map,
// 		// icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
// 		draggable: true
// 	});

// 	/**
// 	 * Creates a search box
// 	 */
// 	console.log(addressEl)
// 	searchBox = new google.maps.places.SearchBox( addressEl );

// 	/**
// 	 * When the place is changed on search box, it takes the marker to the searched location.
// 	 */
// 	google.maps.event.addListener( searchBox, 'places_changed', function () {
// 		var places = searchBox.getPlaces(),
// 			bounds = new google.maps.LatLngBounds(),
// 			i, place, lat, long,
// 			addresss = places[0].formatted_address;

// 		for( i = 0; place = places[i]; i++ ) {
// 			bounds.extend( place.geometry.location );
// 			marker.setPosition( place.geometry.location );  // Set marker position new.
// 		}

// 		map.fitBounds( bounds );  // Fit to the bound
// 		map.setZoom( 15 ); // This function sets the zoom to 15, meaning zooms to level 15.
// 		// console.log( map.getZoom() );
// 		lat = marker.getPosition().lat();
// 		long = marker.getPosition().lng();
// 		latEl.value = lat;
// 		longEl.value = long;

// 		// Closes the previous info window if it already exists
// 		if ( infoWindow ) {
// 			infoWindow.close();
// 		}
// 		/**
// 		 * Creates the info Window at the top of the marker
// 		 */
// 		infoWindow = new google.maps.InfoWindow({
// 			content: addresss
// 		});

// 		infoWindow.open( map, marker );
// 	} );


// 		/**
// 	 * Finds the new position of the marker when the marker is dragged.
// 	 */
// 	google.maps.event.addListener( marker, "dragend", function ( event ) {
// 		var lat, long, address;

// 		console.log( 'i am dragged' );
// 		lat = marker.getPosition().lat();
// 		long = marker.getPosition().lng();

// 		var geocoder = new google.maps.Geocoder();
// 		geocoder.geocode( { latLng: marker.getPosition() }, function ( result, status ) {
// 			if ( 'OK' === status ) {  // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
// 				address = result[0].formatted_address;
// 				addressEl.value = address;
// 				latEl.value = lat;
// 				longEl.value = long;

// 			} else {
// 				console.log( 'Geocode was not successful for the following reason: ' + status );
// 			}

// 			// Closes the previous info window if it already exists
// 			if ( infoWindow ) {
// 				infoWindow.close();
// 			}

// 			/**
// 			 * Creates the info Window at the top of the marker
// 			 */
// 			infoWindow = new google.maps.InfoWindow({
// 				content: address
// 			});

// 			infoWindow.open( map, marker );
// 		} );
// 	});

// }
// // }