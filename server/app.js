import express from "express";
import bodyParser from 'body-parser';

import * as db from './utils/dataBaseUtils.js';

db.setUpConnection();

const app = express();

app.use( bodyParser.json() );

app.get('/notes', (req, res)=>{
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res)=>{
    db.createNote(req.body).then(data => res.send(data))
});

app.delete('/notes/:id', (req,res)=>{
    db.deleteNote(req.params.id).then(data => res.send(data));
})

app.listen(7000, ()=> {console.log(`server on 7000`)});

