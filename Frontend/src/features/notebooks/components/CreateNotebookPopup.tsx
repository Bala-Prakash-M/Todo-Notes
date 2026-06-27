import React, { useState, useEffect, useRef } from "react";
import { FolderPlus, X, Loader2 } from "lucide-react";

interface CreateNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (notebookName: string) => Promise<void> | void;
}

export function CreateNotebookModal({ isOpen, onClose, onCreate }: CreateNotebookModalProps) {
  const [notebookName, setNotebookName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal wakes up
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setNotebookName("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notebookName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onCreate(notebookName.trim());
      onClose();
    } catch (error) {
      console.error("Failed to create notebook:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* 
        LAYER 1: Backdrop Blur Overlay
        Gradually dissolves the background to spotlight the input center
      */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/10 backdrop-blur-xs transition-opacity duration-300 animate-fade-in" 
      />

      {/* 
        LAYER 2: Modal Card
        Designed using your editorial layout rules: soft borders, deep shadows, large typography
      */}
      <div
        className="relative w-full max-w-sm bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-[0_20px_50px_rgba(27,27,27,0.06)] scale-100 opacity-100 transition-all duration-300 transform"
        style={{
          animation: "modalSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
      >
        {/* Injecting smooth modal entry animation */}
        <style>{`
          @keyframes modalSlideIn {
            from { transform: translateY(12px) scale(0.98); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
        `}</style>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 transition-colors"
        >
          <X className="h-4 w-4 stroke-[1.8]" />
        </button>

        {/* Header Icon + Label */}
        <div className="flex flex-col items-center text-center mb-6 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-800 mb-3">
            <FolderPlus className="h-5 w-5 stroke-[1.5]" />
          </div>
          <h2 className="font-['Syne'] text-lg font-medium tracking-tight text-neutral-900">
            New Notebook
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-neutral-400 mt-1">
            Create a pristine canvas to collect your thoughts.
          </p>
        </div>

        {/* Form Structure */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium text-neutral-500 px-0.5">
              Notebook Name
            </label>
            <input
              ref={inputRef}
              type="text"
              required
              maxLength={32}
              placeholder="e.g., Deep Work, Daily Reflections"
              value={notebookName}
              onChange={(e) => setNotebookName(e.target.value)}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-2.5 font-['Plus_Jakarta_Sans'] text-sm font-normal text-neutral-900 placeholder-neutral-300 outline-none transition-all duration-200 focus:border-neutral-400 focus:bg-white focus:ring-0"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-xl border border-neutral-200 font-['Plus_Jakarta_Sans'] text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 active:scale-98"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!notebookName.trim() || isSubmitting}
              className="flex-1 h-10 flex justify-center items-center rounded-xl bg-neutral-900 font-['Plus_Jakarta_Sans'] text-xs font-medium text-white shadow-xs transition-all duration-200 hover:bg-neutral-800 active:scale-98 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}