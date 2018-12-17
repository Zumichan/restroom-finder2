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
  }
}
