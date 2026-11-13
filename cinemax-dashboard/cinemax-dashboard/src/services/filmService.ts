import { api } from "./api";
import type { Filme, FilmeRequest } from "../types/film";

export const filmService = {
  async list(): Promise<Filme[]> {
    const { data } = await api.get<Filme[]>("/api/Filme");
    if (!Array.isArray(data)) throw new Error("A API não retornou uma lista de filmes válida.");
    return data;
  },
  async getById(id: number): Promise<Filme> {
    const { data } = await api.get<Filme>(`/api/Filme/${id}`);
    return data;
  },
  async create(payload: FilmeRequest): Promise<Filme> {
    const { data } = await api.post<Filme>("/api/Filme", payload);
    return data;
  },
  async update(id: number, payload: FilmeRequest): Promise<void> {
    await api.put(`/api/Filme/${id}`, payload);
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/api/Filme/${id}`);
  }
};