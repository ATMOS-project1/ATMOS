var fuelType = "all";
var state = "NC";
var connectorType = "all";
var zip = "27560"
var chargingLevel = ""

var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?zip=" + zip + ",ELEC&state=" + state + ",fuel_type=" + fuelType + ",ev_connector_type=" + connectorType + ",status=E&limit=5&api_key=Kp6yrK20RheYpq1WjTLs2727PEW21APTLYCC2XHE&format=JSON";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  console.log(response);

  var results = response.data

  for (var i = 0; i < results[i]; i++) {
    var stationName = "";
    var address = "";
    var hours = "";
    var phone = "";
    var cards = "";
    var status = "";
    var chargingLevel = "";
    var access = "";
    var connector = "";
    var fuel = "";
    var fill = "";
  };
});