import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Plus,
  MoreVertical,
  Trash2,
  Edit2,
  ChevronLeft,
  Settings,
  RefreshCw,
} from "lucide-react";
import useNotebook from "../../notebooks/hooks/notebook.hook";
import { CreateNotebookModal } from "../../notebooks/components/CreateNotebookPopup";
import useScreenSize from "../../../shared/hooks/useScreenSize";

interface NotebookSidebarProps {
  onToggleCollapse?: () => void;
  isCollapsed?: boolean;
}

export const NotebookSidebar: React.FC<NotebookSidebarProps> = ({
  onToggleCollapse,
  isCollapsed = false,
}) => {
  const navigate = useNavigate();
  const { notebookId } = useParams<{ notebookId: string }>();
  const { isMobile } = useScreenSize();
  const userName = localStorage.getItem("userName") || "Anastasia";
  const email = localStorage.getItem("email") || "anastasia@icylab.co";

  const {
    notebooks,
    createNotebook,
    updateNotebook,
    deleteNotebook,
    getNotebookStyles,
    isNotebookLoading,
  } = useNotebook();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingNotebookId, setEditingNotebookId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close context menu on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleNotebookSelect = (id: string) => {
    navigate(`/${id}`);
  };

  const handleRenameSubmit = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await updateNotebook(id, editName.trim());
      setEditingNotebookId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the space "${name}"? This will delete all notes inside it.`)) {
      try {
        await deleteNotebook(id);
        setActiveMenuId(null);
        // If we deleted the active notebook, navigate to another one or /notebooks
        if (notebookId === id) {
          const remaining = notebooks.filter((nb) => nb.id !== id);
          if (remaining.length > 0) {
            navigate(`/${remaining[0].id}`);
          } else {
            navigate("/notebooks");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <aside
      className={`
        relative border-r border-slate-200/50 bg-[#F8FAFC] flex flex-col justify-between shrink-0 h-full select-none overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isCollapsed ? "w-0 border-r-0 opacity-0 pointer-events-none" : "w-64 opacity-100"}
      `}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-slate-500 blur-[100px]" />
      </div>

      <div className="flex-1 flex flex-col min-h-0 relative z-10">
        {/* Profile Card Header */}
        <div className="px-5 pt-7 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-sans text-xs font-semibold tracking-wider flex items-center justify-center border border-slate-950/10 shadow-xs shrink-0 select-none">
              {userName
                ? userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "U"}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-slate-800 truncate font-sans">
                {userName}
              </h4>
              <p className="text-[10px] text-slate-400 truncate font-sans font-medium">
                {email}
              </p>
            </div>
          </div>

          {!isMobile && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Global Navigation */}
        <div className="p-3 border-b border-slate-100 space-y-1">
          <Link
            to="/notebooks"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/40 rounded-xl transition-all duration-200"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Spaces</span>
          </Link>
          <Link
            to="/tasks"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/40 rounded-xl transition-all duration-200"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Tasks Ledger</span>
          </Link>
        </div>

        {/* Notebooks List Header */}
        <div className="px-5 pt-5 pb-2 flex items-center justify-between shrink-0">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Notebook Spaces
          </span>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/40 transition-all active:scale-[0.93]"
            title="Create Notebook Space"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrolling Notebook List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isNotebookLoading && notebooks.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-slate-400">
              Loading spaces...
            </div>
          )}

          {!isNotebookLoading && notebooks.length === 0 && (
            <div className="px-4 py-8 text-center border border-dashed border-slate-200 rounded-xl mx-2 mt-2 bg-white/40">
              <p className="text-[11px] text-slate-400 font-sans leading-normal">
                No spaces created.
              </p>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="mt-2 text-[10px] font-semibold text-slate-600 hover:underline"
              >
                Create one now
              </button>
            </div>
          )}

          {notebooks.map((nb) => {
            const isSelected = nb.id === notebookId;
            const { theme } = getNotebookStyles(nb.id);
            const isEditing = editingNotebookId === nb.id;

            return (
              <div
                key={nb.id}
                className={`
                  group relative flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-300
                  ${
                    isSelected
                      ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-slate-200/50"
                      : "hover:bg-slate-200/30 border border-transparent"
                  }
                `}
              >
                <div
                  className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                  onClick={() => !isEditing && handleNotebookSelect(nb.id)}
                >
                  {/* Theme Accent Dot */}
                  <span
                    className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: theme.accent }}
                  />

                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => handleRenameSubmit(nb.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameSubmit(nb.id);
                        if (e.key === "Escape") setEditingNotebookId(null);
                      }}
                      autoFocus
                      className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded px-1.5 py-0.5 outline-none focus:border-slate-500"
                    />
                  ) : (
                    <span
                      className={`
                        text-xs font-medium truncate font-sans
                        ${isSelected ? "text-slate-900 font-semibold" : "text-slate-600 group-hover:text-slate-900"}
                      `}
                    >
                      {nb.name}
                    </span>
                  )}
                </div>

                {/* Options Menu Dot (unhidden on hover or when open) */}
                {!isEditing && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === nb.id ? null : nb.id);
                      }}
                      className={`
                        p-1 rounded-lg transition-opacity duration-200 cursor-pointer
                        ${
                          activeMenuId === nb.id
                            ? "opacity-100 text-slate-800 bg-slate-100"
                            : "opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        }
                      `}
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>

                    {/* Dropdown Options */}
                    {activeMenuId === nb.id && (
                      <div
                        ref={menuRef}
                        className="absolute left-full ml-1 top-0 w-32 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 animate-[dropdownSnap_200ms_cubic-bezier(0.16,1,0.3,1)]"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingNotebookId(nb.id);
                            setEditName(nb.name);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Edit2 className="h-3 w-3" />
                          <span>Rename</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(nb.id, nb.name);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding Area */}
      <div className="p-4 border-t border-slate-100 shrink-0 relative z-10 space-y-1 bg-[#F8FAFC]">
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 hover:text-slate-700 rounded-lg py-1 px-1 transition-all">
          <Settings className="w-3.5 h-3.5" />
          <span>System Settings</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 hover:text-slate-700 rounded-lg py-1 px-1 transition-all">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>All Sync Completed</span>
        </div>
      </div>

      {/* Notebook Creation Modal */}
      <CreateNotebookModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={createNotebook}
      />
    </aside>
  );
};
export default NotebookSidebar;
