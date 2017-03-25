// Initialize Firebase
var config = {
  apiKey: "AIzaSyAPncUb_MbjwBA6oykAUrrCxsH2QjU4S_A",
  authDomain: "trainschedule-1c93f.firebaseapp.com",
  databaseURL: "https://trainschedule-1c93f.firebaseio.com",
  storageBucket: "trainschedule-1c93f.appspot.com",
  messagingSenderId: "470465350915"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding train information
$("#submit").on("click", function(event){

  event.preventDefault();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";

// Grabs user input
  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrainTime = moment($("#trainTime-input").val().trim(), "HH:mm").format("X");
  frequency = $("#frequency-input").val().trim();

// Uploads train data to the database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

// Clears all the text-boxes
$("#trainName-input").val("");
$("#destination-input").val("");
$("#trainTime-input").val("");
$("#frequency-input").val("");

return false;

});


// Table layout order to for front-end table
database.ref().on("child_added", function(snapshot) {
  // console.log(snapshot.val());

  // Store everything into a local variable, same variables as above
  var trainName = snapshot.val().trainName;
  var destination = snapshot.val().destination;
  var firstTrainTime = snapshot.val().firstTrainTime;
  var frequency = snapshot.val().frequency;

  // console.log(trainName);  

  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current time
  var currentTime = moment();
  // console.log("Current Time: " + moment(currentTime).format("HH:mm"));

  // Show the difference in minutes between the next arrival and the current time 
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in time: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute until the train arrival (minutes away)
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("Minutes till train: " + tMinutesTillTrain);

  // Next Arrival
  var nextArrival = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival time: " + moment(nextArrival).format("HH:mm"));



  // Add each train's data into the table
  var tr = $("<tr>");
  var td = $("<td>");

  td.append(snapshot.val().trainName);
  tr.append(td);
  td = $("<td>");

  td.append(snapshot.val().destination);
  tr.append(td);
  td = $("<td>");

  td.append(snapshot.val().frequency);
  tr.append(td);
  td = $("<td>");

  // Gap for Next Arrival
  td.append(snapshot.val().nextArrival);
  tr.append(td);
  td = $("<td>");

  // Gap for Minutes Away
  td.append(snapshot.val().tMinutesTillTrain);
  tr.append(td);
  td = $("<td>");

  $("tbody").append(tr);

});


