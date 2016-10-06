let fixture =

  {
    "userID": 123,
    "UserPassword": "ABC",
    "DBName": "DBNAME123ABC",
    "tables": [{
      "tableName": "Person",
      "fields": [{
        "fieldName": "email",
        "type": "STRING",
        "required": true,
        "mutable": false
      }, {
        "fieldName": "firstName",
        "type": "STRING",
        "required": true,
        "mutable": false
      }, {
        "fieldName": "age",
        "type": "INTEGER",
        "required": false,
        "mutable": true
      }]
    }, {
      "tableName": "Post",
      "fields": [{
        "fieldName": "Title",
        "type": "STRING",
        "required": true,
        "mutable": false
      }, {
        "fieldName": "Content",
        "type": "STRING",
        "required": true,
        "mutable": false
      }, ]
    }],
    "relationships": "Person.hasMany(Post);Post.belongsTo(Person);"
  }

module.exports = fixture;