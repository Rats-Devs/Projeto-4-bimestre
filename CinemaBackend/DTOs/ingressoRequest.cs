namespace CinemaBackend.DTOs;

public record IngressoRequest(
    int IdFilme,
    string Assento,
    string TipoIngresso,
    decimal Preco,
    TimeOnly HorarioSessao
);