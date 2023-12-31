import { Todo } from './Todo';
import { Project } from './Project';
import { displayController } from './DOM';
import './style.css';
import { session } from './Session';

displayController.renderInitialLayout();
displayController.populateProjects(session.projects);
displayController.populateTodos(session.projects[session.activeProject].todos);
displayController.initClickHandlers();
