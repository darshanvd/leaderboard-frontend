import React, { useEffect, useState } from 'react';

interface SnackbarState {
  message: string;
  open: boolean;
  type?: 'success' | 'error' | 'info' | 'warning';
}

interface SnackbarProps {
  snackbar: SnackbarState;
  duration?: number; // in ms, optional
}

const typeStyles: Record<string, string> = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-text text-white',
  info: 'bg-blue-text text-white',
  warning: 'bg-yellow-500 text-black',
};

const Snackbar: React.FC<SnackbarProps> = ({ snackbar, duration = 2000 }) => {
  const { message, open, type = 'info' } = snackbar;
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
    if (open) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [open, message, duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg flex items-center gap-2 transition-all duration-300 ${typeStyles[type]}`}
      role="alert"
    >
      <span>{message}</span>
      <button
        className="ml-4 text-lg font-bold focus:outline-none"
        onClick={() => setVisible(false)}
        aria-label="Close"
        type="button"
      >
        ×
      </button>
    </div>
  );
};

export type { SnackbarState };
export default Snackbar;