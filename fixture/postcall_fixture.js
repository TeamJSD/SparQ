let fixture =

  {
    "userID": "z1y2x3",
    "UserPassword": "",
    "DBName": "",
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
      }]
    }],
    "hasRelationships": true,
    "relationships": [{
        "Master": "Person",
        "Slave": "Post",
        "Verb": "hasMany"
      },
      {
        "Master": "Post",
        "Verb": "belongsTo",
        "Slave": "Person"
      }
    ],
    "relationshipsString": "Person.hasMany(Post);\nPost.belongsTo(Person);"
  }

module.exports = fixture;