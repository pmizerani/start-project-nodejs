const CountryController = require("../controllers/country");
const jwt = require("../classes/jwt");

module.exports = (app) => {

    app.route("/api/country")
        .get(jwt.ensureAuth, CountryController.findAllCountries);

    app.route("/api/stateprovince/:id_country")
        .get(jwt.ensureAuth, CountryController.findAllStateProvince);

    app.route("/api/city/:id_state")
        .get(jwt.ensureAuth, CountryController.findAllCities);

};