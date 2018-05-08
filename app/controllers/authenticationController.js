const UsuarioDAO = require('../dao/usuarioDAO');
const valid = require('../helpers/validation');
const encrypt = require('../helpers/utils').encrypt;
const jwt = require('../classes/jwt');
const Mensagens = require('../helpers/mensagens');
const TesteRepository = require('../repository/testeRepository');

/**
 * AuthController
 */
class AuthController {

    /**
     * constructor
     */
    constructor() {
        this.auth = this.auth.bind(this);
        this.validarToken = this.validarToken.bind(this);
    }

    /**
	 * autenticacao
	 * @param req
	 * @param res
	 * @method POST
	 * route /api/autenticacao
	 */
	async autenticacao(req, res) {

		const errors = [];
		const {tx_email, tx_senha} = req.body || {};
		let usuarioLogado = {};
		
		if (!valid.email(tx_email)) errors.push(`tx_email ${Mensagens.MSG03}`);
		if (!tx_senha) errors.push(`tx_senha ${Mensagens.MSG04}`);

		if (errors.length > 0) {
			res.badRequest(errors);
			return;
		}

		try {

            usuarioLogado = await UsuarioDAO.buscaPorCredenciais({
                tx_email, tx_senha: encrypt(tx_senha)
            });

            if (!usuarioLogado || 0 === usuarioLogado.length) {
                res.unauthorized();
                return;
            }

            const usuarioAutenticado = await this.criarAutenticacao(usuarioLogado);

            res.sendJSON(usuarioAutenticado);

		} catch (err) {
			res.internalError(err);
		}

	}//end autenticacao

    /**
	 * validarToken
     * @param req
     * @param res
	 * @method GET
	 * route /api/validartoken
     */
    async validarToken(req, res) {

        let usuarioLogado = {};

        try {

            usuarioLogado = await UsuarioDAO.buscar([{
                id_usuario: req.usuarioAutenticado.id_usuario,
            }]);

            if (!usuarioLogado || 0 === usuarioLogado.length) {
                res.unauthorized();
                return;
            }

            const usuarioAutenticado = await this.criarAutenticacao(usuarioLogado);

            res.sendJSON(usuarioAutenticado);

        } catch (err) {
            res.internalError(err);
        }

    }//end validarToken

    /**
     * criarAutenticacao
     * @param usuarioLogado
     * @return {Promise<{token: String}>}
     */
    async criarAutenticacao(usuarioLogado) {

        //Cria o token com JWT
        const token = jwt.criar({
            id_usuario: usuarioLogado.id_usuario
        });

        return {token};

    }//end criarAutenticacao

}

module.exports = new AuthController();