import { ModalHistoriqueProps } from "@/interface/modalHistoriqueInterface";
import React, { FC } from "react";

const ModalHistorique: FC<ModalHistoriqueProps> = ({ isOpen, onClose, plant, children }) => {
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
        <h2 className="text-lg xl:text-2xl font-bold mb-4">Historique de <span className="text-vert">{plant.name}</span></h2>
        <div className="grid grid-cols-2 gap-4">
          {plant.images.map((image) => (
            <img className="object-cover rounded-xl w-28 h-28 lg:w-40 lg:h-40 xl:w-52 xl:h-52" key={image.id} src={image.url} alt={plant.name} />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalHistorique;