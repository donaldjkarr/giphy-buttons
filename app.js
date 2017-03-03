var topics = ["game of thrones", "house of cards", "the man in the high castle", "the expanse", "westworld", 
"orange is the new black", "mr. robot"];


$(document).ready(function() {


		function renderButtons() {

		      // Deleting the movie buttons prior to adding new movie buttons
		      // (this is necessary otherwise we will have repeat buttons)
		      $("#gifbutton").empty();

		      // Looping through the array of movies
		      for (var i = 0; i < topics.length; i++) {

		        // Then dynamicaly generating buttons for each movie in the array.
		        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
		        var a = $("<button>");
		        // Adding a class
		        a.addClass("tv-show");
		        // Adding a data-attribute with a value of the movie at index i
		        a.attr("data-show", topics[i]);
		        // Providing the button's text with a value of the movie at index i
		        a.text(topics[i]);
		        // Adding the button to the HTML
		        $("#gifbutton").append(a);
		      }
		    }

		    $(".newshow").on("click", function(event) {
		      // event.preventDefault() prevents the form from trying to submit itself.
		      // We're using a form so that the user can hit enter instead of clicking the button if they want
		      event.preventDefault();

		      // This line will grab the text from the input box
		      var newShow = $("#tvsearch").val().trim();
		      // The movie from the textbox is then added to our array
		      topics.push(newShow);

		      // calling renderButtons which handles the processing of our movie array
		      renderButtons();


		    });

		    // Calling the renderButtons function at least once to display the initial list of movies
		    renderButtons();



            $(document).on("click", ".tv-show", function() {

                var tvShow = $(this).attr("data-show");

                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                    tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

                $.ajax({
                        url: queryURL,
                        method: "GET"
                    })

                    .done(function(response) {
                        console.log(queryURL);

                        console.log(response);
                        // storing the data from the AJAX request in the results variable
                        var results = response.data;

                        $("#gifs").empty();

                        // Looping through each result item
                        for (var i = 0; i < results.length; i++) {

                            // Creating and storing a div tag
                            var showDiv = $("<div>");

                            // Creating a paragraph tag with the result item's rating
                            var p = $("<p>").text("Rating: " + results[i].rating);

                            // Creating and storing an image tag
                            var showImage = $("<img>");


                            // Setting the src attribute of the image to a property pulled off the result item
                            showImage.attr("src", results[i].images.fixed_height_still.url);
                            showImage.attr("data-still", results[i].images.fixed_height_still.url);
                            showImage.attr("data-animate", results[i].images.fixed_height.url);
                            showImage.attr("data-state", "still");

                            // Appending the paragraph and image tag to the animalDiv
                            showDiv.append(p);
                            showDiv.append(showImage);

                            // Prependng the animalDiv to the HTML page in the "#gifs" div
                            $("#gifs").prepend(showDiv);
                        }
                    });



            });

            $(document).on("click", "img", function() {

            	var state = $(this).attr("data-state");


            	// =============================================

            	// STEP THREE: Check if the variable state is equal to 'still',
            	// then update the src attribute of this image to it's data-animate value,
            	// and update the data-state attribute to 'animate'.

            	if ("still" == state) {
            	    $(this).attr("src", $(this).attr("data-animate"));

            	    $(this).attr("data-state", "animate");
            	}
            	  else {
            	    $(this).attr("src", $(this).attr("data-still"));

            	    $(this).attr("data-state", "still");
            	  }
            });

});






