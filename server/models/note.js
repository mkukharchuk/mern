import mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: { type: String },
  text: { type: String, required: true },
  color: { type: String },
  date: { type: String },
});

const Note = mongoose.model('Note', NoteSchema);

export default Note;
