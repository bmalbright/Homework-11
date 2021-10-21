const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
//const db = require('./db/db.json');

//const PORT = process.env.port || 3000;
const PORT = 3000;


const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes/.html'))
);

//GET request for Notes
app.get('api/notes', (req, res) => {
  readFromFile('/db/db.json').then((data) => 
  res.json(JSON.parse(data)))
});


// Stuff I got from Chuck
// app.delete('api/db.json/:id', (req,res) => {
//   if (req.params.id) {
//     console.info(`${req.method} request received to get a single note`);
//     const notesId = req.params.id;
//     for (let i = 0, i < db.length; i++) {

//     }
//   }
// })




















//POST request to add a note
app.post('/api/notes', (req, res) => {
  //console logs that a request was received
  console.info(`${req.method} request received to add a note`);
  //Prepares a response object to return
  let response;
  const { title, text } = req.body;


if ( title && text ) {
  //new variable for notes that area generated
  const newNote = {
    title, 
    text, 
    id: uuidv4(),
  }

  response = {
    status: 'success',
    body: newNote,
  };

readAndAppend(newNote, './db/db.json');

console.log(response);
res.status(201).json(response);
} else {
  res.status(500).json('Error in posting Note');
}
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);