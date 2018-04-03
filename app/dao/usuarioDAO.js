const Model = require('../classes/model');

class UsuarioDAO extends Model {

    /**
     * constructor
     */
    constructor() {
        super('usuario');
    }

    /**
     * buscaPorCredenciais
     * @param tx_email
     * @param tx_senha
     */
    buscaPorCredenciais({ tx_email, tx_senha }) {

        return this.db.select([
            '*'
        ]).from('usuario')
            .where({
                'tx_email': tx_email,
                'tx_senha': tx_senha,
                'bl_ativado': 1
            });

    }//end buscaPorCredenciais

}

module.exports = new UsuarioDAO();