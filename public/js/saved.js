console.log("in saved");
$.getJSON("/saved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#saved").append(
      `<div class="articleClass card"><a class="articleClassA" href="https://www.news.google.com/${data[i].link}"><h4 class="card-title">${data[i].title}</h4></a><p class="card-body"><button data-id='${data[i]._id}' data-title='${data[i].title}' data-mylink='${data[i].link}' data-toggle="modal" data-target="#exampleModalCenter" id="noteBtn" class="noteBtn btn btn-xl m-2">Add a note<i class="far fa-sticky-note"></i></button><a href="/articles/delete/${data[i]._id}"><button class="deleteBtn btn btn-danger btn-xl m-2">Delete <i class="far fa-trash-alt"></i></button></a></p></div>`
    );
  }
});

$(document).on("click", ".noteBtn", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/notes/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      $(".modal-title").text(data.title);
      $("#savenote").attr("data-id", data._id);
      //   // The title of the article
      //   $("#notes").append("<h2>" + data.title + "</h2>");
      //   // An input to enter a new title
      //   $("#notes").append("<input id='titleinput' name='title' >");
      //   // A textarea to add a new note body
      //   $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      //   // A button to submit a new note, with the id of the article saved to it
      //   $("#notes").append(
      //     "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
      //   );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $(".modal-title").val(data.note.title);
        // Place the body of the note in the body textarea
        $(".modal-text").val(data.note.body);
      }
    });
});
// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data: {
      // Value taken from title input
      title: $(".modal-title").val(),
      // Value taken from note textarea
      body: $(".modal-text").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $(".modal-title").empty();
      $(".modal-text").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $(".modal-body").val("");
  $(".modal-text").val("");
  $("#modalClose").click();
});
