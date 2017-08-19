let Sequelize = require('sequelize');

/**
 * @param {*} app
 */
module.exports = (app) => {

      /*//declare model
      let Model = app.sequelize.define('table_name', {
            id: {
                  type: Sequelize.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false
            },
            id_foreign_key: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: {
                        key: 'id',
                        model: 'table_name'
                  }
            },
            string: {
                  type: Sequelize.STRING(60),
                  allowNull: false
            },
            date: {
                  type: Sequelize.DATE,
                  allowNull: false
            },
            decimal: {
                  type: Sequelize.DECIMAL(15, 2),
                  allowNull: false
            }
      }, {
            //configure to not create those fields on table
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
            freezeTableName: true,
            tableName: 'table_name'
      });

      //return
      return Model;*/

};
