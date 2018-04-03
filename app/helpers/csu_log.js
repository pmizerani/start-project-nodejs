const Mensagens = require('./mensagens');

class CSULog {

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
            case 'alertamanutencao':
                csuUtilizado = Mensagens.MSG27;
                break;
            case 'alerta':
                csuUtilizado = Mensagens.MSG28;
                break;
            case 'cerca':
                csuUtilizado = Mensagens.MSG29;
                break;
            case 'itemmanutencao':
                csuUtilizado = Mensagens.MSG30;
                break;
            case 'marcaobjeto':
                csuUtilizado = Mensagens.MSG31;
                break;
            case 'modeloobjeto':
                csuUtilizado = Mensagens.MSG32;
                break;
            case 'modulomarca':
                csuUtilizado = Mensagens.MSG33;
                break;
            case 'modulomodeloparametroassociacao':
                csuUtilizado = Mensagens.MSG34;
                break;
            case 'modulomodelo':
                csuUtilizado = Mensagens.MSG35;
                break;
            case 'moduloobjeto':
                csuUtilizado = Mensagens.MSG36;
                break;
            case 'modulo':
                csuUtilizado = Mensagens.MSG37;
                break;
            case 'pais':
                csuUtilizado = Mensagens.MSG38;
                break;
            case 'estado':
                csuUtilizado = Mensagens.MSG39;
                break;
            case 'cidade':
                csuUtilizado = Mensagens.MSG40;
                break;
            case 'perfil':
                csuUtilizado = Mensagens.MSG41;
                break;
            case 'pessoa':
                csuUtilizado = Mensagens.MSG42;
                break;
            case 'planomanutencao':
                csuUtilizado = Mensagens.MSG43;
                break;
            case 'regiao':
                csuUtilizado = Mensagens.MSG44;
                break;
            case 'tela':
                csuUtilizado = Mensagens.MSG45;
                break;
            case 'tipoalerta':
                csuUtilizado = Mensagens.MSG46;
                break;
            case 'tipomanutencao':
                csuUtilizado = Mensagens.MSG47;
                break;
            case 'tipomodulo':
                csuUtilizado = Mensagens.MSG48;
                break;
            case 'tipoobjeto':
                csuUtilizado = Mensagens.MSG49;
                break;
            case 'upload':
                csuUtilizado = Mensagens.MSG50;
                break;
            case 'usuario':
                csuUtilizado = Mensagens.MSG51;
                break;
            case 'vinculopessoa':
                csuUtilizado = Mensagens.MSG52;
                break;
            case 'objeto':
                csuUtilizado = Mensagens.MSG53;
                break;
            default:
                csuUtilizado = Mensagens.MSG25;
        }

        return csuUtilizado;

    }//end buscarCSU

}

module.exports = new CSULog();