function initMap() {
      var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: {
                  lat: 35.846,
                  lng: -78.836
            }
      });
      var geocoder = new google.maps.Geocoder();
      var infowindow = new google.maps.InfoWindow();

      document.getElementById("submit").addEventListener("click", function () {
            // Preventing the page from reloading
            event.preventDefault();
            // Grabbing inputs to be stored as variables to be used in the URL
            var state = $("#state").val();
            var connectorType = $("#connector-type").val();
            var zip = $("#zip").val().trim();
            var chargingLevel = $("#charging-level").val();
            // Creating URL using the inputs to search for fuel stations in the API
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
                        // Storing latitude and longitude in variables to be pushed to an array of coordinates to be used with Google Maps API
                        var stationLat = results[i].latitude;
                        console.log(stationLat);
                        var stationLong = results[i].longitude;
                        console.log(stationLong);

                        var rowLatLong = stationLat + "," + stationLong;

                        stationLatLong.push(rowLatLong);

                        geocodeLatLng(geocoder, map, infowindow, stationLatLong);

                        // Displaying the station information in a new table row
                        $(stationRow).append("<td>" + stationName + "</td><td>" + stationAddress + "</td><td>" + stationHours + "</td><td>" + stationPhone + "</td>");
                        // Displaying the row in the table
                        $("tbody").append(stationRow);
                  }
            });
      });
}

function geocodeLatLng(geocoder, map, infowindow, stationLatLong) {
      for (var i = 0; i < stationLatLong.length; i++) {
            var input = stationLatLong[i];
            var latlngStr = input.split(",", 2);
            var latlng = {
                  lat: parseFloat(latlngStr[0]),
                  lng: parseFloat(latlngStr[1])
            };
            geocoder.geocode({
                        location: latlng
                  },
                  function (results, status) {
                        if (status === "OK") {
                              if (results[0]) {
                                    map.setZoom(11);
                                    var marker = new google.maps.Marker({
                                          position: results[0].geometry.location,
                                          map: map
                                    });
                                    infowindow.setContent(results[0].formatted_address);
                                    infowindow.open(map, marker);
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