'use client';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

        <div className="relative transform overflow-hidden rounded-lg bg-gray-800 border border-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-white">{title}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={onConfirm}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-600 sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}