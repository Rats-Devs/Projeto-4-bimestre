
// =========================================
// 1. IMPORTAÇÕES
// =========================================

// Hook responsável pelas operações com filmes
import { useFilmMutations } from "../hooks/useFilms";

// Função para tratar mensagens de erro da API
import { getApiErrorMessage } from "../services/api";

// Componente de formulário
import FilmForm from "../components/FilmForm";

// Tipo dos dados enviados para a API
import type { FilmeRequest } from "../types/film";

// =========================================
// 2. COMPONENTE DE CADASTRO
// =========================================

export default function CreateFilm() {

    // Obtém a função responsável por cadastrar filmes
    const { create } = useFilmMutations();

    // =========================================
    // 3. FUNÇÃO PARA SALVAR O FILME
    // =========================================

    async function save(payload: FilmeRequest) {
        try {

            // Executa o cadastro enviando os dados do formulário
            await create.mutateAsync(payload);

        } catch (e) {

            // Converte o erro da API em uma mensagem compreensível
            throw new Error(getApiErrorMessage(e));

        }
    }

    // =========================================
    // 4. INTERFACE DA PÁGINA
    // =========================================

    return (
        <>
            {/* Cabeçalho da página */}
            <div className="page-heading">

                <div>

                    <div className="eyebrow">
                        CATÁLOGO / NOVO
                    </div>

                    <h1>Cadastrar filme</h1>

                    <p>
                        Adicione um novo título ao catálogo do Cinemax.
                    </p>

                </div>

            </div>

            {/* Formulário de cadastro */}
            <FilmForm
                onSave={save}
                busy={create.isPending}
                submitLabel="Cadastrar filme"
            />
        </>
    );
}
