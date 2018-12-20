module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const restroomRoutes = require("../routes/restrooms");
    const searchRoutes = require("../routes/search");
    const userRoutes = require("../routes/users");

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(restroomRoutes);
    app.use(searchRoutes);
    app.use(userRoutes);
  }
}
