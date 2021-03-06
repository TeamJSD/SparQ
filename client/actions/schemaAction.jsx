import axios from 'axios';

function createFixture(data) {

	let values = Object.assign([], data)

  let fixture = {
    "userID": '',
    "UserPassword": '',
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


  //loop through large array full of smaller arrays that represent each form in schema
  for(let i = 0; i < values.length; i++) {
    fixture.tables.push(Object.assign({}, tableValues))

    //set the name of the table
    fixture.tables[i].tableName = values[i][0]
    
    //variable for relationship of the table
    const relations = values[i].slice(-2)

    //variable for length to save calculation time
    let leng = values[i].length - 2

    let temp = []

    for(let j = 1; j < leng; j += 4) {

      //account for empty field names
      if(values[i][j] !== '') {
        let field = Object.assign({}, fieldValues)
        
        //insert all the appropriate values for the specific field
        field.fieldName = values[i][j][0].toLowerCase() + values[i][j].slice(1);
        field.type = values[i][j + 1];
        field.required = values[i][j + 2];
        field.mutable = values[i][j + 3];

        temp.push(field)
      }
    }

    //account for relationships
    if(relations[0] !== 'none') {
      fixture.hasRelationships = true;
      fixture.relationships.push({"Master": values[i][0], "Slave": relations[1], "Verb": relations[0]})
    }

    fixture.tables[i].fields = temp
  }

    let id = (() => {
      var value = "; " + document.cookie;
      var parts = value.split("; " + 'devId' + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    })

    const devId = id()


  fixture.userID = devId;
  fixture.DBName = fixture.userID;

  //create relationship strings
  fixture.relationships.map((item) => {
    let str = item.Master + '.' + item.Verb + '(' + item.Slave + ');\n' 
    fixture.relationshipsString += str;
  })

  //console.log(fixture, 'fixture')

 return axios.post('/edit', fixture)
	.then((response) => console.log('Successfully Saved'))
	.catch((err) => console.log(err));
}


export default createFixture;