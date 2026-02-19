"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../../app/lib";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  disableOverlayClose?: boolean;
  showCloseButton?: boolean;
  alignTop?: boolean;
  fullWidth?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  containerClassName = "",
  disableOverlayClose = false,
  showCloseButton = true,
  alignTop = false,
  fullWidth = false,
}: ModalProps) => {
  const modalRef = useOutsideClick(disableOverlayClose ? () => {} : onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex justify-center overflow-y-auto p-4",
        alignTop ? "items-start pt-8" : "items-center",
        "animate-fade-in",
        className
      )}
    >
      {/* Background overlay with blur */}
      <div
        className="absolute inset-0 bg-dark-900/60 backdrop-blur-sm"
        onClick={disableOverlayClose ? undefined : onClose}
      />

      {/* Modal container */}
      <div
        ref={modalRef}
        className={clsx(
          "bg-white relative z-10 rounded-2xl p-8 shadow-large border border-dark-100",
          "animate-scale-in",
          fullWidth ? "w-full max-w-4xl" : "w-full max-w-lg",
          containerClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-dark-400 hover:text-dark-700 hover:bg-dark-50 rounded-lg transition-all duration-200"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};
