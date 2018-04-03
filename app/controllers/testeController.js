const Mensagens = require('../helpers/mensagens');
const TesteRepository = require('../repository/testeRepository');

/**
 * TesteController
 */
class TesteController {

    /**
     * teste
     * @param req
     * @param res
     * @method GET
     * route /api/teste
     */
    async teste(req, res) {

        try {

            const respo = await TesteRepository.executar();
            res.sendJSON(respo);

        } catch (err) {
            res.internalError(err);
        }

    }//end teste

}

module.exports = new TesteController();