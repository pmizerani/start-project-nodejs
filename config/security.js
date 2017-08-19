//module exports
module.exports = (app) => {

      let security = {};

      /**
       * checkSecurity
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      security.checkSecurity = (req, res, next) => {

            //Implement security here
            next();

      };//end checkSecurity

      /**
       * checkAuth
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      security.checkAuth = (req, res, next) => {

            //Implement security here
            next();

      };//end checkAuth

      //return
      return security;
};