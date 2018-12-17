module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const restroomRoutes = require("../routes/restrooms");
    app.use(staticRoutes);
    app.use(restroomRoutes);
  }
}
