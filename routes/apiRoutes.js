
const router = require("express").Router();
const fs = require('fs');


//code to store database

// 3 routes . get / post / delete
    // getNotes method from datasbase.js --- call all these method
    // post -  call addnotes method 
    // remove notes method 

// read from db.json , create a file inside of db called database.js 

// fs.readfile 
//fs.writeFile

const db = require("../db/db.json");

const uuid = require("uuid/v4");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.send(db);
  });

  app.post("/api/notes", function(req, res) {

    let noteId = uuid();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("your note is created!")
      });
    });
  });

  app.delete("/api/notes/:id", (req, res) => {

    let noteId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);
      const newAllNotes = allNotes.filter(note => note.id != noteId);

      fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("This note is deleted")
      });
    });
  });
};


  module.exports= router;