import { Todo } from './Todo';
import { Project } from './Project';
import { displayController } from './DOM';
import './style.css';
import { session } from './session';

displayController.renderInitialLayout();
displayController.populateProjects(session.projects);
displayController.populateTodos(session.projects[0].todos);
displayController.initClickHandlers();
