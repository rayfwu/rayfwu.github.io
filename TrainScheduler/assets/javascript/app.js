// Initialize Firebase
var config = {
    apiKey: "AIzaSyCTTI3Diuxngk5EZUJqqqUdsPeXPpwiajQ",
    authDomain: "trainscheduler-f730f.firebaseapp.com",
    databaseURL: "https://trainscheduler-f730f.firebaseio.com",
    projectId: "trainscheduler-f730f",
    storageBucket: "trainscheduler-f730f.appspot.com",
    messagingSenderId: "158121090419"
};
firebase.initializeApp(config);

var database = firebase.database();

function updateSchedule() {
    var name        = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start       = moment($("#time-input").val().trim(), "HH:mm");
    var frequency   = $("#frequency-input").val().trim();
    var arrival     = nextArrival(start, moment(), frequency);

    database.ref().push({
        name       : name,
        destination: destination,
        frequency  : frequency,
        next       : arrival.format("HH: mm"),
        minutes    : arrival.diff(moment(), "minutes")
        
    }, (error) => {
        console.log(error);
    })

    console.log("breakpoint");

    // var tableRow =  "<tr>" +
    //                 "<td>" + name + "</td>" +
    //                 "<td>" + destination + "</td>" +
    //                 "<td>" + frequency + "</td>" +
    //                 "<td>" + arrival.format("HH:mm") + "</td>" +
    //                 "<td>" + arrival.diff(moment(), "minutes") + "</td>" +
    //                 "</tr>";

    // $("#train-table").append(tableRow);

    clearForm();
}

function nextArrival(start, now, frequency) {
    var minutesElapsed = now.diff(start, "minutes");
    var stopsElapsed = Math.floor(minutesElapsed / frequency);
    var nextStopMinutes = (stopsElapsed + 1) * frequency;

    start.add(nextStopMinutes, "minutes");
    return start;
    // return start.format("HH:mm");
}

function clearForm() {
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
}

$("#submit-button").click(function() {
    updateSchedule();
});

// checking if database had any child updates & updating html
database.ref().on("child_added", function(childSnapshot) {

    /*
        name
        destination
        frequency
        next arrival
        minutes away
    */

    var tableRow =  "<tr>" +
                    "<td>" + childSnapshot.val().name + "</td>" +
                    "<td>" + childSnapshot.val().destination + "</td>" +
                    "<td>" + childSnapshot.val().frequency + "</td>" +
                    "<td>" + childSnapshot.val().next + "</td>" +
                    "<td>" + childSnapshot.val().minutes + "</td>" +
                    "</tr>";

    $("#train-table").append(tableRow);

    // var tableText = 
    // "<tr>" +
    // "<td>" + childSnapshot.val().name + "</td>" +
    // "<td>" + childSnapshot.val().role + "</td>" +
    // "<td>" + childSnapshot.val().date + "</td>" +
    // "<td>" + childSnapshot.val().monthsWorked + "</td>" +
    // "<td>" + childSnapshot.val().rate + "</td>" +
    // "<td>" + childSnapshot.val().total + "</td>";

    // $("#form-body").append(tableText);
}, (error) => {
    console.log(error);
})

// Autofilling test fields to quickly fill out the forms

$("#test-1").click(function() {
    $("#name-input").val("Thomas");
    $("#destination-input").val("New York");
    $("#time-input").val("03:30");
    $("#frequency-input").val("12");
});

$("#test-2").click(function() {
    $("#name-input").val("Delorean");
    $("#destination-input").val("Albany");
    $("#time-input").val("01:00");
    $("#frequency-input").val("20");
});

$("#test-3").click(function() {
    $("#name-input").val("Smithy");
    $("#destination-input").val("Philly");
    $("#time-input").val("02:00");
    $("#frequency-input").val("30");
});