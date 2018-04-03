const Mensagens = require('../helpers/mensagens');
const CsuLog = require('../helpers/csu_log');
const LogDAO = require('../dao/logDAO');

/**
 * output
 * @param req
 * @param res
 * @param next
 */
function output(req, res, next) {

    /**
     * badRequest
     * @param message
     */
    res.badRequest = function (message = Mensagens.MSG05) {
        res.status(400).send(message);
    }

    /**
     * unauthorized
     * @param message
     */
    res.unauthorized = function (message = Mensagens.MSG06) {
        res.status(401).send([message]);
    }

    /**
     * denied
     * @param message
     */
    res.denied = function (message = Mensagens.MSG12) {
        res.status(403).send([message]);
    }

    /**
     * notFound
     * @param message
     */
    res.notFound = function (message = Mensagens.MSG09) {
        res.status(404).send([message]);
    }

    /**
     * internalError
     * @param message
     */
    res.internalError = function (message = Mensagens.MSG07) {

        console.log(message);

        if (message.code && 'ER_ROW_IS_REFERENCED_2' === message.code) res.status(403).send([Mensagens.MSG10]);
        else if (message.code && 'ER_DUP_ENTRY' === message.code) res.status(403).send([Mensagens.MSG13]);
        else res.status(500).send([message.toString()]);

    }

    /**
     * sendJSON
     * @param jsonObject
     * @return {Promise<void>}
     */
    res.sendJSON = async function (jsonObject) {

        //Se a url for diferente de 'auth' (login) e o método for POST, PUT ou DELETE registra log no banco
        // if ('auth' !== res.req.url.split('/')[2] && ('POST' === res.req.method || 'PUT' === res.req.method || 'DELETE' === res.req.method)) {
        //
        //     try {
        //
        //         let acao = ``;
        //         let data = ``;
        //
        //         //Seleciona ação
        //         switch (res.req.method) {
        //
        //             //Se o método for POST está criando um registro
        //             case 'POST':
        //
        //                 acao = Mensagens.MSG21;
        //                 data = `${JSON.stringify(jsonObject)} - ${JSON.stringify(res.req.body)}`;
        //                 break;
        //
        //             //Se o método for PUT está atualizando um registro
        //             case 'PUT':
        //
        //                 acao = Mensagens.MSG22;
        //                 data = `${JSON.stringify(res.req.params)} - ${JSON.stringify(res.req.body)}`;
        //                 break;
        //
        //             //Se o método for DELETE está excluindo um registro
        //             case 'DELETE':
        //
        //                 acao = Mensagens.MSG23;
        //                 data = JSON.stringify(res.req.params);
        //                 break;
        //
        //             default:
        //                 acao = Mensagens.MSG24;
        //         }
        //
        //         //Busca nome do CSU
        //         const csu = await CsuLog.buscarCSU(res.req.url.split('/')[2]);
        //
        //         //Cria LOG
        //         await LogDAO.inserir({
        //             id_usuario: res.req.usuarioAutenticado.id_usuario,
        //             dt_criacao: new Date(),
        //             tx_log: `${Mensagens.MSG20} ${res.req.usuarioAutenticado.tx_nome} ${acao} ${csu} - ${data}`
        //         });
        //
        //     } catch (err) {
        //         //Cria LOG erro
        //         await LogDAO.inserir({
        //             id_usuario: res.req.usuarioAutenticado.id_usuario,
        //             dt_criacao: new Date(),
        //             tx_log: `${Mensagens.MSG54} ${await CsuLog.buscarCSU(res.req.url.split('/')[2])} - ${JSON.stringify(err)}`
        //         });
        //     }
        // }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonObject));
    }

    next();
}

module.exports = output;