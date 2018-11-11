
$(document).on("click", "#scrapeBtn", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(){window.location.reload(true);})
});


$(document).on("click", "#articleBtn", function () {
  var thisId = $(this).attr("data-id");
  $("#notes").empty();
  $("#newNotes").empty();
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $("#newNotes").append("<div class='card' style='width: 18rem;'><div class='card-body'><h6 class='card-subtitle mb-2'>Add a Comment</h6><div class='form-group'><input id='titleinput' class='form-control' type='text' placeholder='Name'><textarea id='bodyinput' class='form-control' id='exampleFormControlTextarea1' placeholder='Enter Comment Here' rows='3'></textarea><button class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Submit</button></div></div></div>");
      if (data.note) {
        $("#notes").append("<h2>Comments</h2>");
        for(let i =0; i<3;i++){
        $("#notes").append("<div class='card' style='width: 18rem;'><div class='card-body'><h6 class='card-subtitle mb-2 text-muted'>"+ data.note[i].title +"</h6><p class='card-text'>"+ data.note[i].body+"</p><button class='btn btn-danger btn-sm' data-id='" + data.note[i]._id + "' id='deletenote'> X </button></div></div>");
      }}
    });
});

$(document).on("click", "#savenote", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {
      console.log(data);
      $("#notes").empty();
      $('#newNotes').empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId,
  })
    .then(function (data) {
      console.log(data);
      $("#notes").empty();
      $('#newNotes').empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
