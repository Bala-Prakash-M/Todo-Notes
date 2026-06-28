import React, { useState, useEffect, useRef } from "react";
import { FolderPlus, X, Loader2 } from "lucide-react";

interface CreateNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (notebookName: string) => Promise<void> | void;
}

export function CreateNotebookModal({
  isOpen,
  onClose,
  onCreate,
}: CreateNotebookModalProps) {
  const [notebookName, setNotebookName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal wakes up
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setTimeout(() => {
        setNotebookName("");
      }, 0);
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
      {/* LAYER 1: Backdrop Blur Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/10 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      {/* LAYER 2: Modal Card */}
      <div
        className="relative w-full max-w-sm bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-[0_20px_50px_rgba(27,27,27,0.06)] scale-100 opacity-100 flex flex-col justify-between overflow-hidden"
        style={{
          animation:
            "modalSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Injecting smooth entry & subtle texture drift animations */}
        <style>{`
      @keyframes modalSlideIn {
        from { transform: translateY(12px) scale(0.98); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes flowerRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>

        {/* PERFORMANCE-OPTIMIZED FLOWER BACKGROUND WATERMARK (HIGH VISIBILITY REMIX)
  Uses absolute corner pinning, custom dash-arrays, and 8% stroke opacity for maximum clarity
*/}
        <div
          className="absolute -top-16 -right-16 pointer-events-none select-none text-neutral-900/[0.08] origin-center mix-blend-multiply"
          style={{ animation: "flowerRotate 90s linear infinite" }}
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="1.5 2.5" // Creates a highly detailed, clean dotted architectural layout line
          >
            {/* A beautifully calculated geometric 8-petal structural flower rosette */}
            <path d="M50,50 A25,25 0 1,1 50,0 A25,25 0 1,1 50,50" />
            <path d="M50,50 A25,25 0 1,1 100,50 A25,25 0 1,1 50,50" />
            <path d="M50,50 A25,25 0 1,1 50,100 A25,25 0 1,1 50,50" />
            <path d="M50,50 A25,25 0 1,1 0,50 A25,25 0 1,1 50,50" />
            <path d="M50,50 A25,25 0 1,1 85.35,14.65 A25,25 0 1,1 50,50" />
            <path d="M50,50 A25,25 0 1,1 85.35,85.35 A25,25 0 1,1 50,50" />
            <path d="M50,50 A25,25 0 1,1 14.65,85.35 A25,25 0 1,1 50,50" />
            <path d="M50,50 A25,25 0 1,1 14.65,14.65 A25,25 0 1,1 50,50" />
          </svg>
        </div>

        {/* SUBTLE LINE-MASK BLENDING LAYER
  Ensures that even though the pattern is more visible, it won't compete visually with text entry fields
*/}
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/40 to-white/95 pointer-events-none z-[1]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          // Changed z-10 to z-50 so it punches straight through the new mask background layer
          className="absolute right-4 top-4 rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 transition-colors z-50 cursor-pointer"
        >
          <X className="h-4 w-4 stroke-[1.8]" />
        </button>

        {/* Content Container (z-10 explicitly positions it above the flower overlay layer) */}
        <div className="relative z-10">
          {/* Header Icon + Label */}
          <div className="flex flex-col items-center text-center mb-6 pt-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-800 mb-3 shadow-xs">
              <FolderPlus className="h-5 w-5 stroke-[1.5]" />
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-semibold tracking-tight text-neutral-800">
              Create Notebook Space
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-neutral-400 mt-1 max-w-[240px]">
              Create a pristine canvas to collect your thoughts.
            </p>
          </div>

          {/* Form Structure */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-wider text-neutral-400 uppercase px-0.5">
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
                className="w-full bg-neutral-50/50 border border-neutral-200/80 rounded-xl px-4 py-2.5 font-['Plus_Jakarta_Sans'] text-sm font-medium text-neutral-900 placeholder-neutral-300 outline-none transition-all duration-200 focus:border-neutral-400 focus:bg-white focus:ring-0"
              />
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-10 rounded-xl border border-neutral-200 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 active:scale-98"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!notebookName.trim() || isSubmitting}
                className="flex-1 h-10 flex justify-center items-center rounded-xl bg-slate-900 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-white shadow-md shadow-slate-900/5 transition-all duration-200 hover:bg-slate-800 active:scale-98 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
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
    </div>
  );
}
