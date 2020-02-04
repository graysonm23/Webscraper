console.log("im here");
function checkStorage() {
  if (localStorage.getItem("articles")) {
    return false;
  } else {
    localStorage.setItem("articles", "yes");
    return true;
  }
}
// Check the local storage to see if we have articles in database
// Grab the articles as a json
checkStorage();
$("#articles").empty();
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      `<div class="articleClass card"><a class="articleClassA" href="https://www.news.google.com/${data[i].link}"><h4 class="card-title">${data[i].title}</h4></a><p class="card-body"><a href="/articles/save/${data[i]._id}"><button data-id='${data[i]._id}' data-title='${data[i].title}' data-mylink='${data[i].link}' id="saveBtn" class="saveBtn btn btn-warning btn-xl m-2">Save <i class="far fa-heart"></i></button></a><button class="deleteBtn btn btn-danger btn-xl m-2">Delete <i class="far fa-trash-alt"></i></button></p></div>`
    );
  }
});

$(".deleteBtn").on("click", function(req, res) {
  event.preventDefault();
  console.log("ive been clicked");
});

$("#clearBtn").on("click", function() {
  if (localStorage.getItem("articles")) {
    localStorage.removeItem("articles");
    console.log(localStorage.get("articles"));
  } else {
    return true;
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
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append(
        "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
      );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
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
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
