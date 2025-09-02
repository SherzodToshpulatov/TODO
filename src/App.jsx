import { useEffect, useMemo, useRef, useState } from "react";
import TitleEditor from "./components/TitleEditor";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import Stats from "./components/Stats";
import { getOrCreateProjectIdFromURL, loadProject, saveProject } from "./utils/storage";
import {
  toggleDone,
  deleteTask,
  editTaskTitle,
  addSubtask,
  filterTasks,
} from "./utils/tasks";

export default function App() {
  const pid = useMemo(() => getOrCreateProjectIdFromURL(), []);
  const [state, setState] = useState(() => loadProject(pid));

  useEffect(() => {
    saveProject(pid, state);
  }, [pid, state]);

  const filtered = useMemo(
    () => filterTasks(state.tasks, state.filter),
    [state.tasks, state.filter]
  );

  const fileInputRef = useRef(null);

  const addRootTask = (title) => {
    const newTask = { id: crypto.randomUUID(), title, done: false, subtasks: [] };
    setState((s) => ({ ...s, tasks: [...s.tasks, newTask] }));
  };

  const addSubAt = (parentId) => {
    const title = prompt("Subtask title:");
    if (!title) return;
    const newTask = { id: crypto.randomUUID(), title, done: false, subtasks: [] };
    setState((s) => ({ ...s, tasks: addSubtask(s.tasks, parentId, newTask) }));
  };

  const toggleAt = (id) =>
    setState((s) => ({ ...s, tasks: toggleDone(s.tasks, id) }));

  const deleteAt = (id) =>
    setState((s) => ({ ...s, tasks: deleteTask(s.tasks, id) }));

  const editAt = (id, title) =>
    setState((s) => ({ ...s, tasks: editTaskTitle(s.tasks, id, title) }));

  const exportJSON = () => {
    const data = { pid, ...state };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${state.title || "project"}_${pid.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJSON = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.tasks)) throw new Error("Invalid file");
        setState({
          ...state,
          title: data.title || state.title,
          tasks: data.tasks,
          filter: data.filter || "",
        });
      } catch (e) {
        alert("Import failed: " + e.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <header className="space-y-2">
          <TitleEditor
            value={state.title}
            onChange={(v) => setState((s) => ({ ...s, title: v }))}
          />
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-xl border outline-none"
              placeholder="Filter tasks"
              value={state.filter}
              onChange={(e) =>
                setState((s) => ({ ...s, filter: e.target.value }))
              }
            />
            <button
              onClick={exportJSON}
              className="px-3 py-2 rounded-xl border"
            >
              Export
            </button>
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-3 py-2 rounded-xl border"
            >
              Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="application/json"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importJSON(f);
                e.target.value = "";
              }}
            />
          </div>
          <Stats tasks={state.tasks} />
        </header>

        <main>
          <AddTask onAdd={addRootTask} />
          <ul className="mt-4">
            {filtered.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onToggle={toggleAt}
                onDelete={deleteAt}
                onEdit={editAt}
                onAddSub={addSubAt}
              />
            ))}
            {!filtered.length && (
              <p className="text-center text-sm opacity-60 py-6">
                No tasks found.
              </p>
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}
