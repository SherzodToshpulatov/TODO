import { useState, useEffect } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit, onAddSub }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  useEffect(() => setTitle(task.title), [task.title]);

  return (
    <li className="rounded-2xl p-3 border mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        {editing ? (
          <input
            autoFocus
            className="flex-1 px-2 py-1 rounded-lg border outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              onEdit(task.id, title);
              setEditing(false);
            }}
          />
        ) : (
          <span
            className={`flex-1 ${task.done ? "line-through opacity-60" : ""}`}
            onDoubleClick={() => setEditing(true)}
          >
            {task.title}
          </span>
        )}
        <div className="flex gap-1">
          <button onClick={() => setEditing(true)} className="px-2 py-1 rounded-xl border">Edit</button>
          <button onClick={() => onAddSub(task.id)} className="px-2 py-1 rounded-xl border">Sub</button>
          <button onClick={() => onDelete(task.id)} className="px-2 py-1 rounded-xl border">Del</button>
        </div>
      </div>
      {task.subtasks?.length > 0 && (
        <ul className="ml-6 mt-2 border-l pl-3">
          {task.subtasks.map((sub) => (
            <TaskItem
              key={sub.id}
              task={sub}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onAddSub={onAddSub}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
