import { Todo } from './Todo';
import { Project } from './Project';
import { displayController } from './DOM';
import './style.css';

const myProjects = [];
myProjects.push(new Project('My First Project'));

displayController().renderInitialLayout();
displayController().populateProjects(myProjects);
