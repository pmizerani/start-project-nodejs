//includes
let nodemailer = require('nodemailer');

//exports
module.exports = (app) => {
    
    //Variables
    let controller = {};

    /**
     * getConfig
     */
    getConfig = () => {
        
        //Variables
        var config = {
            host: 'mail.host.com.br',
            port: 587,
            secure: false,
            tls: true,
            auth: {
                user: 'naoresponda@host.com.br',
                pass: 'password'
            }
        };

        //return
        return config;

    };//end getConfig

    /**
     * send
     * @param {*} name
     * @param {*} address
     * @param {*} to
     * @param {*} replyTo
     * @param {*} subject
     * @param {*} message
     * @param {*} headers
     * @param {*} attachments
     * @param {*} callBack
     */
    controller.send = (name, to, replyTo, subject, message, headers, attachments, callBack) => {
        
        //variables
        let config = getConfig();
        let mailOptions = {
            from: {
                name: name,
                address: config.auth.user},
            to: to,
            replyTo: replyTo,
            subject: subject,
            text: '', //empty for send message with html
            html: message,
            attachments: attachments,
            headers: headers
        };

        //set transporter
        transporter = nodemailer.createTransport(config);

        // verify connection configuration
        transporter.verify((error, success) => {
            
            if (error) {
                
                app.logger.log("error", "config - mail - send - " + error);
                callBack(null);

            } else {

                //logger
                console.log('Server is ready to take our messages');
                
                //send mail
                transporter.sendMail(mailOptions, (error, resp) => {
                    
                    //check error
                    if (error) {

                        app.logger.log("error", "config - mail - send - " + error);
                        callBack(null);

                    } else callBack(resp);

                });
            }

        });

    };//end send

    //return
    return controller;
};