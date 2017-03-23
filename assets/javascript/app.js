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

$("#submit").on("click", function(event){

  event.preventDefault();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";

  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrainTime = $("#trainTime-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });
  math(firstTrainTime, frequency);
});

function math (firstArrivalTime, frequency) {
  // input first train arrival
  console.log(firstArrivalTime+ " " +frequency);
  // Add frequency to firstTrainTime arrival
  firstArrivalTime + frequency
  var time = moment.time(firstArrivalTime).format('HH:mm')
  console.log(time.hour());
  // https://momentjs.com/docs/#/get-set/hour/

  // Show the difference in minutes between the next arrival and the current time 
}
// Using scripts from moment.js write code to complete the time
  // Arrival time 
  

  // Then, add/subtract minutes away using frequency as next arrival changes



// Table layout order to for front-end table
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

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
  tr.append(td);
  td = $("<td>");

  // Gap for Minutes Away
  tr.append(td);
  td = $("<td>");

  $("tbody").append(tr);

});


