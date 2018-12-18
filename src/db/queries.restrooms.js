const Restroom = require("./models").Restroom;

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
      address: newRestroom.address
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
   updateRestroom(id, updatedRestroom, callback){
     return Restroom.findByPk(id)
     .then((restroom) => {
       if(!restroom){
         return callback("Restroom Information not found");
       }
       restroom.update(updatedRestroom, {
         fields: Object.keys(updatedRestroom)
       })
       .then(() => {
         callback(null, restroom);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }
}
