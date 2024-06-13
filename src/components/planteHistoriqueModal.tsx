"use client";

import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";

export function PlanteHistoriqueModal({ images }) {
  const [openModal, setOpenModal] = useState(true);
  console.log('blabla', images);

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="flex items-center justify-center text-[#5C8F37] font-semibold text-base lg:text-lg">Voir l'historique de la plante</button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="p-1 border-0"></ModalHeader>
        <ModalBody className="p-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images && images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className="flex justify-center items-center">
                  <img className="object-cover rounded-lg w-full h-full" src={image.url} alt={`Image ${image.id}`} />
                </div>
              ))
            ) : (
              <p>Aucune image disponible.</p>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}