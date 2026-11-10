namespace CinemaBackend.DTOs;

public record UsuarioRequest(
    string Nome,
    string Email,
    string Senha
);