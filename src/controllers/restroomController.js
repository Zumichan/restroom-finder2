const restroomQueries = require("../db/queries.restrooms.js")

module.exports = {
  index(req, res, next){
    restroomQueries.getAllRestrooms((err, restrooms) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("restrooms/index", {restrooms});
      }
    })
  }
}
