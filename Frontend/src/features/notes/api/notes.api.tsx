import { api } from "../../../services/api";
import type { Note, NotesResponse } from "../types/notes.types";

export const notesAPI = {
  async getAllNotes(token: string, notebookId: string): Promise<Note[]> {
    const response = await api.get<NotesResponse>(
      `/notes/${notebookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  }
}