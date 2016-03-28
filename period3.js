/**
 
 Explain generally what is meant by a NoSQL database

A NoSQL databse is a mechanism to store and retrieve data (much like any database). What makes NoSQL databases unique compared
to SQL databases or other databases in general is that it is created to support agility. NoSQL is a typed as a document database,
meaning that it steps away from relational database structures. It is built to support large amounts of new and changing data. 

Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional
relational SQL Database like MySQL.

NoSQL databases have many different types of data in them unlike a classic SQL database, NoSQL adapts to 
cahnge in terms of it expanding horizontally, meaning that if you were to add more servers to your database then NoSQL would 
accomodate the new server and spread the data to best fit the new setup. Unlike SQL in which you would have to add onto the current
server rather than being able to add new ones in; as the data does not accomodate new servers. NoSQL does not have to store data in
tables. NoSql sacrificies some harddrive space for flexibility. 

Explain how databases like MongoDB and redis would be classified in the NoSQL world 

They are classified as document databases. 

Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB 
One might consider to use Mongoose if they are more comfortable with ORM or ODM. Meaning that data from the database is translated into JS objects. The Mongoose library simplifies this process.

Explain, using relevant examples, the strategy for querying MongoDB (all CRUD operations) 
Create
To insert to the database you have to call the db then the .collection you want to access and then the command .insert().
*/
db.inventory.insert(
   {
     item: "ABC1",
     details: {
        model: "14Q3",
        manufacturer: "XYZ Company"
     },
     stock: [ { size: "S", qty: 25 }, { size: "M", qty: 50 } ],
     category: "clothing"
   }
)
/*
Read
To read from the database you have to call the db then the .collection you want to access and then the command .find() or .findOne().
*/
db.collection.find({ <field>: <value> });
/*
Update
To update data from the database you have to call the db then the .collection you want to access and then the command .update().
The $set command is where you will update the information in a syntax of { $set: { <field1>: <value1>,<field2>: <value2> } }
*/
db.inventory.update(
    { item: "Computer" },
    {
      $set: {
        category: "Electronics",
        details: { model: "Mac", manufacturer: "Apple" }
      },
      $currentDate: { lastModified: true }
    }
)
/*
Delete
To delete data from the database you have to call the db then the .collection you want to access and then the command .remove(). This removes a whole document with type 
*/
db.collection.remove( { type : "computer" } )
/*
Demonstrate, using a REST-API, how to perform all CRUD operations on a MongoDB 
Explain the benefits from using Mongoose, and provide an example involving all CRUD operations 
//We initially have to create the mongoose Schema in order to be able to use it. Then we have to make it a mongoose model, so that we can use it throughout the application.
*/s
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test3');
var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});
var Todo = mongoose.model('Todo', TodoSchema);

//CREATE
Todo.create({name: 'Master Javscript', completed: true, note: 'Getting better everyday'}, function(err, todo){
    if(err) console.log(err);
    else console.log(todo);
});

//READ
Todo.find(function (err, todos) {
  if (err) return console.error(err);
  console.log(todos)
});
//With query
Todo.find({completed: true }, (function (err, todos) {
  if (err) return console.error(err);
  console.log(todos));

//UPDATE
// Model.update(conditions/query, update, [options], [callback])
// updated 'completed: false' docs to 'completed: true'.

Todo.update({ completed: false }, { completed: true }, { multi: true }, callback);

//DELETE

Todo.remove({completed: true}, callback);

/*
Explain how redis "fits" into the NoSQL world, and provide an example of how to use it.

Redis is a tool used to query to any type of database. It fits into the NoSQL world as Redis can create queries for document-oriented systems


Explain, using a relevant example, how redis (or a similar) can increase scalability (drastic) for a server using server side sessions 

By storing the values in memory on the client PC we can keep session information up to date and access it instantly. We can also persist 
the data if needed. A timer can be applied so that the information is deleted after a certain time.


Explain, using a relevant example, a full MEAN application including relevant test cases to test the REST-API (not on the production database) 
Do: 

Complete (as much as you have time for) the exercises, part-3 of the game proposal and/ or, use your own ideas/examples to come up with examples for the questions stated above 

*/