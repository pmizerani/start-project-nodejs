const crypto = require('crypto');

const ALGORITHM = 'aes-256-ctr';
const HASH = 'criar-hash'; //TODO alterar hash
const IV = 'criar-hash-com-16-caracteres'; //TODO alterar hash

class Utils {

    /**
     * encrypt
     * @param text
     * @returns {Buffer | string}
     */
    encrypt(text) {
        const cipher = crypto.createCipheriv(ALGORITHM, HASH, IV);
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
        const decipher = crypto.createDecipheriv(ALGORITHM, HASH, IV);
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

    /**
     * randomStringWithSize
     * @param size
     * @returns {string}
     */
    randomStringWithSize(size) {

        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < size; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}

module.exports = new Utils();