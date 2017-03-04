var topics = ["game of thrones", "house of cards", "the man in the high castle", "the expanse", "westworld", 
"orange is the new black", "mr. robot"];


$(document).ready(function() {


		function renderButtons() {


		      $("#gifbutton").empty();

		      for (var i = 0; i < topics.length; i++) {

		      
		        var a = $("<button>");
		        a.addClass("tv-show");
		        a.attr("data-show", topics[i]);
		        a.text(topics[i]);
		        $("#gifbutton").append(a);
		      }
		    }

		    $(".newshow").on("click", function(event) {

		      event.preventDefault();


		      var newShow = $("#tvsearch").val().trim();

		      topics.push(newShow);


		      renderButtons();


		    });


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

                        var results = response.data;

                        $("#gifs").empty();


                        for (var i = 0; i < results.length; i++) {

                            var showDiv = $("<div>");

                            var p = $("<p>").text("Rating: " + results[i].rating);

                            var showImage = $("<img>");


                            showImage.attr("src", results[i].images.fixed_height_still.url);
                            showImage.attr("data-still", results[i].images.fixed_height_still.url);
                            showImage.attr("data-animate", results[i].images.fixed_height.url);
                            showImage.attr("data-state", "still");

                            showDiv.append(p);
                            showDiv.append(showImage);

                            $("#gifs").prepend(showDiv);
                        }
                    });



            });

            $(document).on("click", "img", function() {

            	var state = $(this).attr("data-state");

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






