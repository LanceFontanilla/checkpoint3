import { generateId } from "../utils/generateId.js";


export class Note {
  constructor(data) {
    this.id = generateId()
    this.title = data.title || "Please enter a title"
    this.noteBody = data.noteBody || "Create a note..."
    this.noteDate = data.noteDate ? new Date(data.noteDate) : new Date()
    this.updatedNoteDate = data.updatedNoteDate ? new Date(data.noteDate) : new Date()
    this.color = data.color
    this.count = data.count
  }
  get ListTemplate() {
    return /*html*/`

        <div class="row selectable bodyCard-${this.color} p-1" onclick="app.NotesController.setActive('${this.id}')">
            <div class="col-12 titleCard-${this.color}">
              <h5>${this.title}</h5>
            </div>
            <div class="col-12">
              <p>Created On:</p>
              <p>${this.noteDate.toLocaleDateString()} <span> ${this.noteDate.toLocaleTimeString()} </span></p>
            </div>
            
            <div class="text-end py-2 titleCard-${this.color}">
              <button class="btn btn-dark fs-4" onclick="app.NotesController.deleteNote('${this.id}')"><i class="mdi mdi-delete"></i> </button>
            </div>
        </div>
        `
  }

  get ActiveCaseTemplate() {
    return /*html*/`
            <div class="row">
              <div class="col-3 titleCard-${this.color}">
                <h3>${this.title}</h3>
                <p>Created On:</p>
                <p>${this.noteDate.toLocaleDateString()}<span> ${this.noteDate.toLocaleTimeString()}</span></p>
                <p>Last Updated On:</p>
                <p>${this.updatedNoteDate}</p>
                </p>
              </div>
              <div class="col-9 bodyCard-${this.color} p-4">
                <textarea class="w-100" name="noteBody" id="noteBody" cols="30" rows="15">${this.noteBody}</textarea>
                <div class="text-end pt-3">
                  <button class="btn btn-${this.color}" onclick="app.NotesController.saveNote()">Save Note</button>
                </div>
              </div>
            </div>
        `
  }
}
