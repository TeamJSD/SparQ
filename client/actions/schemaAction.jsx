import axios from 'axios';

function createFixture(data) {

	let values = data;
	let chunk = {
			"fieldName": "firstName",
      "type": "STRING",
      "required": true,
      "mutable": false
      }

 let fixture = {
    "userID": 123,
    "UserPassword": 123,
    "DBName": "DBNAME123ABC",
    "tables": [{
      "tableName": "Person",
      "fields": []
    }],
    "hasRelationships": false,
    "relationships": [],
    "relationshipsString": ""
  }

  fixture["tables"][0]["tableName"] = values[0]

  let fields = fixture["tables"][0]["fields"]

  //input number of field values
  for(let i = 1; i < values.length; i+= 2) {
  	fields.push(Object.assign({}, chunk))
  }

  //fill in the field names
  for(let i = 0; i < fields.length; i++) {
  	fields[i].fieldName = values[(i * 2) + 1]
  }

  //fill in the field types
  for(let i = 0; i < fields.length; i++) {
		fields[i].type = values[(i * 2) + 2]
	}

  console.log(fixture)

 return axios.post('http://localhost:3000/edit', fixture)
	.then((response) => console.log(response))
	.catch((err) => console.log(err));
}


export default createFixture;