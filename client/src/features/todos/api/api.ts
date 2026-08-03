import { api } from "../../../services/api";
import type { GetAllTodoResponse, Todo } from "../types/todo.types";

export const todosAPI = {
  async getAll(): Promise<GetAllTodoResponse> {
    const response = await api.get<GetAllTodoResponse>("/todo");
    return response.data;
  },

  async updateTodo(id: string, data: object): Promise<Todo> { 
    const response = await api.put<{ data: Todo }>(
      `/todo/${id}`,
      data
    );
    return response.data.data;
  },

  async createTodo(title: string): Promise<Todo> {
    const response = await api.post<{ data: Todo }>(
      '/todo',
      { title }
    );
    return response.data.data;
  },

  async deleteTodo(id: string): Promise<void> {
    await api.delete<void>(`/todo/${id}`);
  }
};