class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    if (newTitle === '') {
      throw ' Project title cannot be empty';
    }
    this._title = newTitle;
  }

  get todos() {
    return this._todos;
  }
  set todos(newTodos) {
    this._todos = newTodos;
  }
}

export { Project };
