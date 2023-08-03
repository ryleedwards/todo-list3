class Todo {
  constructor() {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get title() {
    return this._title;
  }
  set title(newTitle) {
    if (newTitle === '') {
      throw 'Title cannot be empty';
    }
    this._title = newTitle;
  }

  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._description = newDescription;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  get priority() {
    return this._priority;
  }

  set priority(newPriority) {
    this._priority = newPriority;
  }
}

export { Todo };
