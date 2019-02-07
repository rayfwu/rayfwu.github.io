
QUnit.test( "Next Arrival tests", function( assert ) {
    assert.equal( nextArrival(moment("08:00", "HH:mm"), moment("08:15", "HH:mm"), 30).format("HH:mm"), moment("08:30", "HH:mm").format("HH:mm"), "Passed!" );
    assert.equal( nextArrival(moment("08:00", "HH:mm"), moment("12:05", "HH:mm"), 30).format("HH:mm"), moment("12:30", "HH:mm").format("HH:mm"), "Passed!" );
    assert.equal( nextArrival(moment("10:30", "HH:mm"), moment("12:30", "HH:mm"), 45).format("HH:mm"), moment("12:45", "HH:mm").format("HH:mm"), "Passed!" );
    assert.equal( nextArrival(moment("08:30", "HH:mm"), moment("13:23", "HH:mm"), 30).format("HH:mm"), moment("13:30", "HH:mm").format("HH:mm"), "Passed!" );
});

/*  
    Test the next arrival time.  Take in two moment objects: one for the current time and one for the first departure time.  
    Also take in frequency in minutes.
    Let's say the train leaves at 8:00 AM.
    The current time is 12:05 PM and the frequency is 30 minutes.
    Simply put, the train comes every hour and half hour, such as 9:00 and 9:30.
    The nextArrival function should return a moment object that is either an hour or half hour.
    In the 12:05 PM case, it should return 12:30 PM.

    Other case studies...
    First departure : 10:30 AM
    Frequency       : 45 minutes
    Current time    : 12:30 PM
    Next arrival    : 12:45 PM

    First departure : 8:30 AM
    Frequency       : 15 minutes
    Current time    : 1:23 PM
    Next arrival    : 1:30 PM
*/