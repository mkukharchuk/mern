import mongoose from "mongoose";

import '../models/Note';

const Note = mongoose.model('Note');

const connectionUrl = "mongodb://admin:admin1234@ds253804.mlab.com:53804/notes"

export function setUpConnection(){
    console.log('ccc');
    mongoose.connect(connectionUrl, ()=>{console.log('db connected')});
}

export function listNotes() {
    return Note.find();
}

export function createNote(data) {
    const note = new Note({
        title: data.title,
        text : data.text,
        color: data.colorm,
        date : data.date
    })
    
    return note.save();
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}