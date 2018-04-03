const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const moment = require('moment');
const randomString = require('../helpers/utils').randomString;
const Mensagens = require('../helpers/mensagens');
const env = process.env.NODE_ENV || 'local';
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

class UploadController {

    constructor() {
        this.otimizarImagens = this.otimizarImagens.bind(this);
        this.upload = this.upload.bind(this);
    }

    /**
     * upload
     * @param req
     * @param res
     * @method POST
     * route /api/upload
     */
    upload(req, res) {

        try {

            let envio_completo = [];
            let extensao_nao_permitida = [];

            // Cria um formulario com os objetos que estao chegando
            let form = new formidable.IncomingForm();

            // Habilita o envio de mais de um arquivo pelo usuário
            form.multiples = true;

            // Armazena todos os arquivos na pasta 'uploads' na raiz da aplicacao
            if ('local' === env || 'development' === env) form.uploadDir = path.join(__dirname, '../../../public/uploads');
            else if ('test' === env || 'production' === env) form.uploadDir = path.join(__dirname, '../../../uploads');

            //Verifica se a extensão do arquivo é permitida
            form.onPart = function(part) {
                if(!part.filename || part.filename.match(/\.(jpg|jpeg|png|pdf|doc|svg)$/i)) {
                    this.handlePart(part);
                } else {
                    extensao_nao_permitida.push(part.filename + ' - ' + Mensagens.MSG11);
                }
            };

            // A cada arquivo enviado com sucesso, o arquivo é renomeado e adicionado à lista envio_completo para retornar ao usuário
            form.on('file', (field, file) => {
                const extensao = path.extname(file.name);
                const novoNomeDoArquivo = randomString() + '_' + moment().format('YYYYMMDD_HHmmss') + extensao;
                envio_completo.push('/uploads/' + novoNomeDoArquivo);
                fs.rename(file.path, path.join(form.uploadDir, novoNomeDoArquivo));
            });

            // Se ocorrer um erro
            form.on('error', err => {
                res.internalError(err);
            });

            // Depois que todos os arquivos foram enviados,
            // retorna ao usuário a lista de arquivos enviados com sucesso
            // e quais tiveram o envio negado por não ter a extensão permitida
            form.on('end', () => {
                this.otimizarImagens(envio_completo, form.uploadDir);
                res.sendJSON({envio_completo, extensao_nao_permitida});
            });

            // Faz o parse da requisicao que esta chegando
            form.parse(req);

        } catch (err){
            res.internalError(err);
        }
    }//end upload

    /**
     * excluir
     * @param req
     * @param res
     * @method DELETE
     * route /api/upload/:arquivo
     */
    excluir(req, res) {

        const errors = [];
        let {arquivo} = req.params || {};
        let caminho = ``;

        if (!arquivo) errors.push(`arquivo ${Mensagens.MSG04}`);

        if (errors.length > 0) {
            res.badRequest(errors);
            return;
        }

        if ('local' === env || 'development' === env) caminho = path.join(__dirname, '../../../public/uploads/');
        else if ('test' === env || 'production' === env) caminho = path.join(__dirname, '../../../uploads/');

        try {

            if(fs.existsSync(caminho+arquivo)) {
                fs.unlinkSync(caminho+arquivo);
                res.sendJSON([Mensagens.MSG02]);
            } else res.notFound(Mensagens.MSG15);

        } catch (err) {
            res.internalError(err);
        }

    }//end excluir

    /**
     * otimizarImagens
     * @param listaArquivos
     * @param uploadDir
     */
    otimizarImagens(listaArquivos, uploadDir) {

        let listaArquivosOtimizar = [];

        for(let arquivo of listaArquivos) {
            listaArquivosOtimizar.push(`${uploadDir}/${arquivo.split("/")[2]}`);
        }

        imagemin(listaArquivosOtimizar, uploadDir, {
            use: [
                imageminMozjpeg({quality:40}),
                imageminPngquant({quality:40})
            ]
        });

    }//end otimizarImagens

}

module.exports = new UploadController();