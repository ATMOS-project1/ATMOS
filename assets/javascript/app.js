//------------------//
// All Stations API //
//------------------//


// $("#").on("click", function(event) {
//   event.preventDefault();

  // Grabbing inputs to be stored as variables to be used in the URL
  var fuelType = "all";
  var state = "NC"
  var connectorType = "all"
  var zip = "27612"
  var chargingLevel = "all";

  var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?zip=" + zip + ",ELEC&state=" + state + ",fuel_type=" + fuelType + ",ev_connector_type=" + connectorType + ",ev_charging_level" + chargingLevel + ",status=E&limit=5&api_key=Kp6yrK20RheYpq1WjTLs2727PEW21APTLYCC2XHE&format=JSON";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

    var results = response.fuel_stations;
    console.log(results);

    for (var i = 0; i < results.length; i++) {
      var stationName = results[i].station_name;
      console.log(stationName);
      var stationAddress = results[i].street_address + " " + results[i].city + " " + results[i].state + " " + results[i].zip;
      console.log(stationAddress);
      var stationHours = results[i].access_days_time;
      console.log(stationHours);
      var stationPhone = results[i].station_phone;
      console.log(stationPhone);
      var cardsAccepted = results[i].cards_accepted;
      console.log(cardsAccepted);
      var stationStatus = results[i].status_code;
      console.log(stationStatus);
      //Need to look over how best to store charging level
      var chargingLevel = "";
      var stationAccess = results[i].groups_with_access_code;
      console.log(stationAccess);
      var connectorTypes = results[i].ev_connector_types;
      console.log(connectorTypes);
      var fuelType = results[i].fuel_type_code;
      console.log(fuelType);
      var fillType = results[i].ng_fill_type_code;
      console.log(fillType);
    };
  });
// });