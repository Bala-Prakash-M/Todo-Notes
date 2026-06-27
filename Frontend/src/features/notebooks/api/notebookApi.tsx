import { api } from "../../../services/api";
import type {
  Notebook,
  GetAllNotebook,
  GetAllNotebookResponse,
} from "../types/notebook.types";

export const notebookAPI = {
  async createNotebook(
    token: string,
    name: string
  ): Promise<Notebook> {
    const response = await api.post<{ data: Notebook }>(
      "/notebook",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
    );

    return response.data.data;
  },

  async getAllNotebooks(
    token: string,
  ): Promise<GetAllNotebook[]> {
    const response = await api.get<GetAllNotebookResponse>(
      "/notebook",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  }
}
