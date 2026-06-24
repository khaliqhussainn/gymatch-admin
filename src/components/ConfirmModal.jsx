import Modal from "./Modal";
import { RiAlertLine } from "react-icons/ri";

export default function ConfirmModal({ title, message, onConfirm, onCancel, danger }) {
  return (
    <Modal title="" onClose={onCancel}>
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{
            backgroundColor: danger ? "#FF444418" : "#D9FF0018",
            color: danger ? "#FF4444" : "#D9FF00",
          }}
        >
          <RiAlertLine />
        </div>
        <div>
          <p className="font-heading text-2xl tracking-wide mb-2">{title}</p>
          <p className="text-[#8A8A94] text-sm leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3 w-full mt-2">
          <button className="btn-ghost flex-1" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={danger ? "btn-danger flex-1" : "btn-primary flex-1"}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
