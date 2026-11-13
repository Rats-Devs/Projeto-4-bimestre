
// =========================================
// 1. IMPORTAÇÕES
// =========================================

// Componentes de navegação
import { Link } from "react-router-dom";

// Ícones utilizados na interface
import {
    Film,
    Plus,
    RefreshCw,
    Clock3,
    ArrowRight
} from "lucide-react";

// Hook responsável por buscar os filmes
import { useFilms } from "../hooks/useFilms";

// Componente que exibe o estado da API
import ApiStatus from "../components/ApiStatus";

// =========================================
// 2. COMPONENTE DASHBOARD
// =========================================

export default function Dashboard() {

    // Busca os dados dos filmes e os estados da requisição
    const {
        data = [],
        isLoading,
        isError,
        refetch,
        isFetching
    } = useFilms();

    // Seleciona os últimos cinco filmes da lista
    const recent = [...data]
        .slice(-5)
        .reverse();

    // =========================================
    // 3. INTERFACE DO PAINEL
    // =========================================

    return (
        <>

            {/* Cabeçalho do dashboard */}
            <div className="page-heading">

                <div>

                    <div className="eyebrow">
                        PAINEL DE CONTROLE
                    </div>

                    <h1>Visão geral</h1>

                    <p>
                        Gerencie o catálogo de filmes do Cinemax.
                    </p>

                </div>

                {/* Atalho para cadastrar um novo filme */}
                <Link
                    to="/filmes/novo"
                    className="button button-primary"
                >
                    <Plus size={17} />
                    Novo filme
                </Link>

            </div>

            {/* Status da conexão com a API */}
            <ApiStatus />

            {/* Mensagem exibida quando ocorre um erro */}
            {isError && (
                <div className="alert-error">
                    Não foi possível carregar os filmes.
                    Verifique a API e tente novamente.
                </div>
            )}

            {/* =========================================
                4. CARDS DE ESTATÍSTICAS
            ========================================= */}

            <section className="stats-grid">

                {/* Quantidade total de filmes */}
                <article className="stat-card">

                    <div className="stat-icon red">
                        <Film />
                    </div>

                    <div>

                        <span>Total de filmes</span>

                        <strong>
                            {isLoading ? "—" : data.length}
                        </strong>

                        <small>
                            Registros retornados pela API
                        </small>

                    </div>

                </article>

                {/* Situação atual do catálogo */}
                <article className="stat-card">

                    <div className="stat-icon muted">
                        <Clock3 />
                    </div>

                    <div>

                        <span>Catálogo</span>

                        <strong>
                            {isLoading
                                ? "—"
                                : data.length
                                    ? "Ativo"
                                    : "Vazio"
                            }
                        </strong>

                        <small>
                            Status dos registros
                        </small>

                    </div>

                </article>

            </section>

            {/* =========================================
                5. LISTA DE FILMES RECENTES
            ========================================= */}

            <section className="panel">

                {/* Cabeçalho da lista */}
                <div className="panel-heading">

                    <div>

                        <h2>
                            Filmes cadastrados recentemente
                        </h2>

                        <p>
                            Últimos itens na lista retornada pela API.
                        </p>

                    </div>

                    {/* Botão para atualizar os dados */}
                    <button
                        className="button button-ghost button-small"
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        <RefreshCw
                            size={15}
                            className={isFetching ? "spin" : ""}
                        />

                        Atualizar
                    </button>

                </div>

                {/* =========================================
                    6. ESTADOS DA LISTAGEM
                ========================================= */}

                {isLoading ? (

                    // Estado de carregamento
                    <div className="loading-state">
                        Carregando catálogo...
                    </div>

                ) : recent.length ? (

                    // Exibe os cinco filmes mais recentes
                    <div className="recent-list">

                        {recent.map((f) => (

                            <div
                                className="recent-item"
                                key={f.idFilme}
                            >

                                {/* Imagem ou ícone padrão */}
                                <div className="poster-thumb">

                                    {f.urlImagem ? (

                                        <img
                                            src={f.urlImagem}
                                            alt=""
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />

                                    ) : (

                                        <Film />

                                    )}

                                </div>

                                {/* Informações do filme */}
                                <div className="recent-info">

                                    <strong>
                                        {f.titulo}
                                    </strong>

                                    <span>
                                        {f.genero} · {f.anoLancamento}
                                    </span>

                                </div>

                                {/* Duração do filme */}
                                <span className="duration">
                                    {f.duracao} min
                                </span>

                            </div>

                        ))}

                    </div>

                ) : (

                    // Estado vazio: nenhum filme cadastrado
                    <div className="empty-state">

                        <Film size={30} />

                        <strong>
                            Nenhum filme encontrado
                        </strong>

                        <span>
                            Cadastre o primeiro filme para começar.
                        </span>

                        <Link
                            to="/filmes/novo"
                            className="button button-primary"
                        >
                            Cadastrar filme
                        </Link>

                    </div>

                )}

                {/* Link para acessar o catálogo completo */}
                <Link
                    to="/filmes"
                    className="text-link"
                >
                    Ver todos os filmes
                    <ArrowRight size={15} />
                </Link>

            </section>

        </>
    );
}
