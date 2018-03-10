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
$("#").on("click", function(event) {
  //Preventing the page from reloading after the button is clicked
  event.preventDefault();

  // Grabbing inputs to be stored as variables to be used in the URL
  var state = $("#state").val();
  var connectorType = $("#connector-type").val();
  var zip = $("#zip").val();
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

    // For loop to store the individual station information as variables and displaying them
    for (var i = 0; i < results.length; i++) {
      // Emptying the div holding any prior station information
      $("#").empty();

      // Creating new div for each fuel station
      var stationDiv = $("<div>");
      
      // Storing information in variables
      var stationName = results[i].station_name;
      var stationAddress = results[i].street_address + " " + results[i].city + " " + results[i].state + " " + results[i].zip;
      var stationHours = results[i].access_days_time;
      var stationPhone = results[i].station_phone;
      var cardsAccepted = results[i].cards_accepted;
      var stationStatus = results[i].status_code;
      //Need to look over how best to store charging level
      var chargingLevel = "";
      var stationAccess = results[i].groups_with_access_code;
      var connectorTypes = results[i].ev_connector_types;
      var fuelType = results[i].fuel_type_code;
      var fillType = results[i].ng_fill_type_code;

      // Creating an element to have the rating displayed
      var ratingP = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      gifDiv.append(ratingP);

      // Creating an image for the gifs
      var sportImage = $("<img class='gif'>")
            
      // Giving image attribute to store still gif
      sportImage.attr("data-still", results[i].images.original_still.url);

      // Storing the original gif            
      var originalGIF = results[i].images.original.url;
      console.log(originalGIF);

      // Giving the image an attribute for the original gif
      sportImage.attr("data-animate", originalGIF);
      // console.log(sportImage.attr("date-animate"));

      // Giving the image an attribute for data-state to be used later
      sportImage.attr("data-state", "still");

      // Displaying the gifs
      gifDiv.append(sportImage);

      // Putting the gifs at the top of the div
	    $("#").append(stationDiv);
    };
  });
});