import TaskCard from "./TaskCard";
import { useState } from "react";

const LABEL = { new: "New", ongoing: "Ongoing", done: "Done" };

export default function Column({ status, tasks, addTask, moveTask, setDue }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (title.trim()) addTask(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <section className={`column ${status}`}>
      <h2>{LABEL[status]}</h2>

      {status === "new" && (
        <form onSubmit={submit} className="adder">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />
          <button>Add</button>
        </form>
      )}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          moveTask={moveTask}
          setDue={setDue}
        />
      ))}
    </section>
  );
}
