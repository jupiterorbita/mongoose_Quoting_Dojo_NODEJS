var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = {
  index_route: function(req, res) {
    res.render("index");
  },

  quotes_post: function(req, res) {
    console.log("POST DATA", req.body);
    console.log(req.body.name);
    console.log(req.body.quote);

    var userInstance = new User({
      name: req.body.name,
      quote: req.body.quote
    });

    userInstance.save(function(err) {
      if (err) {
        console.log("we have an error", err);
        for (var key in err.errors) {
          req.flash("registration", err.errors[key].message);
        }
        res.redirect("/");
      } else {
        console.log("successfully added a user!");
        res.redirect("/quotes");
      }
    });
  },

  quotes_get: function(req, res) {
    console.log(">>>> SERVER > /quotes ejs =============");
    User.find({}, function(err, users) {
      console.log(users);
      console.log(err);
      if (err) {
        return res.json(err);
      }

      // console.log(users[0].name)
      // console.log(users[0].quote);
      return res.render("quotes", { users: users });
    });
  }
};
