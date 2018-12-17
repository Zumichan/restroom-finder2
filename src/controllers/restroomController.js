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
  },
  new(req, res, next){
    res.render("restrooms/new");
  },
  create(req, res, next){
     let newRestroom = {
       title: req.body.title,
       address: req.body.address
     };
     restroomQueries.addRestroom(newRestroom, (err, restroom) => {
       if(err){
         res.redirect(500, "/restrooms/new");
       } else {
         res.redirect(303, `/restrooms/${restroom.id}`);
       }
     });
   }
}
