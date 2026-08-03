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
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { Variants } from "framer-motion";
import useNotebook from "../../notebooks/hooks/notebook.hook";
import { CreateNotebookModal } from "../../notebooks/components/CreateNotebookPopup";
import useScreenSize from "../../../shared/hooks/useScreenSize";
import { useAuthContext } from "../../../app/providers/AuthContext";

interface NotebookSidebarProps {
  onToggleCollapse?: () => void;
  isCollapsed?: boolean;
}

// Bouncy spring constant matrix matching premium platform physics
const sidebarSpringPhysics = {
  type: "spring" as const, // <-- Add 'as const' here
  stiffness: 230,
  damping: 30,
  mass: 0.9,
};

const activePillSpringPhysics = {
  type: "spring" as const, // <-- Add 'as const' here
  stiffness: 550,
  damping: 28,
  mass: 0.55,
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 450, damping: 22, mass: 0.6 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.12 } },
};

export const NotebookSidebar: React.FC<NotebookSidebarProps> = ({
  onToggleCollapse,
  isCollapsed = false,
}) => {
  const navigate = useNavigate();
  const { notebookId } = useParams<{ notebookId: string }>();
  const { isMobile } = useScreenSize();
  const { user } = useAuthContext();
  const userName = user?.name || "Anastasia";
  const email = user?.email || "anastasia@icylab.co";

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
  const [editingNotebookId, setEditingNotebookId] = useState<string | null>(
    null,
  );
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
    if (
      confirm(
        `Are you sure you want to delete the space "${name}"? This will delete all notes inside it.`,
      )
    ) {
      try {
        await deleteNotebook(id);
        setActiveMenuId(null);
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
    <LayoutGroup id="notebook-sidebar-group">
      <motion.aside
        layout
        initial={false}
        animate={{
          width: isCollapsed ? 0 : 256,
          borderRightWidth: isCollapsed ? 0 : 1,
        }}
        transition={sidebarSpringPhysics}
        className="relative border-r border-slate-200/60 bg-slate-50/50 flex flex-col justify-between shrink-0 h-full select-none overflow-hidden antialiased"
      >
        {/* Dynamic Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-slate-600 blur-[120px]" />
        </div>

        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 0 : 1,
            x: isCollapsed ? -24 : 0,
            scale: isCollapsed ? 0.985 : 1,
          }}
          transition={{
            opacity: { duration: 0.18, ease: "easeOut" },
            x: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          }}
          className="flex-1 flex flex-col min-h-0 relative z-10 w-64"
        >
          {/* Profile Card Header */}
          <div className="px-5 pt-7 pb-4 border-b border-slate-200/40 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-sans text-xs font-semibold tracking-wider flex items-center justify-center border border-slate-950/10 shadow-sm shrink-0 select-none">
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
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors cursor-pointer"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </motion.div>
              </motion.button>
            )}
          </div>

          {/* Global Navigation */}
          <div className="p-3 border-b border-slate-200/40 space-y-0.5">
            <Link
              to="/notebooks"
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/35 rounded-lg transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>All Spaces</span>
            </Link>
            <Link
              to="/tasks"
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/35 rounded-lg transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Tasks Ledger</span>
            </Link>
          </div>

          {/* Notebooks List Header */}
          <div className="px-5 pt-5 pb-2 flex items-center justify-between shrink-0">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Notebook Spaces
            </span>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsCreateOpen(true)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/40 transition-colors cursor-pointer"
              title="Create Notebook Space"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.2]" />
            </motion.button>
          </div>

          {/* Scrolling Notebook List */}
          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="popLayout">
              {isNotebookLoading && notebooks.length === 0 && (
                <motion.div
                  key="loading-spaces"
                  exit={{ opacity: 0 }}
                  className="px-4 py-6 text-center text-xs text-slate-400 animate-pulse font-medium"
                >
                  Loading spaces...
                </motion.div>
              )}

              {!isNotebookLoading && notebooks.length === 0 && (
                <motion.div
                  key="empty-spaces"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-8 text-center border border-dashed border-slate-200 rounded-xl mx-2 mt-2 bg-white/40"
                >
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    No spaces created.
                  </p>
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="mt-2 text-[10px] font-semibold text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                  >
                    Create one now
                  </button>
                </motion.div>
              )}

              {!isNotebookLoading && notebooks.length > 0 && (
                <motion.div
                  key="notebooks-container"
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-0.5"
                >
                  {notebooks.map((nb) => {
                    const isSelected = nb.id === notebookId;
                    const { theme } = getNotebookStyles(nb.id);
                    const isEditing = editingNotebookId === nb.id;

                    return (
                      <motion.div
                        key={nb.id}
                        variants={listItemVariants}
                        layout="position"
                        className={`
          group relative flex items-center justify-between rounded-lg pl-3 pr-2 py-2 transition-all duration-300 transform-gpu
          hover:-translate-y-[1px] active:translate-y-0
          ${
            isSelected
              ? "bg-white border border-slate-200/60 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.02)]"
              : "border border-transparent hover:bg-slate-200/35 hover:shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
          }
        `}
                      >
                        {/* Understated sliding active selection tracking capsule */}
                        {isSelected && (
                          <motion.div
                            layoutId="selectedNotebookSpacePill"
                            className="absolute inset-0 border border-slate-200/80 rounded-lg pointer-events-none"
                            initial={{ borderRadius: "8px" }}
                            transition={activePillSpringPhysics}
                          />
                        )}

                        {/* 
          ELEGANT MARGIN REPLACEMENT: 
          An understated left-border anchor block that renders the theme accent context safely
          without throwing busy, disjointed shapes into the horizontal text flow.
        */}
                        <div
                          className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r transition-transform duration-200 scale-y-70 group-hover:scale-y-100 opacity-80 group-hover:opacity-100"
                          style={{ backgroundColor: theme.accent }}
                        />

                        <div
                          className="flex items-center min-w-0 flex-1 cursor-pointer relative z-10 pl-1.5"
                          onClick={() =>
                            !isEditing && handleNotebookSelect(nb.id)
                          }
                        >
                          {isEditing ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              onBlur={() => handleRenameSubmit(nb.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleRenameSubmit(nb.id);
                                if (e.key === "Escape")
                                  setEditingNotebookId(null);
                              }}
                              autoFocus
                              className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded px-1.5 py-0.5 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-500/5"
                            />
                          ) : (
                            <span
                              className={`
                text-xs tracking-tight truncate font-sans transition-colors duration-200
                ${isSelected ? "text-slate-900 font-semibold" : "text-slate-600 group-hover:text-slate-900"}
              `}
                            >
                              {nb.name}
                            </span>
                          )}
                        </div>

                        {/* Options Menu Dot Component Layer */}
                        {!isEditing && (
                          <div className="relative z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(
                                  activeMenuId === nb.id ? null : nb.id,
                                );
                              }}
                              className={`
                p-1 rounded-md transition-all duration-200 cursor-pointer
                ${
                  activeMenuId === nb.id
                    ? "opacity-100 text-slate-800 bg-slate-200/60"
                    : "opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
                }
              `}
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>

                            {/* Dropdown Options Context Drawer */}
                            <AnimatePresence>
                              {activeMenuId === nb.id && (
                                <motion.div
                                  ref={menuRef}
                                  initial={{ opacity: 0, scale: 0.95, x: 4 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{
                                    type: "spring" as const,
                                    stiffness: 500,
                                    damping: 25,
                                  }}
                                  className="absolute left-full ml-1.5 top-0 w-32 bg-white border border-slate-200/80 rounded-lg shadow-md py-1 z-50 origin-top-left"
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingNotebookId(nb.id);
                                      setEditName(nb.name);
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full text-left px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
                                  >
                                    <Edit2 className="h-3 w-3 text-slate-400" />
                                    <span>Rename</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClick(nb.id, nb.name);
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full text-left px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50/60 flex items-center gap-2 cursor-pointer transition-colors"
                                  >
                                    <Trash2 className="h-3 w-3 text-rose-400" />
                                    <span>Delete</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer Branding Area */}
        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 0 : 1,
            x: isCollapsed ? -20 : 0,
          }}
          transition={{
            opacity: { duration: 0.16, ease: "easeOut" },
            x: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
          }}
          className="p-3.5 border-t border-slate-200/40 shrink-0 relative z-10 space-y-0.5 bg-slate-50/50 w-64"
        >
          <div className="flex items-center gap-2.5 text-[10px] font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-200/30 rounded-lg py-1.5 px-2 transition-colors cursor-default">
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>System Settings</span>
          </div>
          <div className="flex items-center gap-2.5 text-[10px] font-semibold text-slate-400 rounded-lg py-1.5 px-2 cursor-default">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500/80 tracking-wide" />
            <span>All Sync Completed</span>
          </div>
        </motion.div>

        {/* Notebook Creation Modal */}
        <CreateNotebookModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={createNotebook}
        />
      </motion.aside>
    </LayoutGroup>
  );
};

export default NotebookSidebar;
