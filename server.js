var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var path = require("path");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(path.join(__dirname, "/public")));

require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// Connect to the Mongo DB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/unit18Populater")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ", err);
  });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
module.exports = app;
