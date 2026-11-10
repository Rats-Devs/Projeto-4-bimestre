namespace CinemaBackend.Models;

public class Filme{
    public int IdFilme { get; private set; }
    public string Titulo { get; private set; }
    public int ClassificacaoIdade { get; private set; }
    public string Sinopse { get; private set; }
    public string Genero { get; private set; }
    public int Duracao { get; private set; }
    public string? UrlImagem { get; private set; }

    public Filme(int idFilme, string titulo, int classificacaoIdade, string sinopse, string genero, int duracao, string? urlImagem){
        IdFilme = idFilme;
        Titulo = titulo;
        ClassificacaoIdade = classificacaoIdade;
        Sinopse = sinopse;
        Genero = genero;
        Duracao = duracao;
        UrlImagem = urlImagem;
    }
}