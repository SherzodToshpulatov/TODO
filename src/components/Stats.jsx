export default function Stats({ tasks }) {
  const countAll = (list) =>
    list.reduce((acc, t) => acc + 1 + countAll(t.subtasks || []), 0);
  const countDone = (list) =>
    list.reduce(
      (acc, t) =>
        acc + (t.done ? 1 : 0) + countDone(t.subtasks || []),
      0
    );

  const total = countAll(tasks);
  const done = countDone(tasks);

  return (
    <div className="text-sm text-gray-600">
      {done} / {total} tasks done
    </div>
  );
}
