import { Todo } from './Todo';
import { Project } from './Project';
import { displayController } from './DOM';
import './style.css';

const myProjects = [];
myProjects.push(new Project('My First Project'));
myProjects.push(new Project('My Second Project'));
myProjects[0].todos.push(
  new Todo('lakjsdlkfj', 'kljslkfdjksldf', 'Aug 7', 'high')
);
myProjects[0].addTodo(
  new Todo('kljsdflkj', 'jakshdfkjhsajkfdhkjdshf', 'Aug 9', 'low')
);

displayController.renderInitialLayout();
displayController.populateProjects(myProjects);
displayController.populateTodos(myProjects[0].todos);
displayController.initClickHandlers();
