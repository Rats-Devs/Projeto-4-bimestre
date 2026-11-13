
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Film as FilmIcon,
    Plus,
    Search,
    RefreshCw,
    Pencil,
    Trash2,
    Clock3
} from "lucide-react";

import { useFilms, useFilmMutations } from "../hooks/useFilms";
import { getApiErrorMessage } from "../services/api";

export default function Films() {
    // Guarda o texto digitado no campo de pesquisa.
    const [search, setSearch] = useState("");

    // Busca os filmes cadastrados na API.
    const {
        data = [],
        isLoading,
        isError,
        refetch,
        isFetching
    } = useFilms();

    // Obtém a função responsável por excluir filmes.
    const { remove } = useFilmMutations();

    // Filtra os filmes conforme o texto pesquisado.
    // useMemo evita recalcular a lista sem necessidade.
    const filtered = useMemo(
        () =>
            data.filter((f) =>
                `${f.titulo} ${f.genero} ${f.diretor}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ),
        [data, search]
    );

    // Confirma e executa a exclusão de um filme.
    async function deleteFilm(id: number, title: string) {
        const confirmed = window.confirm(
            `Deseja realmente excluir "${title}"? Essa ação não pode ser desfeita.`
        );

        if (!confirmed) return;

        try {
            await remove.mutateAsync(id);
        } catch (e) {
            window.alert(getApiErrorMessage(e));
        }
    }

    return (
        <>
            {/* Cabeçalho da página */}
            <div className="page-heading">
                <div>
                    <div className="eyebrow">CATÁLOGO</div>
                    <h1>Filmes</h1>
                    <p>
                        Consulte e gerencie os filmes cadastrados no Cinemax.
                    </p>
                </div>

                <Link
                    to="/filmes/novo"
                    className="button button-primary"
                >
                    <Plus size={17} />
                    Novo filme
                </Link>
            </div>

            {/* Barra de pesquisa e atualização */}
            <div className="toolbar">
                <div className="search-box">
                    <Search size={17} />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por título, gênero ou diretor..."
                    />
                </div>

                <button
                    className="button button-ghost"
                    onClick={() => refetch()}
                    disabled={isFetching}
                >
                    <RefreshCw
                        size={16}
                        className={isFetching ? "spin" : ""}
                    />
                    Atualizar
                </button>
            </div>

            {/* Mensagem caso ocorra um erro na API */}
            {isError && (
                <div className="alert-error">
                    Não foi possível consultar a API.
                    Confira a conexão e tente novamente.
                </div>
            )}

            {/* Exibe o carregamento, os filmes ou o estado vazio */}
            {isLoading ? (
                <div className="loading-state">
                    Carregando filmes...
                </div>
            ) : filtered.length ? (
                <div className="film-grid">
                    {filtered.map((f) => (
                        <article
                            className="film-card"
                            key={f.idFilme}
                        >
                            {/* Pôster e classificação indicativa */}
                            <div className="film-poster">
                                {f.urlImagem ? (
                                    <img
                                        src={f.urlImagem}
                                        alt={`Pôster de ${f.titulo}`}
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                ) : (
                                    <div className="poster-fallback">
                                        <FilmIcon size={34} />
                                        <span>Sem imagem</span>
                                    </div>
                                )}

                                <span className="age-tag">
                                    {f.classificacaoIdade} anos
                                </span>
                            </div>

                            {/* Informações principais do filme */}
                            <div className="film-content">
                                <div className="film-title-row">
                                    <h3>{f.titulo}</h3>

                                    <span className="film-year">
                                        {f.anoLancamento}
                                    </span>
                                </div>

                                <p>
                                    {f.genero} · {f.diretor}
                                </p>

                                {/* Duração e identificador */}
                                <div className="film-meta">
                                    <span>
                                        <Clock3 size={14} />
                                        {f.duracao} min
                                    </span>

                                    <span>
                                        ID #{f.idFilme}
                                    </span>
                                </div>

                                {/* Ações disponíveis para cada filme */}
                                <div className="film-actions">
                                    <Link
                                        className="button button-ghost button-small"
                                        to={`/filmes/${f.idFilme}/editar`}
                                    >
                                        <Pencil size={14} />
                                        Editar
                                    </Link>

                                    <button
                                        className="button button-danger button-small"
                                        onClick={() =>
                                            deleteFilm(f.idFilme, f.titulo)
                                        }
                                        disabled={remove.isPending}
                                    >
                                        <Trash2 size={14} />
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                // Mensagem exibida quando não existem resultados.
                <div className="empty-state">
                    <FilmIcon size={32} />

                    <strong>
                        {search
                            ? "Nenhum resultado encontrado"
                            : "Seu catálogo está vazio"}
                    </strong>

                    <span>
                        {search
                            ? "Tente outro termo de pesquisa."
                            : "Quando houver filmes na API, eles aparecerão aqui."}
                    </span>
                </div>
            )}

            {/* Quantidade de resultados encontrados */}
            <div className="result-count">
                {filtered.length} de {data.length} filme(s)
            </div>
        </>
    );
}
