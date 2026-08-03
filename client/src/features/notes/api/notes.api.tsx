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
  },

  async createNote(
    token: string,
    notebookId: string,
    title: string,
    content: string
  ): Promise<Note> {
    const response = await api.post<{ data: Note }>(
      `/notes/${notebookId}`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  },

  async updateNote(
    token: string,
    notebookId: string,
    id: string,
    title: string,
    content: string
  ): Promise<Note> {
    const response = await api.put<{ data: Note }>(
      `/notes/${notebookId}/${id}`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  },

  async deleteNote(
    token: string,
    notebookId: string,
    id: string
  ): Promise<void> {
    await api.delete(
      `/notes/${notebookId}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};