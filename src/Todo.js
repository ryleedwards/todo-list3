class Todo {
  constructor() {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  // Title getters and setters
  get title() {
    return this._title;
  }
  set title(newTitle) {
    if (newTitle === '') {
      throw 'Title cannot be empty';
    }
    this._title = newTitle;
  }

  // Description getters and setters
  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._description = newDescription;
  }

  // DueDate getters and setters
  get dueDate() {
    return this._dueDate;
  }

  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  // Priority getters and setters
  get priority() {
    return this._priority;
  }

  set priority(newPriority) {
    this._priority = newPriority;
  }
}

export { Todo };
