const crypto = require('crypto');

const ALGORITHM = 'aes-256-ctr';
const HASH = 'q1w2e3r4';

class Utils {
    encrypt(text) {
        const cipher = crypto.createCipher(ALGORITHM, HASH);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
}

module.exports = new Utils();