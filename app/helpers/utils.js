const crypto = require('crypto');

const ALGORITHM = 'aes-256-ctr';
const HASH = 'q1w2e3r4';

class Utils {

    /**
     * encrypt
     * @param text
     * @returns {Buffer | string}
     */
    encrypt(text) {
        const cipher = crypto.createCipher(ALGORITHM, HASH);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    /**
     * decrypt
     * @param text
     * @returns {Buffer | string}
     */
    decrypt(text) {
        const decipher = crypto.createDecipher(ALGORITHM, HASH);
        let dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    /**
     * randomString
     * @returns {string}
     */
    randomString() {

        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}

module.exports = new Utils();