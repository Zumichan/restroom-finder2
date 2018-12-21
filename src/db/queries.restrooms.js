const Restroom = require("./models").Restroom;
const Authorizer = require("../policies/application");

module.exports = {
  getAllRestrooms(callback){
    return Restroom.findAll()
    .then((restrooms) => {
      callback(null, restrooms);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addRestroom(newRestroom, callback){
    return Restroom.create({
      title: newRestroom.title,
      address: newRestroom.address,
      men: newRestroom.men,
      women: newRestroom.women,
      allgender: newRestroom.allgender,
      accessibility: newRestroom.accessibility,
      facility: newRestroom.facility
    })
    .then((restroom) => {
      callback(null, restroom);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getRestroom(id, callback){
     return Restroom.findByPk(id)
     .then((restroom) => {
       callback(null, restroom);
     })
     .catch((err) => {
       callback(err);
     })
   },
   deleteRestroom(id, callback){
     return Restroom.destroy({
       where: {id}
     })
     .then((restroom) => {
       callback(null, restroom);
     })
     .catch((err) => {
       callback(err);
     })
   },
   deleteRestroom(req, callback){
     return Restroom.findById(req.params.id)
     .then((restroom) => {
       const authorized = new Authorizer(req.user, restroom).destroy();
       if(authorized) {
         restroom.destroy()
         .then((res) => {
           callback(null, restroom);
         });
       } else {
         req.flash("notice", "You are not authorized to do that.")
         callback(401);
       }
     })
     .catch((err) => {
       callback(err);
     });
   },
   updateRestroom(req, updatedRestroom, callback){
     return Restroom.findById(req.params.id)
     .then((restroom) => {
       if(!restroom){
         return callback("Restroom Information not found");
       }
       const authorized = new Authorizer(req.user, restroom).update();
       if(authorized) {
         restroom.update(updatedRestroom, {
           fields: Object.keys(updatedRestroom)
         })
         .then(() => {
           callback(null, restroom);
         })
         .catch((err) => {
           callback(err);
         });
       } else {
         req.flash("notice", "You are not authorized to do that.");
         callback("Forbidden");
       }
     });
   }
}
