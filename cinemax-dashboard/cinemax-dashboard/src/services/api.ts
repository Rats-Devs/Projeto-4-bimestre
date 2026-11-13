import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:5160").replace(/\/$/, "");

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 12_000
});

export function getApiBaseUrl() {
  return baseURL;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") return "A API demorou demais para responder.";
    if (!error.response) return "Não foi possível conectar à API. Confira se ela está em execução e se o endereço está correto.";
    if (error.response.status === 404) return "O recurso solicitado não foi encontrado.";
    if (error.response.status >= 500) return "A API encontrou um erro interno.";
    const data = error.response.data as { title?: string; message?: string; detail?: string } | string | undefined;
    if (typeof data === "string") return data;
    return data?.detail || data?.message || data?.title || `Erro HTTP ${error.response.status}.`;
  }
  return "Ocorreu um erro inesperado.";
}