// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).ready(function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.
	
	
    // Inside the `searchImages()` function, the following things should happen:
		
        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.
	//Starting with the searchImages function, which takes a string "tags" as an argument.
	var searchImages = function(tags){
		//First, we empty the page of the previous results so it doesn't become an unparseable mess.
		$("#images").empty();
		//Next, we load the API into the variable flickerAPI, with the search term "tags".
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
			$.getJSON( flickerAPI, {
			tags: tags,
			tagmode: "any",
			format: "json"
		})
		//When that's done, we create new list elements for each image.  This is where it gets hairy.
		.done(function( data ) {
			$.each( data.items, function( i, item ) {
				
				var newImgList = $("<li>");
				//To this list element we append the image from "src" in the JSON data.
				$( "<img>" ).attr( "src", item.media.m ).appendTo(newImgList);
				//This keeps the modal button below the image itself.
				$("<br>").appendTo(newImgList);
				//Creating the modal button!  Here we attach all the elements we need from the JSON data, from the title to the description.
				var newButton = $("<button class='btn btn-sm btn-primary'><span class='glyphicon glyphicon-zoom-in'></span> enlarge</button>").attr({
					'data-title': item.title,
					'data-toggle': "modal",
					'data-target': "#infoModal",
					'data-imgsrc': item.media.m,
					'data-author': item.author,
					'data-description': item.description,
					'type': "button"
				}).appendTo(newImgList);
				//Putting line breaks in between each image element.
				$("<br><br><br>").appendTo(newImgList);
				//Now we actually append each list element to the ul in the HTML!
				newImgList.appendTo("#images");
				//Modifying the CSS so the white background disappears and forms a grid.
				$("#images").css("margin", "0 auto");
				$("#images").css("text-align", "center");
				$("#images").css("background", "rgba(0, 0, 0, 0.0)")
				$("#images").css("border", "none")
				$("#images li").css("display", "inline-block");
				$("#images li").css("width", "300px");
				
			if ( i === 19 ) {
				//Limiting the images to 20 per page.
				return false;
			}
			});
		});
	};
	
    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.
		
		//var tags = "asd";
	//Making the search button work!
	$("button.search").click(function(e, tags){
		//First we stop what the button usually does.
		e.preventDefault();
		//Then, we grab the var tags from the form the user filled out (the search bar).
		tags = $('.form-control').val();
		//If they didn't enter anything remind them to do so.
		if(tags.length  < 1){
			alert("Put some text to search, ya dingus!");
			return;
		};
		//Just making sure the form worked.
		//console.log(tags);
		//Update the page header accordingly with the tags and success of the search, then execute the search function.
		$("h1.search-title").first()[0].innerHTML = "Found " + tags + " via Flickr";
		searchImages(tags);
		
	});
		
    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target
	//Modal code!  Brings up the window.
	$('#infoModal').on('show.bs.modal', function (ev) {
		//Secondary target for the event, in this case closing the modal window.
		var button = $(ev.relatedTarget);
		//Gathering the JSON data to display in the modal window.
		var title = button.data('title');
		var imgSrc = button.data('imgsrc');
		var imgAuthor = button.data('author');
		var imgDescription = button.data('description');
		//Displaying all the info!
		var modal = $(this);
		//Erasing the defaults
		modal.find('.modal-title').empty();
		modal.find('.modal-body').empty();
		//And adding the found flickr values!
		modal.find('.modal-title').html("<h2>" + title + "</h2>");
		modal.find('.modal-body').html("<h3> Image by " + imgAuthor + "</h3>" + "<br>" + imgDescription);
	});

});
