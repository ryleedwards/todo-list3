import { Project } from './Project';
import { Todo } from './Todo';

const session = (() => {
  const projects = [];
  // TEST DATA
  const testProj1 = new Project('My first project');
  testProj1.addTodo(
    new Todo(
      'Todo 1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      '08/09/2023',
      'high'
    )
  );
  testProj1.addTodo(
    new Todo(
      'Todo 2',
      'Proin vestibulum elit eget turpis cursus, bibendum ultricies',
      '08/10/2023',
      'low'
    )
  );
  const testProj2 = new Project('My second project');
  testProj2.addTodo(
    new Todo(
      'Todo 3',
      'Nulla pulvinar urna eget lacinia elementum. Nullam eget volutpat augue. Aliquam vitae lectus non purus pellentesque pretium quis eget eros',
      '08/12/2023',
      'medium'
    )
  );
  projects.push(testProj1);
  projects.push(testProj2);

  // current working project creation & assignment
  let currentProject = projects[0];

  const changeProject = (projectIndex) => {
    currentProject = projects[projectIndex];
  };

  const addTodo = (project, formData) => {
    const todo = new Todo(
      formData.get('title'),
      formData.get('description'),
      formData.get('dueDate'),
      formData.get('priority')
    );
    project.addTodo(todo);
    console.log(project);
  };

  return { projects, currentProject, changeProject, addTodo };
})();

export { session };
