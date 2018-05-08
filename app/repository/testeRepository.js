const db = require('../classes/database');

/**
 * TesteRepository
 */
class TesteRepository {

    /**
     * executar
     * @return {Promise<void>}
     */
    async executar() {
        
        return await db.transaction(async function (trx) {

            try {

                var itens = [
                    {nome: 'Nome 1'},
                    {nome: 'Nome 2'},
                    {nome: 'Nome 3'}
                ];

                const itemCriado = await trx
                    .insert({nome: 'Nome completo'}, 'id')
                    .into('teste1');

                await Promise.all(itens.map(async function(item) {
                    item.id_teste1 = itemCriado[0];
                    await trx.insert(item).into('teste2');
                }));

                return itemCriado;

            } catch (err) {
                throw err;
            }

        }).then(function(resultado) {
            return resultado;
        }).catch(function(err) {
            throw err;
        });
        
    }//end executar
    
}//end TesteRepository

module.exports = new TesteRepository();