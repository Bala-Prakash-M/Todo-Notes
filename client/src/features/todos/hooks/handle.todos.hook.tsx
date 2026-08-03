import { useEffect, useState, useCallback } from "react";
import { todosAPI } from "../api/api";
import type { Todo } from "../types/todo.types";

export const useTodos = () => {
  // `loading`  → true only during the initial fetch (shows full-screen spinner)
  // `mutating` → true during toggle/delete (keeps list visible, used for per-item feedback)
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await todosAPI.getAll();
        setTodos(response.todos);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [setTodos]);

  const handleToggleComplete = useCallback(
    async (todo: Todo) => {
      if (mutating) return; 

      setMutating(true);
      try {
        const updatedTodo = await todosAPI.updateTodo(todo.id, {
          title: todo.title,
          completed: !todo.completed,
        });

        // Sync with the server's confirmed data
        setTodos((prev) =>
          prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
        );
      } catch (error) {
        console.error("Toggle failed, rolling back:", error);
        // Roll back the optimistic update on error
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todo.id ? { ...t, completed: todo.completed } : t,
          ),
        );
      } finally {
        setMutating(false);
      }
    },
    [mutating, setTodos],
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      if (mutating) return;      
      setMutating(true);
      try {
        await todosAPI.deleteTodo(id);
        setTodos((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Delete failed, re-fetching:", error);
        // On failure, re-fetch to restore the correct state
        try {
          const response = await todosAPI.getAll();
          setTodos(response.todos);
        } catch (fetchError) {
          console.error(fetchError);
        }
      } finally {
        setMutating(false);
      }
    },
    [mutating, setTodos],
  );

  const handleCreateTodo = useCallback(
    async (title: string) => {
      if (mutating) return;
      setMutating(true);

      try {
        const newTodo = await todosAPI.createTodo(title);
        setTodos(prev => [...prev, newTodo]);
      } catch (error) {
        console.error("Create failed, re-fetching:", error);
        // On failure, re-fetch to restore the correct state
        try {
          const response = await todosAPI.getAll();
          setTodos(response.todos);
        } catch (fetchError) {
          console.error(fetchError);
        }
      } finally {
        setMutating(false);
      }
    },
    [mutating, setTodos]
  )

  const formatDetailedTimestamp = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const calendarDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const clockTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return `${dayName}, ${calendarDate} at ${clockTime}`;
    } catch {
      return "Date verification unmapped";
    }
  };

  const formatted = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(currentTime);

  return {
    loading,
    mutating,
    handleToggleComplete,
    handleDeleteTask,
    formatDetailedTimestamp,
    formatted,
    currentTime,
    setCurrentTime,
    todos,
    setTodos,
    handleCreateTodo,
  };
};
