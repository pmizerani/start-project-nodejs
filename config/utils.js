//includes
let crypto = require('crypto');
let fs = require('fs');

//exports
module.exports = function (app) {

      //Variables
      let controller = {};
      let algorithm = 'aes-256-ctr';
      let hash = 'hash';

      /**
       * getRandomInt
       * @param min
       * @param max
       * @returns {*}
       */
      getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      /**
       * checkBasicFolders
       */
      controller.checkBasicFolders = () => {

            //Variables
            let folders = ["logs"];

            try {

                  for (let i = 0; i < folders.length; i++) {
                        //check
                        if (!fs.existsSync("./" + folders[i])) {
                              //create
                              fs.mkdirSync("./" + folders[i]);
                        }
                  }

            } catch (error) {
                  console.log(error);
            }

      };//end checkBasicFolders

      /**
       * decrypt
       * @param text
       */
      controller.decrypt = (text) => {

            //Variables
            let decipher = crypto.createDecipher(algorithm, hash);
            let dec = decipher.update(text, 'hex', 'utf8');

            //decipher
            dec += decipher.final('utf8');

            //return
            return dec;

      };//end decrypt

      /**
       * encrypt
       * @param text
       */
      controller.encrypt = (text) => {

            //Variables
            let cipher = crypto.createCipher(algorithm, hash);
            let crypted = cipher.update(text, 'utf8', 'hex');

            //cipher
            crypted += cipher.final('hex');

            //return
            return crypted;

      };//end encrypt

      /**
       * randomString
       * @param len
       */
      controller.randomString = (len) => {

            //buff
            let date = new Date();
            let buf = [],
                  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getHours() + date.getMinutes() + date.getSeconds(),
                  charlen = chars.length;

            //list
            for (let i = 0; i < len; ++i) {
                  buf.push(chars[getRandomInt(0, charlen - 1)]);
            }

            //return
            return buf.join('');

      };//end randomString

      //return
      return controller;
};