import { AboutController } from "./controllers/AboutController.js";
import { HomeController } from "./controllers/HomeController.js";
import { NotesController } from "./controllers/NotesController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";

//test
export const router = [
  {
    path: '',
    controller: NotesController,
    //     view: /*html*/`
    //  notes
    //     `
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]