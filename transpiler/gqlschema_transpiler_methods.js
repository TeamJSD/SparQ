let GQLTransMethods = {};

//compiles import block in support of GQL dependencies 
GQLTransMethods.GQLDepBuilder = function(userID) {
  return `import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLNonNull } from 'graphql'; import Db from './../devUserDbs/${userID}_db.js';\n\n`
};

//compiles relationships block. 
GQLTransMethods.GQLSchemaRelationsBlock = function(rels) {
  return ` ${rels.Slave.toLowerCase()}: { type: new GraphQLList(${rels.Slave}), resolve(${rels.Master.toLowerCase()}) { return ${rels.Master.toLowerCase()}.get${rels.Slave}s(); } }`
};

//compiles schema fields block by invoking prior functions. 
GQLTransMethods.GQLSchemaFieldsBlock = function(userSchema, fieldArr, tableName) {
  let relationshipFieldBlock = ``;
  //invokes relationship function if relationships are necessary.
  if (userSchema.hasRelationships) {
    userSchema.relationships.forEach((element, index, array) => {
      if (tableName === element.Master) {
        relationshipFieldBlock = this.GQLSchemaRelationsBlock(element);
      }
    });
  };
  //adds id field.
  let output = `id: {\ntype: GraphQLInt,\nresolve(${tableName.toLowerCase()}) { \nreturn ${tableName.toLowerCase()}.id; } },`;
  let GQLType = {
    "STRING": "GraphQLString",
    "INTEGER": "GraphQLInt",
    "BOOLEAN": "GraphQLBoolean",
  };
  //adds each field to the block with necessary GQL type. 
  fieldArr.forEach((element, index, array) => {
    output = output + `${element.fieldName}: { type: ${GQLType[element.type]}, resolve(${tableName.toLowerCase()}) { return ${tableName.toLowerCase()}.${element.fieldName}; } },\n`
  });
  return output + relationshipFieldBlock + `\n`;
};

GQLTransMethods.GQLSchemaTableBlock = function(userSchema, table) {
  let defineBlock = `const ${table.tableName} = new GraphQLObjectType({ name: '${table.tableName}', description: 'This represents a ${table.tableName}', fields: () => { return { ${this.GQLSchemaFieldsBlock(userSchema,table.fields,table.tableName)}} } });\n\n`
  return defineBlock;
};

//combines all schema tables blocks
GQLTransMethods.GQLDBSchema = function(userSchema) {
  let output = '';
  userSchema.tables.forEach((element, index, array) => {
    output = output + this.GQLSchemaTableBlock(userSchema, element);
  });
  return output;
};

//compiles fields by traversing all tables. 
GQLTransMethods.GQLQueryTablesBlock = function(tables) {
  let output = '';
  tables.forEach((element, index, array) => {
    output = output + `${element.tableName.toLowerCase()}: { type: new GraphQLList(${element.tableName}), resolve(root, args) { return Db.models.${element.tableName.toLowerCase()}.findAll({ where: args }); } },`
  });
  return output
};

//combines all the tables and fields blocks. 
GQLTransMethods.GQLQueryBlock = function(data) {
  let QueryBlock = `const Query = new GraphQLObjectType({ name: 'Query', description: 'this is a root query', fields: () => { return { ${this.GQLQueryTablesBlock(data.tables)} } } });\n\n`;
  return QueryBlock
};

//compiles all argument fields for each mutation if field is indicated as mutable. 
GQLTransMethods.GQLMutationArgsFieldBuilder = function(fields, tableName, userSchema, hasRelations) {
  let fieldsBlock = ``;
  let GQLType = {
    "STRING": "GraphQLString",
    "INTEGER": "GraphQLInt",
    "BOOLEAN": "GraphQLBoolean",
  };
  if (hasRelations) {
    userSchema.relationships.forEach(function(element) {
      if (element.Verb === "belongsTo" && element.Master === tableName) {
        fieldsBlock += `id: { \ntype: new GraphQLNonNull(GraphQLInt),\n },`
      }
    });
  };
  fields.forEach(function(element) {
    fieldsBlock += `${element.fieldName}: {\n type: new GraphQLNonNull \n (${GQLType[element.type]}),\n },`
  });
  return fieldsBlock;
};

//creates resolver block for each table. 
GQLTransMethods.GQLMutationResolverBuilder = function(fields, tableName, userSchema, hasRelations) {
  let resolverFields = ``;
  if (hasRelations) {
    userSchema.relationships.forEach(function(element) {
      if (element.Verb === "belongsTo" && element.Master === tableName) {
        resolverFields += `${element.Slave.toLowerCase()}Id: args.id,`
      }
    });
  }
  fields.forEach(function(element) {
    resolverFields += `${element.fieldName}: args.${element.fieldName},`
  });
  let resolverBlock = `resolve(_, args) {\n return Db.models.${tableName.toLowerCase()}.create({\n ${resolverFields} }); }`;
  return resolverBlock;
};

//combines all mutation blocks in to single block. 
GQLTransMethods.GQLMutationBlock = function(userSchema) {
  let tables = ``;
  userSchema.tables.forEach(function(element) {
    tables += `\n add${element.tableName}: { type: ${element.tableName}, args: {\n ${GQLTransMethods.GQLMutationArgsFieldBuilder(element.fields,element.tableName,userSchema,userSchema.hasRelationships)}}, ${GQLTransMethods.GQLMutationResolverBuilder(element.fields,element.tableName,userSchema,userSchema.hasRelationships)}},`

  });
  let mutationBlock = `const Mutation = new GraphQLObjectType({\nname: 'Mutation',\ndescription: 'This is a mutation, functions that create things',\nfields() {\nreturn {${tables}}}\n})`
  return mutationBlock;
};

export default GQLTransMethods;