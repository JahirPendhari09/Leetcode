import React, { useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center" onClick={handleOutsideClick}>
      <div ref={modalRef}  className="bg-white p-4 rounded-md shadow-md relative" onClick={(e)=> e.stopPropagation()}>
        <button
          className="close-button text-[30px] -top-1 absolute right-3"
          onClick={onClose}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
