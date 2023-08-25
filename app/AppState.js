import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"
import { Note } from "./models/Note.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])


  /** @type {import('./models/Note.js').Note[]} */
  //notes = loadState('notes', [Note])


  notes = [
    new Note(
      {
        title: "NOTE Number 1",
        noteBody: "This is my first note!"

      }),
    new Note({
      title: "NOTE Number 2",
      noteBody: "This is my second note."
    }
    ),
    new Note({
      title: "NOTE Number 3",
      noteBody: "This is my third note."
    }
    ),
  ]






  /** @type {import('./models/Note.js').Note[null]} */
  activeNote = null



  // NOTE Used to load initial data
  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
