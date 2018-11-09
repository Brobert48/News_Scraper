// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p>" + data[i].title + "<br />" + data[i].text + "<br />" + data[i].link + "<button data-id='" + data[i]._id + "' id='articleBtn'> More </button></p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "#articleBtn", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  $("#newNotes").empty();

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#newNotes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#newNotes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#newNotes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#newNotes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        $("#notes").append("<h2>Comments</h2>");
        for(let i =0; i<data.note.length;i++){
        // An input to enter a new title
        $("#notes").append("<p id='title' name='title' >"+ data.note[i].title +"</p>");
        // A textarea to add a new note body
        $("#notes").append("<p id='body' name='body'>"+ data.note[i].body+"</p>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='deletenote'> X </button>");
      }}
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
