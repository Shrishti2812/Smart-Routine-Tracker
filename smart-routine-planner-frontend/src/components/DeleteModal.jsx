function DeleteModal({ onClose, onConfirm, isOpen }) {
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Confirm deletion</h2>
          <p className="mb-6 text-sm leading-relaxed text-slate-600">Are you sure you want to delete this routine?</p>
            <div className="flex justify-end gap-4">
                <button
                    onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">Cancel</button>
                <button
                    onClick={onConfirm}
              className="rounded-lg bg-[#a65d54] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#914b43]">Delete</button>
            </div>
        </div>
      </div>
    );
}
export default DeleteModal;