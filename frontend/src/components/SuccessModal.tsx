import {  Check,  X } from "lucide-react";
import type { FC } from "react";
import ReactDOM from 'react-dom';


interface SuccessModalProps {
  message: string;
  isOpen: boolean;
  openModal?(): void;
  closeModal?(): void;
  status: "success" | "error";
}
const SuccessModal: FC<SuccessModalProps> = ({
  message,
  isOpen,
  closeModal,
  status,
}) => {
  if (!isOpen) return;

  return  ReactDOM.createPortal(
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-screen h-screen bg-black/65  flex z-1"
    >
      <div className=" flex items-center justify-center m-auto ">
        <div className="min-w-80 h-50 p-4 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm relative">
          <span className={`p-2 mb-1 ${status=='success' ? 'bg-green-100 border-2 border-green-700':'bg-red-100 border-2 border-red-700'} rounded-full`}>
            {status == "success" ? (
              <Check className="text-green-600" size={33} />
            ) : (
             <X />
            )}
          </span>
          <span className="text-green-950">{message}</span>
          <button
            onClick={closeModal}
            className=" px-4 py-2  rounded-md absolute top-0 right-0 cursor-pointer"
          >
            <X />
          </button>
        </div>
      </div>
    </div>,document.body
  );
};

export default SuccessModal;
