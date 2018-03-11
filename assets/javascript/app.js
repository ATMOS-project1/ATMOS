//------------------//
// All Stations API //
//------------------//
// Function to grab inputs and get the API information
$("#submit").on("click", function(event) {
  //Preventing the page from reloading after the button is clicked
  event.preventDefault();
  // Grabbing inputs to be stored as variables to be used in the URL
  var state = $("#state").val();
  var connectorType = $("#connector-type").val();
  var zip = $("#zip").val().trim();
  var chargingLevel = $("#charging-level").val();
  // Creating URL using the inputs to search for fuel stations in the API
  var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?zip=" + zip + ",ELEC&state=" + state + ",ev_connector_type=" + connectorType + ",ev_charging_level" + chargingLevel + ",status=E&limit=5&api_key=Kp6yrK20RheYpq1WjTLs2727PEW21APTLYCC2XHE&format=JSON";
  console.log(queryURL);
  // AJAX call to get the API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // Storing the fuel stations array as a variable
    var results = response.fuel_stations;
    console.log(results);
    // Emptying the display div
    $("tbody").empty();
    // For loop to store the individual station information as variables to be displayed
    for (var i = 0; i < results.length; i++) {
      // Creating a table row
      var stationRow = $("<tr id='" + [i] + "'>")
      // Storing information in variables
      var stationName = results[i].station_name;
      var stationAddress = results[i].street_address + " " + results[i].city + " " + results[i].state + " " + results[i].zip;
      var stationHours = results[i].access_days_time;
      var stationPhone = results[i].station_phone;
      // Storing latitude and longitude to be used with Google Maps API
      var stationLat = results[i].latitude;
      var stationLong = results[i].longitude;
      // Setting data attributes to lat and long
      stationRow.attr("data-latitude", stationLat);
      stationRow.attr("data-longitude", stationLong);
      // Displaying the station information in a new table row
      $(stationRow).append("<td>" + stationName + "</td><td>" + stationAddress + "</td><td>" +
      stationHours + "</td><td>" + stationPhone + "</td>");
      // Displaying the row in the table
      $("tbody").append(stationRow);
    };
    
    });
  // initialize();
    
  });