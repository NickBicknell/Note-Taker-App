const api = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

api.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

api.post('/api/notes', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json');
    fs.readFile(dbPath, 'utf8', (err, fileData) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }

        console.log("FILE DATA: ", fileData);
        const data = JSON.parse(fileData) || [];

        let note = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4()
        };
        data.push(note);
        fs.writeFile(dbPath, JSON.stringify(data), () => res.json(data));
    });

});

api.delete('/api/notes/:id', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json');
    let data = JSON.parse(fs.readFile(dbPath, 'utf8', (err, fileData) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
    }));
    let delNote = data.filter(item => item.id !== req.params.id);
    fs.writeFile(dbPath, 'utf8', JSON.stringify(delNote));
    res.json(delNote);
});

module.exports = api;