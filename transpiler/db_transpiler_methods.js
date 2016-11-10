let dbTransMethods = {};

dbTransMethods.createFieldsBlock = function(fieldArr) {
  let output = '';
  fieldArr.forEach((element, index, array) => {
    output = output + `${element.fieldName}: {
      type: Sequelize.${element.type},
      allowNull: ${!element.required}
    },\n`
  });
  return output
};

dbTransMethods.createTable = function(table) {
  let defineBlock = `const ${table.tableName} = Conn.define('${table.tableName.toLowerCase()}', {\n${this.createFieldsBlock(table.fields)}});\n\n`
  return defineBlock;
};

dbTransMethods.createTablesBlock = function(tables) {
  let output = '';
  tables.forEach((element, index, array) => {
    output = output + this.createTable(element);
  });
  return output;
};

dbTransMethods.createDependenciesblock = function(userDefinedSchema) {
  return `import Sequelize from 'sequelize';
import _ from 'lodash';\n\n`
};

dbTransMethods.createConnectionsBlock = function(userDefinedSchema) {
  return `const Conn = new Sequelize(
  '${userDefinedSchema.userID}', //name of users individual db.
  null, //replace later with process.env.NODE_DBUSERNAME,
  null //replace later with process.env.NODE_DBPASSWORD
  , { 
    dialect: 'postgres', //always postgres
    host: process.env.NODE_DBHOST
  }
);\n\n`
};

export default dbTransMethods;