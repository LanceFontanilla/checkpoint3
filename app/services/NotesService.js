import { AppState } from "../AppState.js"
import { saveState } from "../utils/Store.js"


function _saveNotes() {
    saveState('notes', AppState.notes)
}

class NotesService {

    setActive(noteId) {
        let foundNote = AppState.notes.find(noteObj => noteObj.id == noteId)
        console.log('setting active', foundNote)
        AppState.activeNote = foundNote
    }

    saveNote(updatedBody) {
        let active = AppState.activeNote
        active.noteBody = updatedBody
        AppState.emit('activeNote')

        _saveNotes()
    }
}

export const notesService = new NotesService()