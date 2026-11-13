
// =========================================
// 1. IMPORTAÇÕES
// =========================================

// Hook para acessar parâmetros da URL
import { useParams } from "react-router-dom";

// Hook para realizar consultas à API
import { useQuery } from "@tanstack/react-query";

// Componente de formulário
import FilmForm from "../components/FilmForm";

// Serviço responsável pelas operações com filmes
import { filmService } from "../services/filmService";

// Hook responsável pelas alterações dos filmes
import { useFilmMutations } from "../hooks/useFilms";

// Função para tratar erros da API
import { getApiErrorMessage } from "../services/api";

// Tipo dos dados enviados para a API
import type { FilmeRequest } from "../types/film";

// =========================================
// 2. COMPONENTE DE EDIÇÃO
// =========================================

export default function EditFilm() {

    // Obtém o ID do filme presente na URL
    const id = Number(useParams().id);

    // =========================================
    // 3. BUSCA DOS DADOS DO FILME
    // =========================================

    const query = useQuery({
        // Identifica essa consulta no React Query
        queryKey: ["film", id],

        // Busca os dados do filme pelo ID
        queryFn: () => filmService.getById(id),

        // Só executa a consulta se o ID for válido
        enabled: Number.isInteger(id) && id > 0
    });

    // Obtém a função responsável por atualizar filmes
    const { update } = useFilmMutations();

    // =========================================
    // 4. FUNÇÃO PARA SALVAR AS ALTERAÇÕES
    // =========================================

    async function save(payload: FilmeRequest) {

        try {

            // Envia o ID e os novos dados para atualização
            await update.mutateAsync({
                id,
                payload
            });

        } catch (e) {

            // Converte o erro da API em uma mensagem compreensível
            throw new Error(getApiErrorMessage(e));

        }
    }

    // =========================================
    // 5. VALIDAÇÃO DO IDENTIFICADOR
    // =========================================

    // Verifica se o ID é um número inteiro positivo
    if (!Number.isInteger(id) || id <= 0) {

        return (
            <div className="alert-error">
                Identificador de filme inválido.
            </div>
        );
    }

    // =========================================
    // 6. ESTADO DE CARREGAMENTO
    // =========================================

    // Enquanto os dados estão sendo carregados
    if (query.isLoading) {

        return (
            <div className="loading-state">
                Carregando dados do filme...
            </div>
        );
    }

    // =========================================
    // 7. TRATAMENTO DE ERROS
    // =========================================

    // Verifica se ocorreu um erro ou se o filme não existe
    if (query.isError || !query.data) {

        return (
            <div className="alert-error">
                Não foi possível encontrar esse filme na API.
            </div>
        );
    }

    // =========================================
    // 8. INTERFACE DE EDIÇÃO
    // =========================================

    return (
        <>

            {/* Cabeçalho da página */}
            <div className="page-heading">

                <div>

                    <div className="eyebrow">
                        CATÁLOGO / EDIÇÃO
                    </div>

                    <h1>Editar filme</h1>

                    <p>
                        Atualize as informações de {query.data.titulo}.
                    </p>

                </div>

            </div>

            {/* Formulário preenchido com os dados existentes */}
            <FilmForm
                initial={query.data}
                onSave={save}
                busy={update.isPending}
                submitLabel="Salvar alterações"
            />

        </>
    );
}
