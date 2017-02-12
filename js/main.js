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
	var listLen = 0;
	var searchImages = function(tags){
		$("#images").empty();
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
			$.getJSON( flickerAPI, {
			tags: tags,
			tagmode: "any",
			format: "json"
		})
		.done(function( data ) {
			$.each( data.items, function( i, item ) {
				
				var newImgList = $("<li>");
				//create css with jquery
				$( "<img>" ).attr( "src", item.media.m ).appendTo(newImgList);
				/* var title = $('<p class="image-title">').html(item.title).appendTo(newImgList);
				var date = $('<p class = "image-date">').text(item.date_taken).appendTo(newImgList);
				var desc = $("<p class = 'image-description'>").html(item.description).appendTo(newImgList);
				var Link = $("<a>").attr('href', item.link).text("Check this out on Flickr!").appendTo(newImgList); */
				$("<br>").appendTo(newImgList);
				var newButton = $("<button class='btn btn-sm btn-primary'><span class='glyphicon glyphicon-zoom-in'></span> enlarge</button>").attr({
					'data-title': item.title,
					'data-toggle': "modal",
					'data-target': "#infoModal",
					'data-imgsrc': item.media.m,
					'data-author': item.author,
					'data-description': item.description,
					'type': "button"
				}).appendTo(newImgList);
				
				$("<br><br><br>").appendTo(newImgList);
				
				newImgList.appendTo("#images");
				
				$("#images").css("margin", "0 auto");
				$("#images").css("text-align", "center");
				$("#images").css("background", "rgba(0, 0, 0, 0.0)")
				$("#images").css("border", "none")
				$("#images li").css("display", "inline-block");
				$("#images li").css("width", "300px");
				
			if ( i === 19 ) {
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
	var imgURL = [];
	$("button.search").click(function(e, tags){
		e.preventDefault();
		
		tags = $('.form-control').val();
		if(tags.length  < 1){
			alert("Put some text to search, ya dingus!");
			return;
		};
		console.log(tags);
		//$("#images").empty();
		$("h1.search-title").first()[0].innerHTML = "Found " + tags + " via Flickr";
		searchImages(tags);
		
	});
		
    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target
	
	$('#infoModal').on('show.bs.modal', function (ev) {
		var button = $(ev.relatedTarget);
		var title = button.data('title');
		var imgSrc = button.data('imgsrc');
		var imgAuthor = button.data('author');
		var imgDescription = button.data('description');
		
		var modal = $(this);
		modal.find('.modal-title').empty();
		modal.find('.modal-body').empty();
		
		modal.find('.modal-title').html("<h2>" + title + "</h2>");
		modal.find('.modal-body').html("<h3> Image by " + imgAuthor + "</h3>" + "<br>" + imgDescription);
	});

});
