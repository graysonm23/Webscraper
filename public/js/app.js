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
