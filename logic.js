// 1. Initialize Firebase
// 2. Button for adding trains, updates the database, clear the html 
// 3. Retrieve train data from database
// 4. Calculate additional variable 

// 0. Initialize Firebase
var config = {
  apiKey: "AIzaSyCOikaS5kwq9L7Io7JQvvSGFYFmRLI8FkY",
  authDomain: "test-2699c.firebaseapp.com",
  databaseURL: "https://test-2699c.firebaseio.com",
  projectId: "test-2699c",
  storageBucket: "test-2699c.appspot.com",
  messagingSenderId: "699200855429"
};

firebase.initializeApp(config);
var database = firebase.database();


// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainname = $("#trainname").val().trim();
  var destination = $("#destination").val().trim();
  var firsttime = $("#first-time").val().trim();
  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainname: trainname,
    destination: destination,
    firsttime: firsttime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainname);
  console.log(newTrain.destination);
  console.log(newTrain.firsttime);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#trainname").val("");
  $("#destination").val("");
  $("#first-time").val("");
  $("#frequency").val("");
});

// 3. Retrieve train data from database 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  //console logs the child that was added 
  console.log(childSnapshot.val());

  //store everything into a variable 
  var trainname = childSnapshot.val().trainname;
  var destination = childSnapshot.val().destination;
  var firsttime = childSnapshot.val().firsttime;
  var frequency = childSnapshot.val().frequency;

  // Console log train info pulled from database 
  console.log(trainname);
  console.log(destination);
  console.log(firsttime);
  console.log(frequency);

  // 4. Calculate additional variables

  //stores current time into a variable  
  var rightnow = moment(); 

  //calculate how much time has passed since the first train 
  var timepassed = moment(firsttime, "HHmm").diff(rightnow, "minutes");

  //calculate how much time until next train
  var minsaway = timepassed - ((Math.floor(timepassed/frequency))*frequency);

  //calcluate arrive time of next train
  var nextarrival = moment(rightnow, "HHmm").add(minsaway).minutes(); 

  // Add each train's data into the table
  $('tbody').append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextarrival + "</td><td>" + minsaway + "</td></tr>");
});

