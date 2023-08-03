class Project {
  constructor(title) {
    this.title = title;
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
}

export { Project };
