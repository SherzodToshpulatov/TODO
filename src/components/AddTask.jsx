import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    onAdd(title);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 rounded-xl border outline-none"
        placeholder="Add a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="px-3 py-2 rounded-xl border">Add</button>
    </form>
  );
}
