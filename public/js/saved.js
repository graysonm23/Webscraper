console.log("in saved");
$.getJSON("/saved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#saved").append(
      `<div class="articleClass card"><a class="articleClassA" href="https://www.news.google.com/${data[i].link}"><h4 class="card-title">${data[i].title}</h4></a><p class="card-body"><button data-id='${data[i]._id}' data-title='${data[i].title}' data-mylink='${data[i].link}' id="noteBtn" class="noteBtn btn btn-xl m-2">Add a note<i class="far fa-sticky-note"></i></button><a href="/articles/delete/${data[i]._id}"><button class="deleteBtn btn btn-danger btn-xl m-2">Delete <i class="far fa-trash-alt"></i></button></a></p></div>`
    );
  }
});

$(".noteBtn").on("click", function() {
  event.preventDefault();
  console.log("note btn clicked");
});
