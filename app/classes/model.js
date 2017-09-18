const db = require('./database');

class Model {
    constructor(table) {
        this.table = table;
        this.db = db;
    }

    find(where = null, orderByColumn = null, orderByDirection = 'asc') {
        const query = this.db.select('*').from(this.table);
        
        if (where) query.where(where);
        if (orderByColumn) query.orderBy(orderByColumn, orderByDirection);

        return query;
    }

    insert(data) {
        return this.db(this.table)
        .returning('id')
        .insert(data);
    }

    update(data, where = null) {
        const db = this.db(this.table);
        if (where) db.where(where);
        return db.update(data);
    }

    delete(where) {
        return this.db(this.table)
        .where(where)
        .del();
    }    
}

module.exports = Model;