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
   },
   show(req, res, next){
     restroomQueries.getRestroom(req.params.id, (err, restroom) => {
       if(err || restroom == null){
         res.redirect(404, "/");
       } else {
         res.render("restrooms/show", {restroom});
       }
     });
   },
   destroy(req, res, next){
     restroomQueries.deleteRestroom(req.params.id, (err, restroom) => {
       if(err){
         res.redirect(500, `/restrooms/${restroom.id}`)
       } else {
         res.redirect(303, "/restrooms")
       }
     });
   },
   edit(req, res, next){
     restroomQueries.getRestroom(req.params.id, (err, restroom) => {
       if(err || restroom == null){
         res.redirect(404, "/");
       } else {
         res.render("restrooms/edit", {restroom});
       }
     });
   },
   update(req, res, next){
     restroomQueries.updateRestroom(req.params.id, req.body, (err, restroom) => {
       if(err || restroom == null){
         res.redirect(404, `/restrooms/${req.params.id}/edit`);
       } else {
         res.redirect(`/restrooms/${restroom.id}`);
       }
     });
   }
}
