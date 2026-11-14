namespace CinemaBackend.DTOs;

public record FilmeRequest(
    string Titulo,
    int ClassificacaoIdade,
    string Sinopse,
    string Genero,
    int Duracao,
    string? UrlImagem,
    string? UrlBanner,
    string Diretor,
    int AnoLancamento
);