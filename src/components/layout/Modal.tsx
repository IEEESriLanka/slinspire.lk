import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null; // Do not render anything if closed

  return (
    <div 
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", 
        alignItems: "center", justifyContent: "center", zIndex: 1000
      }}
      onClick={onClose} 
    >
      <div 
        style={{
          background: "white", padding: "20px", borderRadius: "8px",
          minWidth: "300px", position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <button 
          onClick={onClose} 
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};