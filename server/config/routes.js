// var mongoose = require("mongoose");
// var User = mongoose.model("User");
var quotes = require("../controllers/quotes.js");

module.exports = function(app) {
  //linking the quotes.js with all the logic form server/controllers

  // ============= INDEX =====================
  app.get("/", function(req, res) {
    // res.render("index");
    quotes.index_route(req, res);
  });

  // ============= POST /QUOTES METHOD ==========
  app.post("/quotes", quotes.quotes_post);


  // ============= GET /QUOTES PAGE ==============
  app.get("/quotes", quotes.quotes_get);

};
