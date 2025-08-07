import React from "react";
import { FcCheckmark } from "react-icons/fc";



interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  color?: string; 
  icon?: React.ReactNode; 
  style?: React.CSSProperties; 
  title: string;
  message: string;
}

// WarningModal component
const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  color = 'bg-green-500', 
  icon = <FcCheckmark size={32} />, 
  style,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`${color} text-white p-6 rounded-xl max-w-sm w-full`} style={style}>
        <div className="flex items-center justify-center mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
        <p className="text-sm text-center mt-2">{message}</p>
        <button
          type="button"
          className="mt-4 w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningModal
