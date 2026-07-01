import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NotebookSidebar } from "../components/NotebookSidebar";
import { NotesPanel } from "../components/NotesPanel";
import { EditorPanel } from "../components/EditorPanel";
import useNotes from "../hooks/notes.hook";
import useNotebook from "../../notebooks/hooks/notebook.hook";
import useScreenSize from "../../../shared/hooks/useScreenSize";
import { Menu, ChevronLeft } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";

export const WorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const { notebookId } = useParams<{ notebookId: string }>();
  const { isMobile, isPad } = useScreenSize();

  // Load notebooks and notes
  const { notebooks } = useNotebook();
  const {
    notes,
    isNotesLoading,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  // Selection & UI States
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const shouldCollapse = isMobile || isPad;
    const timer = setTimeout(() => {
      setIsSidebarCollapsed(shouldCollapse);
    }, 0);
    return () => clearTimeout(timer);
  }, [isMobile, isPad]);

  // Reset selected note when notebook ID shifts
  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedNoteId(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [notebookId]);

  // Auto-select first notebook if accessed from generic or invalid URL (normally handled by router)
  useEffect(() => {
    if (notebooks.length > 0 && !notebookId) {
      navigate(`/${notebooks[0].id}`, { replace: true });
    }
  }, [notebooks, notebookId, navigate]);

  // Lookup active notebook metadata
  const activeNotebook = notebooks.find((nb) => nb.id === notebookId);
  const activeNotebookName = activeNotebook ? activeNotebook.name : "Active Space";

  // Select matching active note details
  const activeNote = notes.find((n) => n.id === selectedNoteId) || null;

  // Handle Note CRUD Operations
  const handleNoteCreate = async () => {
    try {
      // Create empty note with placeholder title
      await createNote("Untitled Draft", "");
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  const handleNoteSave = async (id: string, title: string, content: string) => {
    try {
      await updateNote(id, title, content);
    } catch (err) {
      console.error("Failed to save note:", err);
      throw err;
    }
  };

  const handleNoteDelete = async (id: string) => {
    try {
      await deleteNote(id);
      if (selectedNoteId === id) {
        setSelectedNoteId(null);
      }
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  // Responsive UI Render Flow
  if (isMobile) {
    return (
      <div className="flex h-screen w-full bg-white overflow-hidden relative">
        {/* Mobile Drawer Overlay for Notebook Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-neutral-950/20 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            {/* Drawer */}
            <div className="relative flex w-64 max-w-xs flex-1 flex-col bg-white shadow-xl animate-[slideInLeft_0.3s_cubic-bezier(0.16,1,0.3,1)]">
              <div className="absolute right-2 top-2 p-1">
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <NotebookSidebar
                isCollapsed={false}
                onToggleCollapse={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* 1. Mobile Editor View (If note selected) */}
        {selectedNoteId ? (
          <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Simple mobile header helper to return back to notes stream */}
            <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex items-center shrink-0">
              <button
                onClick={() => setSelectedNoteId(null)}
                className="flex items-center gap-1 text-xs text-slate-500 font-medium hover:text-slate-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to reflections
              </button>
            </div>
            <EditorPanel
              note={activeNote}
              onSave={handleNoteSave}
              onDelete={handleNoteDelete}
              isDistractionFree={true}
              onToggleDistractionFree={() => {}}
              isSidebarCollapsed={true}
              onToggleSidebar={() => {}}
            />
          </div>
        ) : (
          /* 2. Mobile Notes List View (If no note selected) */
          <div className="flex-1 flex flex-col h-full">
            <header className="h-14 border-b border-slate-200/60 bg-white flex items-center px-4 shrink-0 justify-between">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-slate-500">Reflections Stream</span>
              <div className="w-8" /> {/* Balance spacer */}
            </header>
            <div className="flex-1 overflow-hidden">
              <NotesPanel
                notes={notes}
                selectedNoteId={selectedNoteId}
                onNoteSelect={setSelectedNoteId}
                onNoteCreate={handleNoteCreate}
                isLoading={isNotesLoading}
                notebookName={activeNotebookName}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop / Tablet layout (3-Panel responsive setup)
  return (
    <LayoutGroup id="workspace-panels">
      <motion.div layout className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
        {/* Dynamic Slide-in Left Panel (Notebook Sidebar) */}
        <NotebookSidebar
          isCollapsed={isSidebarCollapsed || isDistractionFree}
          onToggleCollapse={() => setIsSidebarCollapsed(true)}
        />

        {/* Middle Panel (Notes stream list) */}
        {!isDistractionFree && (
          <motion.div layout className="shrink-0">
            <NotesPanel
              notes={notes}
              selectedNoteId={selectedNoteId}
              onNoteSelect={setSelectedNoteId}
              onNoteCreate={handleNoteCreate}
              isLoading={isNotesLoading}
              notebookName={activeNotebookName}
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={() => setIsSidebarCollapsed(false)}
            />
          </motion.div>
        )}

        {/* Right Panel (Tiptap writing canvas) */}
        <motion.div layout className="flex min-w-0 flex-1">
          <EditorPanel
            note={activeNote}
            onSave={handleNoteSave}
            onDelete={handleNoteDelete}
            isDistractionFree={isDistractionFree}
            onToggleDistractionFree={() => setIsDistractionFree(!isDistractionFree)}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={() => setIsSidebarCollapsed(false)}
          />
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};
export default WorkspacePage;
