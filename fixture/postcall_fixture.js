let fix = {
  "userID": 123,
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

// [{
//     "fieldName": 'email',
//     "type": string,
//     "required": true,
//     "mutable": false
//   },
//   {
//     "fieldName": 'firstName',
//     "type": string,
//     "required": true,
//     "mutable": false
//   },
//   {
//     "age": 'firstName',
//     "type": "string",
//     "required": false,
//     "mutable": true
//   }
// ]

export default fix;