module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const restroomRoutes = require("../routes/restrooms");
    const searchRoutes = require("../routes/search");
    const userRoutes = require("../routes/users");
    app.use(staticRoutes);
    app.use(restroomRoutes);
    app.use(searchRoutes);
    app.use(userRoutes);
  }
}
