var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");
var ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {
  // Routes
  // A GET route for scraping the echoJS website
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios
      .get("https://news.google.com/?hl=en-US&gl=US&ceid=US:en")
      .then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h3").each(function(i, element) {
          // Save an empty result object
          var result = {};
          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");

          console.log(result);
          // Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        });

        // Send a message to the client
        res.render("index", {
          articles: true
        });
      });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    db.Article.find({})
      .limit(10)
      .then(function(dbLibrary) {
        // If any Libraries are found, send them to the client with any associated Books
        res.json(dbLibrary);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({ saved: false })
      .then(function(dbLibrary) {
        // If any Libraries are found, send them to the client with any associated Books
        res.json(dbLibrary);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/saved", function(req, res) {
    db.Article.find({ saved: true })
      .then(function(dbLibrary) {
        // If any Libraries are found, send them to the client with any associated Books
        res.render("saved", {
          saved: true
        });
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

  app.post("/articles/save/:id", function(req, res) {
    db.Article.updateOne({ _id: req.params.id }, { $set: { saved: true } })
      .then(function(dbArticle) {
        res.render("index", {
          articles: true
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/articles/save/:id", function(req, res) {
    res.render("index");
  });

  app.get("/clear", function(req, res) {
    db.Article.deleteMany({})
      .then(function(dbLibrary) {
        // If any Libraries are found, send them to the client with any associated Books
        console.log("all items deleted");
        res.render("index", {
          articles: false
        });
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

  app.get("/articles/delete/:id", function(req, res) {
    db.Article.deleteOne({ _id: req.params.id })
      .then(function(dbLibrary) {
        res.render("saved", {
          saved: true
        });
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
};
