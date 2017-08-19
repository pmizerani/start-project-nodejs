module.exports = (app) => {

      //variables
      let security = app.security;
      let Controller = app.controllers.controller;

      //ROUTES
      app.route("/api/route")
            .get(security.checkSecurity, Controller.get)
            .post(security.checkSecurity, Controller.post)
            .put(security.checkSecurity, Controller.put)
            .delete(security.checkSecurity, Controller.delete);

};