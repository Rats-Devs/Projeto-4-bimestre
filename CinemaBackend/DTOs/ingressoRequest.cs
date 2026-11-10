namespace CinemaBackend.DTOs;

public record IngressoRequest(
    int IdFilme,
    int IdUsuario,
    decimal Preco,
    string Tipo
);