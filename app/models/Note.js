import { generateId } from "../utils/generateId.js";


export class Note {
    constructor(data) {
        this.id = generateId()
        this.title = data.title
        this.noteBody = data.noteBody || "Create a note..."
        this.noteDate = data.noteDate ? new Date(data.noteDate) : new Date()
        this.updatedNoteDate = data.UpdatedNoteDate ? new Date(data.Updated) : new Date()

    }
    get ListTemplate() {
        return /*html*/`
        <div class="row selectable" onclick="app.NotesController.setActive('${this.id}')">
            <div class="col-12">
              <h5>${this.title}</h5>
            </div>
            <div class="col-12">
              <p>Created On:</p>
              <p>${this.noteDate.toLocaleDateString()}${this.noteDate.toLocaleTimeString()}</p>
            </div>
            <div class="col-12">
              <p>Last Updated On:</p>
              <p>${this.updatedNoteDate.toLocaleDateString()}${this.updatedNoteDate.toLocaleTimeString()}</p>
            </div>
            <div class="col-12">
              <p>${this.ComputeNoteTitle}</p>
            </div>
        </div>
        `
    }



    get ComputeNoteTitle() {
        return this.noteBody.slice(0, 10) + '...'
    }
    get ActiveCaseTemplate() {
        return /*html*/`
<div class="row">
            <div class="col-3">
              <h4>${this.title}</h4>
              <p>Created On:</p>
              <p>${this.noteDate.toLocaleDateString()}${this.noteDate.toLocaleTimeString()}</p>
              <p>Last Updated On:</p>
              <p>${this.updatedNoteDate.toLocaleDateString()}${this.updatedNoteDate.toLocaleTimeString()}</p>
            </div>
            </div>
            <div class="col-9">
              <textarea class="w-100" name="notesBody" id="notesBody" cols="30" rows="15">${this.noteBody}</textarea>
            </div>
            <div class="text-end">
            <button class="btn btn-warning" onclick="app.NotesController.saveNote()">Save Note</button>
            </div>
          </div>
        `
    }
}
