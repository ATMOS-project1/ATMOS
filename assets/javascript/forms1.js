//*****************************************************
//******************app form***************************
//*****************************************************

$(document).ready(function() {

	var config = {
		apiKey: "AIzaSyCS_LJiMZGK0YtgqxqKgj4eGPD2obBOMpI",
		authDomain: "atmos-bcd7a.firebaseapp.com",
	    databaseURL: "https://atmos-bcd7a.firebaseio.com",
	    projectId: "atmos-bcd7a",
		storageBucket: "atmos-bcd7a.appspot.com",
		messagingSenderId: "671205675180"
	 };

	firebase.initializeApp(config);

	var database = firebase.database();

	//button for adding charger location request
	$("#submit").on("click", function(event) {
		event.preventDefault();

		//collects user input
		var custState = $("#state").val().trim();
		var custZip = $("#zip").val().trim();
		var custLevel = $("#charging-level").val().trim();
		var custType = $("#connector-type").val().trim();

		//creates local 'temporary' object for holding customer data
		var newAddr = {
			state: custState,
			zip: custZip,
			level: custLevel,
			type: custType
		}

		//upload address data to the database
		database.ref().push(newAddr);

		//logs address info to console
		console.log(newAddr.state);
		console.log(newAddr.zip);
		console.log(newAddr.level);
		console.log(newAddr.type);

		//clears all of the text values from Address form
		$("#state").val("");
		$("#zip").val("");
		$("#charging-level").val("");
		$("#connector-type").val("");

	});

	//create firebase event for adding address to the database
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());

		//store everything into a variable
		var custState = childSnapshot.val().state;
		var custZip = childSnapshot.val().zip;
		var custLevel = childSnapshot.val().level;
		var custType = childSnapshot.val().type;

		//address info
		console.log(custState);
		console.log(custZip);
		console.log(custLevel);
		console.log(custType);
	});

});