
import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import { filmService } from "../services/filmService";
import type { FilmeRequest } from "../types/film";

// Chave utilizada pelo React Query para identificar a lista de filmes.
export const filmsKey = ["films"];

// Hook responsável por buscar todos os filmes na API.
export function useFilms() {
    return useQuery({
        queryKey: filmsKey,
        queryFn: filmService.list
    });
}

// Hook responsável pelas operações de cadastro, edição e exclusão.
export function useFilmMutations() {
    // Permite controlar e atualizar o cache do React Query.
    const client = useQueryClient();

    // Invalida o cache da lista para que os dados sejam consultados novamente.
    const refresh = () =>
        client.invalidateQueries({
            queryKey: filmsKey
        });

    // Cadastra um novo filme.
    const create = useMutation({
        mutationFn: (payload: FilmeRequest) =>
            filmService.create(payload),

        onSuccess: refresh
    });

    // Atualiza os dados de um filme existente.
    const update = useMutation({
        mutationFn: ({
            id,
            payload
        }: {
            id: number;
            payload: FilmeRequest;
        }) => filmService.update(id, payload),

        onSuccess: refresh
    });

    // Exclui um filme pelo seu identificador.
    const remove = useMutation({
        mutationFn: (id: number) =>
            filmService.remove(id),

        onSuccess: refresh
    });

    // Disponibiliza as três operações para as páginas.
    return {
        create,
        update,
        remove
    };
}
