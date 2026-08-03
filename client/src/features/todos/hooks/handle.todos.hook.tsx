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
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (!token) return;
        const response = await todosAPI.getAll(token);
        setTodos(response.todos);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [token, setTodos]);

  const handleToggleComplete = useCallback(
    async (todo: Todo) => {
      if (mutating) return; 

      setMutating(true);
      try {
        const updatedTodo = await todosAPI.updateTodo(token!, todo.id, {
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
    [token, mutating, setTodos],
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      if (mutating) return;      
      setMutating(true);
      try {
        await todosAPI.deleteTodo(token!, id);
        setTodos((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Delete failed, re-fetching:", error);
        // On failure, re-fetch to restore the correct state
        try {
          if (token) {
            const response = await todosAPI.getAll(token);
            setTodos(response.todos);
          }
        } catch (fetchError) {
          console.error(fetchError);
        }
      } finally {
        setMutating(false);
      }
    },
    [token, mutating, setTodos],
  );

  const handleCreateTodo = useCallback(
    async (title: string) => {

      if (mutating) return;

      setMutating(true);

      try {

        const newTodo = await todosAPI.createTodo(token!, title);

        setTodos(prev => [...prev, newTodo]);

      } catch (error) {
        console.error("Delete failed, re-fetching:", error);
        // On failure, re-fetch to restore the correct state
        try {
          if (token) {
            const response = await todosAPI.getAll(token);
            setTodos(response.todos);
          }
        } catch (fetchError) {
          console.error(fetchError);
        }
      } finally {
        setMutating(false);
      }

    },
    [token, mutating, setTodos]
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
