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
  }
}
