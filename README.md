# SparQ

![logo](http://i.imgur.com/K89wwHQ.png)

SparQ is an open-source project providing user the ability to create a full functional GraphQL enabled back-end in minutes. 

SparQ is currently in Alpha. We welcome any feedback you might have. 

###Usage
1. Sign Up / Login
2. Define table names
3. Define table fields
4. Click Save
5. Enter table relationships
6. Click Save
7. Navigate to client to perform queries

### Examples

**Example:** query to retrieve data. 
Table Name: Person
Data: firstName, age, email, id
  {
    person {
      firstName
      age
      email
      id
    }
  }


**Example:** mutation to create new person. 
Table Name: Person
Data: firstName, age, email, id
 mutation addPersonExample {
  addPerson(firstName: "Erlich", age: 30, email: "erlich@bachman.com") {
    id
    firstName
  }
}

### Contributors

[Derrick Ung](https://github.com/derrickrung)

[Jayce Tan](https://github.com/jaycetan)

[Stephen Langdon](https://github.com/stphnlngdncoding)
