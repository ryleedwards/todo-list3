import { Todo } from './Todo';
import { Project } from './Project';

function displayController() {
  const renderInitialLayout = () => {
    //base container
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    //sidebar + project container
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    const sideHeader = document.createElement('div');
    sideHeader.classList.add('side-header');
    const pProjectsHeader = document.createElement('p');
    pProjectsHeader.innerText = 'Projects';
    sideHeader.appendChild(pProjectsHeader);
    sidebar.appendChild(sideHeader);
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
  };

  const createProjectHTML = (project) => {
    const projDiv = document.createElement('div');
    projDiv.classList.add('project');
    const sideHeader = document.querySelector('.side-header');
    console.log(sideHeader);
    sideHeader.appendChild(projDiv);

    const pProject = document.createElement('p');
    projDiv.appendChild(pProject);
    pProject.innerText = project.title;
  };

  const populateProjects = (projectList) => {
    projectList.forEach((project) => {
      createProjectHTML(project);
    });
  };

  const populateTodos = (project) => {};

  console.log('DISPLAY CONTROLLER CALLED');

  return { renderInitialLayout, populateProjects, populateTodos };
}

export { displayController };
