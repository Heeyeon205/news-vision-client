export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-[80%] max-w-2xs shadow-lg">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
