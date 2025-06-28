import { useState, useCallback } from "react";
import Column from "./components/Column";
import "./index.css";

const initial = [
  {
    id: crypto.randomUUID(),
    title: "Demo",
    description: "Right‑click me",
    status: "new",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initial);

  const addTask = (title, description) =>
    setTasks((t) => [
      { id: crypto.randomUUID(), title, description, status: "new" },
      ...t,
    ]);

  const moveTask = useCallback(
    (id, newStatus, dueDate) =>
      setTasks((t) =>
        t.map((task) =>
          task.id === id
            ? { ...task, status: newStatus, dueDate: dueDate ?? task.dueDate }
            : task
        )
      ),
    []
  );

  const setDue = (id, dueDate) => moveTask(id, "ongoing", dueDate);

  return (
    <main className="board">
      {["new", "ongoing", "done"].map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          addTask={addTask}
          moveTask={moveTask}
          setDue={setDue}
        />
      ))}
    </main>
  );
}
