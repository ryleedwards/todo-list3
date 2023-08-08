import { Todo } from './Todo';
import { Project } from './Project';

const displayController = (() => {
  const renderInitialLayout = () => {
    //base container
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    //sidebar + project container
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    const sideProjects = document.createElement('div');
    sideProjects.classList.add('side-project-container');
    const pProjectsHeader = document.createElement('p');
    pProjectsHeader.innerText = 'Projects';
    sideProjects.appendChild(pProjectsHeader);
    sidebar.appendChild(sideProjects);
    container.appendChild(sidebar);

    //main
    const main = document.createElement('div');
    main.classList.add('main');
    container.appendChild(main);
    //main header to display active project
    const mainHeader = document.createElement('div');
    mainHeader.classList.add('main-header');
    main.appendChild(mainHeader);
    //text display for active project
    const pActiveProjectTitle = document.createElement('p');
    mainHeader.appendChild(pActiveProjectTitle);
    pActiveProjectTitle.id = 'active-project-title';
    pActiveProjectTitle.innerText = 'Active Project'; // POTENTIALLY REMOVE IN FUTURE
    //parent container for todos to be inserted into
    const todosContainer = document.createElement('div');
    todosContainer.classList.add('master-todo-container');
    main.appendChild(todosContainer);

    //btn to add todos
    const btnAddTodo = document.createElement('button');
    btnAddTodo.classList.add('btn', 'addTodo');
    btnAddTodo.innerText = 'Add Todo';
    main.appendChild(btnAddTodo);
  };

  const createProjectHTML = (project) => {
    const projDiv = document.createElement('div');
    projDiv.classList.add('project');
    const sideProjects = document.querySelector('.side-project-container');
    sideProjects.appendChild(projDiv);

    const pProject = document.createElement('p');
    projDiv.appendChild(pProject);
    pProject.innerText = project.title;
  };

  const populateProjects = (projectList) => {
    projectList.forEach((project) => {
      createProjectHTML(project);
    });
  };

  const createTodoHTML = (todo, index) => {
    //todo container
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    document
      .querySelector('div.master-todo-container')
      .appendChild(todoContainer);
    //todo header (incl. checkbox, todo-title, and priority)
    const todoHeadDiv = document.createElement('div');
    todoContainer.appendChild(todoHeadDiv);
    //checkbox
    const cbInput = document.createElement('input');
    todoHeadDiv.appendChild(cbInput);
    cbInput.type = 'checkbox';
    cbInput.name = 'togglecomplete';
    cbInput.id = `todo${index}`;
    //title
    const pTitle = document.createElement('p');
    pTitle.classList.add('todo-title');
    todoHeadDiv.appendChild(pTitle);
    pTitle.innerText = todo.title;
    //priority
    const pPriority = document.createElement('p');
    pPriority.classList.add('priority');
    todoHeadDiv.appendChild(pPriority);
    pPriority.innerText = todo.priority;
    //description (+supporting div)
    const divDescription = document.createElement('div');
    todoContainer.appendChild(divDescription);
    const pDescription = document.createElement('p');
    pDescription.classList.add('todo-description');
    divDescription.appendChild(pDescription);
    pDescription.innerText = todo.description;
    //dueDate (+supporting div)
    const divDueDate = document.createElement('div');
    todoContainer.appendChild(divDueDate);
    const pDueDate = document.createElement('p');
    pDueDate.classList.add('todo-duedate');
    divDueDate.appendChild(pDueDate);
    pDueDate.innerText = todo.dueDate;
  };

  const populateTodos = (projectTodos) => {
    let index = 0;
    projectTodos.forEach((todo) => {
      createTodoHTML(todo, index);
      index++;
    });
  };

  return { renderInitialLayout, populateProjects, populateTodos };
})();

export { displayController };
