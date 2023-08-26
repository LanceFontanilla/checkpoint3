import { AppState } from "../AppState.js"
import { saveState } from "../utils/Store.js"
import { Note } from "../models/Note.js"

function _saveNotes() {
    saveState('notes', AppState.notes)
    console.log('saveNotes function')
}

class NotesService {

    setActive(noteId) {
        let foundNote = AppState.notes.find(noteObj => noteObj.id == noteId)
        console.log('setting active')
        AppState.activeNote = foundNote
    }

    saveNote(updatedBody) {
        let active = AppState.activeNote
        active.noteBody = updatedBody
        saveState('notes', AppState.notes)
        console.log('saving note from notes services')
        AppState.emit('activeNote')

        _saveNotes()
    }

    createNote(formData) {
        let newNote = new Note(formData)
        AppState.notes.push(newNote)
        console.log(newNote, 'creating new note')
        AppState.emit('notes')

        AppState.activeNote = newNote
        _saveNotes()
    }

    deleteNote(noteId) {
        // console.log('delete note service', noteId)
        let foundNote = AppState.notes.find(note => note.id == noteId)
        let filteredNoteArr = AppState.notes.filter(car => car.id != noteId)
        console.log(filteredNoteArr, "deleting note")
        AppState.notes = filteredNoteArr
        AppState.emit('notes')
        _saveNotes()

    }

}


export const notesService = new NotesService()