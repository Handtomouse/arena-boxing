'use client';

import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  autoCloseDuration?: number;
  showCloseButton?: boolean;
  variant?: 'default' | 'confirmation';
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  autoCloseDuration = 0,
  showCloseButton = true,
  variant = 'default',
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus modal
      modalRef.current?.focus();

      // Auto-close timer
      if (autoCloseDuration > 0) {
        const timer = setTimeout(onClose, autoCloseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      // Return focus to previous element
      previousFocusRef.current?.focus();
    }
  }, [isOpen, autoCloseDuration, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && variant !== 'confirmation') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-black/80 animate-fade-in"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby="modal-description"
        tabIndex={-1}
        className={`
          relative z-10
          w-full max-w-2xl max-h-[80vh] overflow-y-auto
          bg-cream-primary
          border-3 border-burgundy-primary
          p-8
          grunge-texture
          animate-staged-fade
          ${className}
        `}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 text-burgundy-primary hover:text-blood-red transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
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

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className="font-[family-name:var(--font-display)] text-2xl md:text-3xl uppercase tracking-wider text-burgundy-primary mb-6 pr-8"
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div id="modal-description" className="text-charcoal-black">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
