import { api } from "../../../services/api";
import type {
  Notebook,
  GetAllNotebook,
  GetAllNotebookResponse,
} from "../types/notebook.types";

export const notebookAPI = {
  async createNotebook(name: string): Promise<Notebook> {
    const response = await api.post<{ data: Notebook }>(
      "/notebook",
      { name }
    );
    return response.data.data;
  },

  async getAllNotebooks(): Promise<GetAllNotebook[]> {
    const response = await api.get<GetAllNotebookResponse>("/notebook");
    return response.data.data;
  },

  async updateNotebook(id: string, name: string): Promise<Notebook> {
    const response = await api.patch<{ data: Notebook }>(
      `/notebook/${id}`,
      { name }
    );
    return response.data.data;
  },

  async deleteNotebook(id: string): Promise<void> {
    await api.delete(`/notebook/${id}`);
  }
};
