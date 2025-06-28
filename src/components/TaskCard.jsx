import { useState, useEffect, useMemo } from "react";
import ContextMenu from "./ContextMenu";

const COLORS = {
  new: "#3b82f6",
  ongoing: "#f97316",
  done: "#10b981",
};

const OPTIONS = {
  new: ["ongoing", "done"],
  ongoing: ["new", "done"],
  done: ["new", "ongoing"],
};

export default function TaskCard({ task, moveTask, setDue }) {
  const [menu, setMenu] = useState(null);
  const openMenu = (e) => {
    e.preventDefault();
    setMenu({ x: e.pageX, y: e.pageY });
  };
  const closeMenu = () => setMenu(null);
  const move = (s) => {
    moveTask(task.id, s);
    closeMenu();
  };

  const overdue = useMemo(
    () => task.dueDate && new Date(task.dueDate) < new Date(),
    [task.dueDate]
  );
  useEffect(() => {
    if (overdue) alert(`Task "${task.title}" is overdue!`);
  }, [overdue, task.title]);

  return (
    <>
      <div
        className="card"
        onContextMenu={openMenu}
        style={{ borderLeftColor: COLORS[task.status] }}
      >
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        {task.status === "ongoing" && (
          <label className={`due ${overdue ? "overdue" : ""}`}>
            Due:&nbsp;&nbsp;
            <input
              type="datetime-local"
              value={task.dueDate || ""}
              onChange={(e) => setDue(task.id, e.target.value)}
            />
          </label>
        )}
      </div>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          options={OPTIONS[task.status]}
          onSelect={move}
          onClose={closeMenu}
        />
      )}
    </>
  );
}
