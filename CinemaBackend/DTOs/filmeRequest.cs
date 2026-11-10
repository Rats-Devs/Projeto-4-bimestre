namespace CinemaBackend.DTOs;

public record FilmeRequest(
    string Titulo,
    int ClassificacaoIdade,
    string Sinopse,
    string Genero,
    int Duracao,
    string? UrlImagem
);