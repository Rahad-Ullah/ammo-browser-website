import type { ReactNode } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, className, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`bg-mainBG border border-borderColor rounded-lg p-6 max-w-md w-full mx-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-primaryWhite text-xl font-Poppins mb-4">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
