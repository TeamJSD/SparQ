let fixture =

  {
    "userID": "z1y2x3",
    "UserPassword": "",
    "DBName": "",
    "tables": [{
      "tableName": "Book",
      "fields": [{
        "fieldName": "title",
        "type": "STRING",
        "required": true,
        "mutable": false
      }, {
        "fieldName": "author",
        "type": "STRING",
        "required": true,
        "mutable": false
      }]
    }, {
      "tableName": "Booklet",
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
    "hasRelationships": false,
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