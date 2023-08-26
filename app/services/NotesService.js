import { AppState } from "../AppState.js"
import { saveState } from "../utils/Store.js"
import { Note } from "../models/Note.js"

function _saveNotes() {
    saveState('notes', AppState.notes)
    console.log('saveNotes function')
}

function _noteCount() {
    let noteCount = AppState.notes.length
    document.getElementById('noteCount').innerText = `Number of Notes: ${noteCount}`
    console.log(noteCount)
}

function _updateNoteDate() {
    const date = Date.now()
    const dt = new Date(date)
    AppState.activeNote.updatedNoteDate = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
    console.log('this is the updated note date', AppState.activeNote.updatedNoteDate)
}


class NotesService {

    setActive(noteId) {
        let foundNote = AppState.notes.find(noteObj => noteObj.id == noteId)
        console.log('setting active')
        AppState.activeNote = foundNote
        _noteCount()
    }

    saveNote(updatedBody) {
        let active = AppState.activeNote
        active.noteBody = updatedBody
        saveState('notes', AppState.notes)
        console.log('saving note from notes services')
        AppState.emit('activeNote')
        _noteCount()
        _updateNoteDate()
        _saveNotes()

    }



    createNote(formData) {
        let newNote = new Note(formData)
        AppState.notes.push(newNote)
        console.log(newNote, 'creating new note')
        AppState.emit('notes')

        AppState.activeNote = newNote
        _saveNotes()
        _noteCount()
    }

    deleteNote(noteId) {
        // console.log('delete note service', noteId)
        let foundNote = AppState.notes.find(note => note.id == noteId)
        let filteredNoteArr = AppState.notes.filter(car => car.id != noteId)
        console.log(filteredNoteArr, "deleting note")
        AppState.notes = filteredNoteArr
        AppState.emit('notes')
        _saveNotes()
        _noteCount()
    }



}


export const notesService = new NotesService()