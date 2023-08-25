import { AppState } from "../AppState.js"
import { notesService } from "../services/NotesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { setHTML } from "../utils/Writer.js"
import { Pop } from "../utils/Pop.js"

function _drawNotes() {
    console.log('drawing notes')
    let notes = AppState.notes
    let content = ''
    notes.forEach(noteObj => content += noteObj.ListTemplate)
    setHTML('notes-list', content)
}

function _drawActive() {
    console.log('drawing active')
    let active = AppState.activeNote
    setHTML('active-note', active.ActiveCaseTemplate)

}


export class NotesController {
    constructor() {
        console.log("this is the notes controller")

        _drawNotes()

        AppState.on('activeNote', _drawActive)

    }

    setActive(caseId) {
        notesService.setActive(caseId)
    }

    saveNote() {
        let textAreaElem = document.querySelector('textarea')
        let updatedBody = textAreaElem.value
        console.log('saving', updatedBody)

        notesService.saveNote(updatedBody)

    }

    createNote() {
        window.event.preventDefault()
        const form = window.event.target
        const formData = getFormData(form)
        console.log('creating new Note', formData)

        notesService.createNote(formData)

    }

    async deleteNote(noteId) {
        // NOTE we use await here to WAIT for the response before we run the next lines of code
        if (await Pop.confirm("Are you sure you want to remove this note?")) {
            console.log('deleting', noteId)
            notesService.deleteNote(noteId)
        }
    }

}

