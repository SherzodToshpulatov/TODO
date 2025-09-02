export const toggleDone = (list, id) =>
  list.map(t =>
    t.id === id
      ? { ...t, done: !t.done }
      : { ...t, subtasks: toggleDone(t.subtasks, id) }
  );

export const deleteTask = (list, id) =>
  list
    .filter(t => t.id !== id)
    .map(t => ({ ...t, subtasks: deleteTask(t.subtasks, id) }));

export const editTaskTitle = (list, id, title) =>
  list.map(t =>
    t.id === id
      ? { ...t, title }
      : { ...t, subtasks: editTaskTitle(t.subtasks, id, title) }
  );

export const addSubtask = (list, parentId, newTask) =>
  list.map(t =>
    t.id === parentId
      ? { ...t, subtasks: [...t.subtasks, newTask] }
      : { ...t, subtasks: addSubtask(t.subtasks, parentId, newTask) }
  );

export const filterTasks = (list, query) => {
  if (!query) return list;
  const q = query.toLowerCase();
  const walk = (items) => {
    const out = [];
    for (const t of items) {
      const childMatches = walk(t.subtasks);
      const selfMatch = t.title.toLowerCase().includes(q);
      if (selfMatch || childMatches.length) {
        out.push({ ...t, subtasks: childMatches });
      }
    }
    return out;
  };
  return walk(list);
};
