let messagesUtil = require('../util/messages')();

//exports
module.exports = (app) => {

      //Variables
      let controller = {};
      let ModelExample = app.models.model_example;

      /**
       * get
       * @param req
       * @param res
       */
      controller.get = (req, res) => {
            res.status(200).json(messagesUtil.messageDefault);
      };

      /**
       * post
       * @param req
       * @param res
       */
      controller.post = (req, res) => {
            res.status(200).json(messagesUtil.messageDefault);
      };

      /**
       * put
       * @param req
       * @param res
       */
      controller.put = (req, res) => {
            res.status(200).json(messagesUtil.messageDefault);
      };

      /**
       * delete
       * @param req
       * @param res
       */
      controller.delete = (req, res) => {
            res.status(200).json(messagesUtil.messageDefault);
      };

      //return
      return controller;
};