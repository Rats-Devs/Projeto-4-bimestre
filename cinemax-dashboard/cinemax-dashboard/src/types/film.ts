export interface Filme {
  idFilme: number;
  titulo: string;
  classificacaoIdade: number;
  sinopse: string;
  genero: string;
  duracao: number;
  urlImagem: string | null;
  diretor: string;
  anoLancamento: number;
}

export type FilmeRequest = Omit<Filme, "idFilme">;

export const emptyFilm: FilmeRequest = {
  titulo: "",
  classificacaoIdade: 0,
  sinopse: "",
  genero: "",
  duracao: 0,
  urlImagem: null,
  diretor: "",
  anoLancamento: new Date().getFullYear()
};