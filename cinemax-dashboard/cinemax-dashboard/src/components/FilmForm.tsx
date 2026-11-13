
import { useEffect, useState, type FormEvent } from "react";

import {
    ArrowLeft,
    ImagePlus,
    Save
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import type { Filme, FilmeRequest } from "../types/film";
import { emptyFilm } from "../types/film";

// Define as propriedades recebidas pelo componente.
type Props = {
    initial?: Filme;
    onSave: (payload: FilmeRequest) => Promise<void>;
    busy: boolean;
    submitLabel: string;
};

export default function FilmForm({
    initial,
    onSave,
    busy,
    submitLabel
}: Props) {

    // Guarda os dados preenchidos no formulário.
    // Se estiver editando, utiliza os dados do filme existente.
    // Caso contrário, começa com os campos vazios.
    const [form, setForm] = useState<FilmeRequest>(
        initial
            ? {
                titulo: initial.titulo,
                classificacaoIdade: initial.classificacaoIdade,
                sinopse: initial.sinopse,
                genero: initial.genero,
                duracao: initial.duracao,
                urlImagem: initial.urlImagem,
                diretor: initial.diretor,
                anoLancamento: initial.anoLancamento
            }
            : emptyFilm
    );

    // Guarda mensagens de erro para exibir ao usuário.
    const [error, setError] = useState("");

    // Permite navegar entre as páginas.
    const navigate = useNavigate();

    // Atualiza os campos quando os dados iniciais são carregados
    // ou quando o filme selecionado para edição muda.
    useEffect(() => {
        if (initial) {
            setForm({
                titulo: initial.titulo,
                classificacaoIdade: initial.classificacaoIdade,
                sinopse: initial.sinopse,
                genero: initial.genero,
                duracao: initial.duracao,
                urlImagem: initial.urlImagem,
                diretor: initial.diretor,
                anoLancamento: initial.anoLancamento
            });
        }
    }, [initial]);

    // Atualiza um campo específico do formulário.
    const change = (
        key: keyof FilmeRequest,
        value: string
    ) => {
        setForm((old) => ({
            ...old,

            [key]:
                key === "classificacaoIdade" ||
                key === "duracao" ||
                key === "anoLancamento"
                    ? value === ""
                        ? 0
                        : Number(value)

                    : key === "urlImagem"
                        ? value.trim() || null

                        : value
        }));
    };

    // Valida os dados e envia o formulário.
    async function submit(e: FormEvent) {
        e.preventDefault();
        setError("");

        // Verifica se os campos de texto obrigatórios foram preenchidos.
        if (
            !form.titulo.trim() ||
            !form.sinopse.trim() ||
            !form.genero.trim() ||
            !form.diretor.trim()
        ) {
            setError(
                "Preencha título, sinopse, gênero e diretor."
            );
            return;
        }

        // Verifica se os valores numéricos são válidos.
        if (
            form.duracao <= 0 ||
            form.anoLancamento <= 0 ||
            form.classificacaoIdade < 0
        ) {
            setError(
                "Confira duração, ano de lançamento e classificação indicativa."
            );
            return;
        }

        try {
            // Envia os dados para a função recebida pela página.
            // Também remove espaços desnecessários dos textos.
            await onSave({
                ...form,
                titulo: form.titulo.trim(),
                sinopse: form.sinopse.trim(),
                genero: form.genero.trim(),
                diretor: form.diretor.trim()
            });

            // Após salvar com sucesso, retorna ao catálogo.
            navigate("/filmes");

        } catch (err) {
            // Exibe uma mensagem caso o salvamento apresente erro.
            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível salvar o filme."
            );
        }
    }

    return (
        <form
            className="form-card"
            onSubmit={submit}
        >
            <div className="form-grid">

                {/* Título do filme */}
                <label className="field">
                    <span>Título *</span>

                    <input
                        value={form.titulo}
                        onChange={(e) =>
                            change("titulo", e.target.value)
                        }
                        placeholder="Ex.: Logan"
                        required
                    />
                </label>

                {/* Gênero */}
                <label className="field">
                    <span>Gênero *</span>

                    <input
                        value={form.genero}
                        onChange={(e) =>
                            change("genero", e.target.value)
                        }
                        placeholder="Ex.: Ação"
                        required
                    />
                </label>

                {/* Diretor */}
                <label className="field">
                    <span>Diretor *</span>

                    <input
                        value={form.diretor}
                        onChange={(e) =>
                            change("diretor", e.target.value)
                        }
                        placeholder="Nome do diretor"
                        required
                    />
                </label>

                {/* Ano de lançamento */}
                <label className="field">
                    <span>Ano de lançamento *</span>

                    <input
                        type="number"
                        min="1888"
                        max="2100"
                        value={form.anoLancamento || ""}
                        onChange={(e) =>
                            change("anoLancamento", e.target.value)
                        }
                        required
                    />
                </label>

                {/* Duração do filme */}
                <label className="field">
                    <span>Duração (minutos) *</span>

                    <input
                        type="number"
                        min="1"
                        value={form.duracao || ""}
                        onChange={(e) =>
                            change("duracao", e.target.value)
                        }
                        required
                    />
                </label>

                {/* Classificação indicativa */}
                <label className="field">
                    <span>Classificação indicativa *</span>

                    <input
                        type="number"
                        min="0"
                        value={form.classificacaoIdade}
                        onChange={(e) =>
                            change("classificacaoIdade", e.target.value)
                        }
                        required
                    />
                </label>

                {/* URL do pôster */}
                <label className="field field-full">
                    <span>URL da imagem</span>

                    <input
                        type="url"
                        value={form.urlImagem ?? ""}
                        onChange={(e) =>
                            change("urlImagem", e.target.value)
                        }
                        placeholder="https://exemplo.com/poster.jpg"
                    />

                    <small>
                        Informe um endereço público de imagem.
                        O campo pode ficar vazio.
                    </small>
                </label>

                {/* Pré-visualização da imagem */}
                <div className="preview-box field-full">
                    <div className="preview-label">
                        <ImagePlus size={16} />
                        Pré-visualização do pôster
                    </div>

                    {form.urlImagem ? (
                        <img
                            src={form.urlImagem}
                            alt="Prévia do pôster"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    ) : (
                        <div className="preview-empty">
                            A imagem aparecerá aqui quando você
                            informar uma URL válida.
                        </div>
                    )}
                </div>

                {/* Sinopse */}
                <label className="field field-full">
                    <span>Sinopse *</span>

                    <textarea
                        rows={5}
                        value={form.sinopse}
                        onChange={(e) =>
                            change("sinopse", e.target.value)
                        }
                        placeholder="Escreva uma breve sinopse..."
                        required
                    />
                </label>

            </div>

            {/* Mensagem de erro */}
            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            {/* Botões de ação */}
            <div className="form-actions">
                <Link
                    className="button button-ghost"
                    to="/filmes"
                >
                    <ArrowLeft size={16} />
                    Cancelar
                </Link>

                <button
                    className="button button-primary"
                    disabled={busy}
                >
                    <Save size={16} />

                    {busy
                        ? "Salvando..."
                        : submitLabel}
                </button>
            </div>
        </form>
    );
}
