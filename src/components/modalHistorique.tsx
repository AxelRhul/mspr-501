import { ModalProps } from "@/interface/modalInterface";
import React, { FC } from "react";

const ModalHistorique: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-6 rounded-3xl shadow-lg relative w-9/12 mx-auto">
        <button className="absolute top-6 right-6" onClick={onClose}>
          <img className="w-5" src="/img/fermer.svg" alt="Croix" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalHistorique;