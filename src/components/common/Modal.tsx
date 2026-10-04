import React, { useEffect } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      open
      aria-labelledby="modal-title"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        border: "none",
        background: "transparent",
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Native interactive backdrop button */}
      <button
        type="button"
        aria-label="Close backdrop"
        tabIndex={-1}
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "default",
        }}
      />

      {/* Modal Dialog Content */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2 id="modal-title">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
