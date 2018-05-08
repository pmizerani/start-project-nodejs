const Mensagens = require('./mensagens');

class CSU {

    /**
     * buscarCSU
     * @param csu
     * @return {Promise<void>}
     */
    async buscarCSU(csu) {

        let csuUtilizado = ``;

        switch (csu){
            case 'acao':
                csuUtilizado = Mensagens.MSG26;
                break;
            default:
                csuUtilizado = Mensagens.MSG25;
        }

        return csuUtilizado;

    }//end buscarCSU

}

module.exports = new CSU();