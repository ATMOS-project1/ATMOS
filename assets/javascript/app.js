// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCS_LJiMZGK0YtgqxqKgj4eGPD2obBOMpI",
//     authDomain: "atmos-bcd7a.firebaseapp.com",
//     databaseURL: "https://atmos-bcd7a.firebaseio.com",
//     projectId: "atmos-bcd7a",
//     storageBucket: "atmos-bcd7a.appspot.com",
//     messagingSenderId: "671205675180"
//   };
//   firebase.initializeApp(config);

//  // Create a variable to reference the database.
// 	var database = firebase.database();

// // Create a variable for current time.
//   var currentTime = moment();
 
// $(document).ready(function(){
//     $('.parallax').parallax();
//   });


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

    // For loop to store the individual station information as variables to be displayed
    for (var i = 0; i < results.length; i++) {
      // Emptying the display div
      $("tbody").empty();

      // Creating a table row
      var stationRow = $("<tr id='" + [i] + "'>")

      // Storing information in variables
      var stationName = results[i].station_name;
      var stationAddress = results[i].street_address + " " + results[i].city + " " + results[i].state + " " + results[i].zip;
      var stationHours = results[i].access_days_time;
      var stationPhone = results[i].station_phone;

      // Setting a data attribute to store the address to be used in other API
      stationRow.attr("data-address", stationAddress);

      // Displaying the station information in a new table row
      $(stationRow).append("<td>" + stationName + "</td><td>" + stationAddress + "</td><td>" +
      stationHours + "</td><td>" + stationPhone + "</td>");
    };
  });

  // $("#state").val("");
  // $("#connector-type").val("");
  // $("#zip").val("");
  // $("#charging-level").val("");
});