// factory for todos
const createTodo = ({ title, description, dueDate, priority }) => ({
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist,
});

// factory for checklist items
const createChecklistItem = ({ item, checked }) => ({
  item,
  checked,
});

export { createTodo };
