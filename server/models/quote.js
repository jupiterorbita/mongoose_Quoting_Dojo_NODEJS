// MODELS
var mongoose = require("mongoose");
// var User = mongoose.model("User");
require("../config/mongoose.js");

module.exports = function() {
//   var mongoose = require("mongoose");
//   mongoose.connect("mongodb://localhost/quoting_dojo");

  var UserSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, minlength: 3, maxlength: 10 },
      quote: { type: String, required: true, minlength: 5, maxlength: 150 }
    },
    { timestamps: true }
  );

  mongoose.model("User", UserSchema);
  // var User = mongoose.model('User');

  mongoose.Promise = global.Promise;
};
