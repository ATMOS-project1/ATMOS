
//*************************************************************
//**********************Contact Us Form************************
//*************************************************************

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

	//Button for adding Contact info
	$("#customer").on("click", function(event) {
		event.preventDefault();


		//Grabs user input
		var custFirstName = $("#first_name").val().trim();
		var custLastName = $("#last_name").val().trim();
		var custMessage = $("#message").val().trim();

		//creates local 'temporary' object for holding customer data
		var newCust = {
			firstName: custFirstName,
			lastName: custLastName,
			message: custMessage
		}

		
		//upload customer data to the database
		database.ref().push(newCust);

		//logs everything to console log
		console.log(newCust.firstName);
		console.log(newCust.lastName);
		console.log(newCust.message);

		//clears all of the text values from form
		$("#first_name").val("");
		$("#last_name").val("");
		$("#message").val("");

	});

	//Create Firebase event for adding customer to the database
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());

		//Store everything into a variable
		var custFirstName = childSnapshot.val().firstName;
		var custLastName = childSnapshot.val().lastName;
		var custMessage = childSnapshot.val().message;

		//customer info
		console.log(custFirstName);
		console.log(custLastName);
		console.log(custMessage);

	});
});