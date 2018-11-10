// // Grab the articles as a json
// $.getJSON("/articles", function (data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p>" + data[i].title + "<br />" + data[i].text + "<br />" + data[i].link + "<button data-id='" + data[i]._id + "' id='articleBtn'> More </button></p>");
//   }
// });


// Whenever someone clicks a p tag
$(document).on("click", "#articleBtn", function () {
  // Empty the notes from the note section
  

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  $("#notes").empty();
  $("#newNotes").empty();
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      $("#newNotes").append("<div class='card' style='width: 18rem;'><div class='card-body'><h6 class='card-subtitle mb-2'>Add a Comment</h6><div class='form-group'><label for='exampleFormControlTextarea1'></label><input class='form-control' type='text' placeholder='Name'><textarea class='form-control' id='exampleFormControlTextarea1' placeholder='Enter Comment Here' rows='3'></textarea><button class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Submit</button></div></div></div>");
      // If there's a note in the article
      if (data.note) {
        $("#notes").append("<h2>Comments</h2>");
        for(let i =0; i<2;i++){
        // An input to enter a new title
        $("#notes").append("<div class='card' style='width: 18rem;'><div class='card-body'><h6 class='card-subtitle mb-2 text-muted'>"+ data.note[i].title +"</h6><p class='card-text'>"+ data.note[i].body+"</p><button class='btn btn-danger btn-sm' data-id='" + data._id + "' id='deletenote'> X </button></div></div>");
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
