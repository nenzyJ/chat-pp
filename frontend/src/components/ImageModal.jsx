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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Модальне вікно */}
      <div 
        className="relative max-w-4xl max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="ml-auto z-10 w-10 h-10 text-white rounded-full flex items-center justify-center text-xl font-bold"
          aria-label="Закрити"
        >
          ×
        </button>
        
        {/* Зображення */}
        <img 
          src={imageUrl} 
          alt="Розширений перегляд" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl "
          style={{ maxHeight: '90vh' }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
