import { X } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDarkMode } = useDarkMode();

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={onClose} // klik overlay untuk close
    >
      {/* Modal Box */}
      <div
        className={`rounded-lg shadow-lg w-full max-w-md p-6 relative
          ${
            isDarkMode
              ? 'bg-slate-800 text-slate-100'
              : 'bg-white text-gray-800'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          {title && <h2 className='text-lg font-semibold'>{title}</h2>}
          <button
            onClick={onClose}
            aria-label='Close modal'
            className={`p-1 rounded-full transition-colors
              ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}
            `}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
