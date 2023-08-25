import { AppState } from "../AppState.js"
import { notesService } from "../services/NotesService.js"
import { setHTML } from "../utils/Writer.js"



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
}

