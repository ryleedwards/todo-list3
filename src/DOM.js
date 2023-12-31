import { Todo } from './Todo';
import { Project } from './Project';
import { session } from './Session';
import { format } from 'date-fns';

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

  const createProjectHTML = (project, index) => {
    const projDiv = document.createElement('div');
    projDiv.classList.add('project');
    const sideProjects = document.querySelector('.side-project-container');
    sideProjects.appendChild(projDiv);
    projDiv.dataset.index = index;

    const pProject = document.createElement('p');
    projDiv.appendChild(pProject);
    pProject.innerText = project.title;

    // Assign click listener for selecting project
    projDiv.addEventListener('click', (e) => {
      projectClickHandler(e);
    });
  };

  const projectClickHandler = (e) => {
    //Determine which project was clicked, handle whether it was div or p clicked
    let projIndex = '';
    if (e.target.tagName === 'P') {
      projIndex = e.target.parentElement.dataset.index;
    }
    if (e.target.tagName === 'DIV') {
      projIndex = e.target.dataset.index;
    }
    clearTodos();
    // Change active project in session
    session.activeProject = projIndex;
    // Populate todos of new project
    populateTodos(session.projects[session.activeProject].todos);
  };

  const clearTodos = () => {
    const masterTodoContainer = document.querySelector(
      '.master-todo-container'
    );
    while (masterTodoContainer.firstChild) {
      masterTodoContainer.removeChild(masterTodoContainer.lastChild);
    }
  };

  const populateProjects = (projectList) => {
    let i = 0;
    projectList.forEach((project) => {
      createProjectHTML(project, i);
      i++;
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
    pDueDate.innerText = format(todo.dueDate, 'PPPP');
  };

  const populateTodos = (projectTodos) => {
    let index = 0;
    projectTodos.forEach((todo) => {
      createTodoHTML(todo, index);
      index++;
    });
  };

  const createNewTodoForm = () => {
    //linebreak element for cloning
    const br = document.createElement('br');
    // Create form and set form parameters
    const todoForm = document.createElement('form');
    todoForm.id = 'addTodoForm';
    todoForm.setAttribute('method', 'post');
    // Create input element for todo title
    const title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.setAttribute('name', 'title');
    title.setAttribute('placeholder', 'Title');
    // Create input element for todo description
    const description = document.createElement('input');
    description.setAttribute('type', 'text');
    description.setAttribute('name', 'description');
    description.setAttribute('placeholder', 'Description (optional)');
    // Create input element for todo dueDate
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('name', 'dueDate');
    dueDate.setAttribute('placeholder', 'Due Date (optional)');
    // Create input element for todo priority
    const priority = document.createElement('input');
    priority.setAttribute('type', 'text');
    priority.setAttribute('name', 'priority');
    priority.setAttribute('placeholder', 'Priority (optional)');
    // Create submit putton
    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'submit');
    submit.addEventListener('click', (e) => {
      e.preventDefault();
      // FORM VALIDATION
      // Is title input blank? >> throw error & exit
      if (title.value === '') {
        // Has error msg been shown already? >> add, otherwise prevent dupe msg & exit
        if (!document.querySelector('label.error.title-empty')) {
          const titleError = document.createElement('label');
          titleError.classList.add('error', 'title-empty');
          titleError.innerText = 'Todo must be given a valid title';
          todoForm.appendChild(titleError);
          return;
        }
        return;
      }
      // Passes checks >> execute form data ingest
      ingestTodoForm(todoForm);
      removeAddTodoForm();
    });
    // Create cancel button to exit form
    const cancel = document.createElement('button');
    cancel.innerText = 'cancel';
    cancel.addEventListener('click', (e) => {
      e.preventDefault();
      removeAddTodoForm();
    });

    // Add inputs to form
    todoForm.appendChild(title);
    todoForm.appendChild(br.cloneNode());
    todoForm.appendChild(description);
    todoForm.appendChild(br.cloneNode());
    todoForm.appendChild(dueDate);
    todoForm.appendChild(br.cloneNode());
    todoForm.appendChild(priority);
    todoForm.appendChild(br.cloneNode());
    todoForm.appendChild(submit);
    todoForm.appendChild(cancel);
    todoForm.appendChild(br.cloneNode());

    return todoForm;
  };

  const ingestTodoForm = (form) => {
    const formData = new FormData(form);
    session.addTodo(session.projects[session.activeProject], formData);
    const todoIndex = session.projects[session.activeProject].todos.length - 1;
    createTodoHTML(
      session.projects[session.activeProject].todos[todoIndex],
      todoIndex
    );
  };

  const removeAddTodoForm = () => {
    document
      .querySelector('div.master-todo-container')
      .removeChild(document.querySelector('#addTodoForm'));
    document.querySelector('button.addTodo').classList.toggle('hidden');
  };

  const clickHandlerAddTodo = (e) => {
    //Hide button
    document.querySelector('button.addTodo').classList.toggle('hidden');
    const div = document.createElement('div');
    document
      .querySelector('.master-todo-container')
      .appendChild(createNewTodoForm());
  };

  const initClickHandlers = () => {
    document
      .querySelector('button.addTodo')
      .addEventListener('click', clickHandlerAddTodo);
  };

  return {
    renderInitialLayout,
    populateProjects,
    populateTodos,
    initClickHandlers,
  };
})();

export { displayController };
