const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const moment = require('moment');
const randomString = require('../helpers/utils').randomString;

class UploadController {

    /**
     * upload
     * @param req
     * @param res
     * @method POST
     * route /api/upload
     */
    upload(req, res) {

        let fileNames = [];

        // create an incoming form object
        let form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '../../public/upload');

        // every time a file has been uploaded successfully, rename it ...
        form.on('file', (field, file) => {
            const type = path.extname(file.name);
            const newFileName = randomString() + '_' + moment().format('YYYYMMDD_HHmmss') + type;
            fileNames.push('/upload/' + newFileName);
            fs.rename(file.path, path.join(form.uploadDir, newFileName));
        });

        // log any errors that occur
        form.on('error', err => {
            res.internalError(err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', () => {
            res.sendJSON(fileNames);
        });

        // parse the incoming request containing the form data
        form.parse(req);
    }

}

module.exports = new UploadController();