//exports
module.exports = () => {

      //Variables
      let controller = {};

      /**
       * log
       * @param req
       * @param res
       * @param status
       * @param message
       * @param data
       */
      controller.log = (req, res, status, message, data) => {

            console.log("### ERROR - " + message + " - " + data);
            let dataResponse = {
                  status: status,
                  message: message,
                  data: data
            };
            res.status(dataResponse.status).json(dataResponse);

      };//end log

      //return
      return controller;
};