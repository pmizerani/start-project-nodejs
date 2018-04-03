const db = require('./database');

class Model {

    /**
     * constructor
     * @param tabela
     */
    constructor(tabela) {
        this.table = tabela;
        this.db = db;
    }

    /**
     * buscar
     * @param whereArray
     * @param limit
     * @param pagina
     * @param orderByColuna
     * @param orderByDirecao
     */
    buscar(whereArray = null, limit = 0, pagina = 0,  orderByColuna = null, orderByDirecao = 'asc') {

        const query = this.db.select('*').from(this.table);

        if(whereArray) {

            let where = ``;
            let valores = [];

            whereArray.forEach(element => {

                let campo = Object.keys(element);
                if(1 < where.length) where += ` AND `;
                if(isNaN(parseInt(element[campo[0]]))) {
                    where += ` ${campo[0]} LIKE ? `;
                    valores.push(`%${element[campo[0]]}%`);
                } else {
                    where += ` ${campo[0]} = ? `;
                    valores.push(`${parseInt(element[campo[0]])}`);
                }

            });

            query.whereRaw(where, valores);

        }

        if (orderByColuna) query.orderBy(orderByColuna, orderByDirecao);

        if(0 !== parseInt(limit)) {

            limit = parseInt(limit);
            pagina = 0 === parseInt(pagina) ? 1 : parseInt(pagina);

            query.limit(limit);
            query.offset((limit*pagina)-limit);

        }

        return query;
    }

    /**
     * buscarPorID
     * @param where
     */
    buscarPorID(where = null) {

        const query = this.db.select('*').from(this.table);
        if(where) query.where(where);

        return query;

    }

    /**
     * inserir
     * @param data
     */
    inserir(data) {
        return this.db(this.table)
        .returning('id')
        .insert(data);
    }

    /**
     * atualizar
     * @param data
     * @param where
     */
    atualizar(data, where = null) {
        const db = this.db(this.table);
        if (where) db.where(where);
        return db.update(data);
    }

    /**
     * excluir
     * @param where
     */
    excluir(where) {
        return this.db(this.table)
        .where(where)
        .del();
    }

    /**
     * count
     * @param whereArray
     * @return {*}
     */
    count(whereArray = null) {

        let query = this.db.count('* as total').from(this.table);

        if(whereArray) {

            let where = ``;
            let valores = [];

            whereArray.forEach(element => {

                let campo = Object.keys(element);
                if(1 < where.length) where += ` AND `;
                if(isNaN(parseInt(element[campo[0]]))) {
                    where += ` ${campo[0]} LIKE ? `;
                    valores.push(`%${element[campo[0]]}%`);
                } else {
                    where += ` ${campo[0]} = ? `;
                    valores.push(`${parseInt(element[campo[0]])}`);
                }

            });

            query.whereRaw(where, valores);

        }

        return query;
    }
}

module.exports = Model;