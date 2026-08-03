import { api } from "../../../services/api";
import type { GetAllTodoResponse, Todo } from "../types/todo.types";

export const todosAPI = {

  async getAll(
    token: string
  ): Promise<GetAllTodoResponse> {
    const response =
      await api.get<GetAllTodoResponse>(
        "/todo",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  },

  async updateTodo(token: string, id: string, data: object): Promise<Todo> { 
    const response = await api.put<{ data: Todo }>(
      `/todo/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Backend wraps the todo in { data: Todo }, so unwrap here
    return response.data.data;
  },

  async createTodo(token: string, title: string): Promise<Todo> {
    const response = await api.post<{ data: Todo }>(
      '/todo',
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Backend wraps the created todo in { data: Todo }, so unwrap here
    return response.data.data;
  },

  async deleteTodo(token: string, id: string): Promise<void> {
    await api.delete<void>(
      `/todo/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

}