import React, { useEffect } from 'react';

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Запобігаємо прокрутці фону
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-2 sm:p-4"
      onClick={onClose}
    >
      {/* Модальне вікно */}
      <div 
        className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="ml-auto z-10 w-8 h-8 sm:w-10 sm:h-10 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-colors"
          aria-label="Close"
        >

        </button>
        
        {/* Зображення */}
        <img 
          src={imageUrl} 
          alt="Full size" 
          className="w-full h-full max-h-[95vh] sm:max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
        
        
      </div>
    </div>
  );
};

export default ImageModal;
