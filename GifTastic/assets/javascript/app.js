

var topics = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];

for (let x of topics) {
    setButton(x);
    console.log(x);
}

$("#button-submit").click( function() {
    var submission = $("#user-input").val().trim();
    if (!hasDuplicate(submission)){
        topics.push(submission);
        setButton(submission);
    }
});

function hasDuplicate(x) {
    for (let i of topics) {
        if (x == i) {
            return true;
        }
    }
    return false;
}

function setButton(topic) {
    $("#topic-buttons").append( "<button type='button' id='" +
                                topic +
                                "' class='btn btn-info btn-space'>" + 
                                topic + 
                                "</button>");

    $("#" + topic).click( function() {
        var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" +
                        topic + 
                        "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            // <img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" 
            // data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" 
            // data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" 
            // data-state="still" class="gif"></img>

              var results = response.data;
              console.log(results);
    
              for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
    
                var rating = results[i].rating;
                var gifURL = results[i].images.fixed_height.url;
                var gifURLStill = results[i].images.fixed_height_still.url
    
                var p = $("<p>").text("Rating: " + rating);
    
                var image = $("<img>");
                image.attr("src", gifURLStill).attr("data-still", gifURLStill).attr("data-animate", gifURL).attr("data-state", "still").attr("class", "gif");
    
                gifDiv.prepend(p);
                gifDiv.prepend(image);

                console.log(gifDiv);
    
                $("#gif-display").prepend(gifDiv);
              }
            $(".gif").on("click", function() {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    });
}