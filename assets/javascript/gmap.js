// Google Maps function to create the map upon loading the page
function initMap() {
      var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: {
                  lat: 35.846,
                  lng: -78.836
            }
      });

      // Creating Google Map variables to be used in the geocoding function
      var geocoder = new google.maps.Geocoder();
      var infowindow = new google.maps.InfoWindow();

      // Function to grab inputs and run the All Stations API
      document.getElementById("submit").addEventListener("click", function () {
            // Preventing the page from reloading
            event.preventDefault();
            // Grabbing inputs to be stored as variables to be used in the URL
            var state = $("#state").val();
            var connectorType = $("#connector-type").val();
            var zip = $("#zip").val().trim();
            var chargingLevel = $("#charging-level").val();
            // Creating API URL using the user inputs
            var queryURL =
                  "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?zip=" +
                  zip +
                  ",ELEC&state=" +
                  state +
                  ",ev_connector_type=" +
                  connectorType +
                  ",ev_charging_level" +
                  chargingLevel +
                  ",status=E&limit=5&api_key=Kp6yrK20RheYpq1WjTLs2727PEW21APTLYCC2XHE&format=JSON";
            console.log(queryURL);
            // AJAX call to get the API
            $.ajax({
                  url: queryURL,
                  method: "GET"
            }).then(function (response) {
                  console.log(response);
                  // Storing the fuel stations array as a variable
                  var results = response.fuel_stations;
                  console.log(results);
                  // Emptying the display div
                  $("tbody").empty();

                  // Creating an empty array to hold latitude and longitude coordinates
                  var stationLatLong = [];

                  // For loop to store the individual station information as variables to be displayed
                  for (var i = 0; i < results.length; i++) {
                        // Creating a table row
                        var stationRow = $("<tr id='" + [i] + "'>");
                        // Storing information in variables
                        var stationName = results[i].station_name;
                        var stationAddress = results[i].street_address + " " + results[i].city + " " + results[i].state + " " + results[i].zip;
                        var stationHours = results[i].access_days_time;
                        var stationPhone = results[i].station_phone;
                        var stationLat = results[i].latitude;
                        var stationLong = results[i].longitude;

                        // Storing the latitude and longitude in the format needed for the geocode function
                        var rowLatLong = stationLat + "," + stationLong;

                        // Pushing the coordinates to the coordinates array
                        stationLatLong.push(rowLatLong);

                        // Calling the geocode function with the variables needed
                        geocodeLatLng(geocoder, map, infowindow, stationLatLong);

                        // Displaying the station information in a new table row
                        $(stationRow).append("<td>" + stationName + "</td><td>" + stationAddress + "</td><td>" + stationHours + "</td><td>" + stationPhone + "</td>");
                        // Displaying the row in the table
                        $("tbody").append(stationRow);
                  }
            });
      });
}

// Geocode function to create markers using the coordinates of the fuel stations
function geocodeLatLng(geocoder, map, infowindow, stationLatLong) {
      // Looping through the array of coordinates to create separate markers for each      
      for (var i = 0; i < stationLatLong.length; i++) {
            var latlngStr = stationLatLong[i].split(",", 2);
            var latlng = {
                  lat: parseFloat(latlngStr[0]),
                  lng: parseFloat(latlngStr[1])
            };
            // Using the coordinates to get the location
            geocoder.geocode({
                        location: latlng
                  },
                  function (results, status) {
                        if (status === "OK") {
                              // If there are results, then create marker
                              if (results[0]) {
                                    map.setZoom(11);
                                    var marker = new google.maps.Marker({
                                          position: results[0].geometry.location,
                                          map: map
                                    });

                                    // Creating a function to display the individual addresses upon clicking the marker
                                    marker.addListener('click', function() {
                                          infowindow.setContent(results[0].formatted_address);
                                          infowindow.open(map, marker);
                                    });
                                    
                              } else {
                                    window.alert("No results found");
                              }
                        } else {
                              window.alert("Geocoder failed due to: " + status);
                        }
                  }
            );
      }
}