import { ModalGardienProps } from "@/interface/modalGardienInterface";
import { FC, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";

registerLocale('fr', fr);

const ModalGardien: FC<ModalGardienProps> = ({ isOpen, onClose, plant, children }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
      <div className="bg-white p-6 rounded-3xl shadow-lg relative w-6/12 xl:w-4/12 mx-auto">
        <button className="absolute top-6 right-6" onClick={onClose}>
          <img className="w-5" src="/img/fermer.svg" alt="Croix" />
        </button>
        <h2 className="text-base xl:text-2xl font-bold mb-4">Vous souhaitez garder <span className="text-vert">{plant && plant.name}</span> ?</h2>
        <p className="text-sm lg:text-base font-medium pb-4">Pour ce faire, il vous suffit de vous présenter dans l&apos;encadré ci-dessous.</p>
        <form className="flex flex-col items-center justify-center w-full space-y-4">
          <textarea name="gardiennage" id="gardiennage" className="w-full border-2 border-vert rounded-xl"></textarea>
          <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4 my-4">
            <div className="w-full flex flex-col items-left space-y-2">
              <label className="bloc text-sm lg:text-base text-black underline underline-offset-4 decoration-2 decoration-vert">Date de début :</label>
              <DatePicker
                selected={startDate || undefined}
                onChange={(date) => setStartDate(date)}
                className="w-full border-2 border-vert rounded-xl px-1 py-px lg:px-2 lg:py-1"
                placeholderText="01/01/1970"
                locale="fr"
                dateFormat="dd/MM/yyyy"
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                selectsStart
              />
            </div>
            <div className="w-full flex flex-col items-left space-y-2">
              <label className="bloc text-sm lg:text-base text-black underline underline-offset-4 decoration-2 decoration-vert">Date de fin :</label>
              <DatePicker
                selected={endDate || undefined}
                onChange={(date) => setEndDate(date)}
                className="w-full border-2 border-vert rounded-xl px-1 py-px lg:px-2 lg:py-1"
                placeholderText="02/01/1970"
                locale="fr"
                dateFormat="dd/MM/yyyy"
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                selectsEnd
              />
            </div>
          </div>
          <button name="gardiennage" type="submit" className="w-full text-sm lg:text-base bg-vert rounded-xl font-semibold py-1 lg:py-1.5 text-white">Envoyer</button>
        </form>
        {children}
      </div>
    </div>
  );
};

export default ModalGardien;