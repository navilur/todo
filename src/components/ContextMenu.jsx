import { useEffect } from "react";
const LABEL = {
  new: "Move to New",
  ongoing: "Move to Ongoing",
  done: "Move to Done",
};

export default function ContextMenu({ x, y, options, onSelect, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    const click = () => onClose();
    window.addEventListener("keydown", esc);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("keydown", esc);
      window.removeEventListener("click", click);
    };
  }, [onClose]);

  return (
    <ul className="ctx" style={{ top: y, left: x }}>
      {options.map((opt) => (
        <li key={opt} onClick={() => onSelect(opt)}>
          {LABEL[opt]}
        </li>
      ))}
    </ul>
  );
}
