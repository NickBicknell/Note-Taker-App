// required dependencies
const html = require('express').Router();
const path = require('path');

// get request for the html notes page
html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// get request for all other/index html page 
html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// exports html router
module.exports = html;