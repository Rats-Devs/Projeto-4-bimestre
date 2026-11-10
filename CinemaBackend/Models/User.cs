namespace CinemaBackend.Models;

public class Usuario{
    public int IdUsuario { get; private set; }
    public string Nome { get; private set; }
    public string Email { get; private set; }
    public string Senha { get; private set; }

    public Usuario(int idUsuario, string nome, string email, string senha){
        IdUsuario = idUsuario;
        Nome = nome;
        Email = email;
        Senha = senha;
    }
}