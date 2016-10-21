import axios from 'axios';

function createFixture(data) {

	let values = Object.assign([], data)

  let fixture = {
    "userID": 123,
    "UserPassword": 123,
    "DBName": "DBNAME123ABC",
    "tables": [],
    "hasRelationships": false,
    "relationships": [],
    "relationshipsString": ""
  }

  let tableValues = {
    "tableName": "",
    "fields": []
  }

  let fieldValues = {
    "fieldName": "",
    "type": "",
    "required": false,
    "mutable": false
  }

  //loop through large array full of smaller arrays represent each form in schema
  for(let i = 0; i < values.length; i++) {
    fixture.tables.push(Object.assign({}, tableValues))

    //set the name of the table
    fixture.tables[i].tableName = values[i][0]
    
    //variable for relationship of the table
    const relations = values[i].splice(-2)

    //variable for length to save calculation time
    let leng = values[i].length

    let temp = []

    for(let j = 1; j < leng; j += 4) {
      let field = Object.assign({}, fieldValues)
      
      //insert all the appropriate values for the specific field
      field.fieldName = values[i][j];
      field.type = values[i][j + 1];
      field.required = values[i][j + 2];
      field.mutable = values[i][j + 3];

      temp.push(field)
    }

    if(relations[0] !== 'none') {
      fixture.hasRelationships = true;
      fixture.relationships.push({"Master": values[i][0], "Slave": relations[0], "Verb": relations[1]})
    }

    fixture.tables[i].fields = temp
  }

  console.log(fixture, 'fixture')

 // return axios.post('/edit', fixture)
	// .then((response) => console.log('fixture post request success'))
	// .catch((err) => console.log(err));
}


export default createFixture;