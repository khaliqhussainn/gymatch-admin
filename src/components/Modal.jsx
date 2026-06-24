import { useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";

export default function Modal({ title, onClose, children, maxWidth = "480px" }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal animate-in"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A8A94] hover:text-white hover:bg-[#2A2A30] transition-all"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
