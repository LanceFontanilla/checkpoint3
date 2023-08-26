import { AppState } from "../AppState.js"
import { notesService } from "../services/NotesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { setHTML } from "../utils/Writer.js"
import { Pop } from "../utils/Pop.js"

function _drawNotes() {
    let notes = AppState.notes
    let content = ''
    notes.forEach(noteObj => content += noteObj.ListTemplate)
    setHTML('notes-list', content)
    console.log('drawing notes')
}

function _drawActive() {
    let active = AppState.activeNote
    setHTML('active-note', active.ActiveCaseTemplate)

    console.log('drawing active')
}


export class NotesController {
    constructor() {

        _drawNotes()

        AppState.on('activeNote', _drawActive)
        AppState.on('notes', _drawNotes)
        console.log("this is the notes controller")
    }

    setActive(caseId) {
        notesService.setActive(caseId)

        console.log('settingActive from NotesController')
    }

    saveNote() {
        let textAreaElem = document.querySelector('textarea')
        let updatedBody = textAreaElem.value
        console.log('saving', updatedBody)

        notesService.saveNote(updatedBody)
        _drawNotes()
    }

    createNote() {
        window.event.preventDefault()
        const form = window.event.target
        const formData = getFormData(form)
        console.log('creating new Note', formData)
        notesService.createNote(formData)

        form.reset()
        _drawNotes()

    }

    async deleteNote(noteId) {
        // NOTE we use await here to WAIT for the response before we run the next lines of code
        if (await Pop.confirm("Are you sure you want to remove this note?")) {
            console.log('deleting', noteId)
            notesService.deleteNote(noteId)
            _drawNotes()
            location.reload()

        }
    }

}

