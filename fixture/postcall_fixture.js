let fix = {
  "userID": 123,
  "UserPassword": "ABC",
  "DBName": "DBNAME123ABC",
  "fields": [{
    "fieldName": "email",
    "type": "string",
    "required": true,
    "mutable": false
  }, {
    "fieldName": "firstName",
    "type": "string",
    "required": true,
    "mutable": false
  }, {
    "age": "firstName",
    "type": "string",
    "required": false,
    "mutable": true
  }]
}

export default fix;