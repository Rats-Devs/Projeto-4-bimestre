using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using CinemaBackend.Models;
using CinemaBackend.DTOs;

namespace CinemaBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly IConfiguration configuration;

    public UsuarioController(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    //Listar todos os usuarios
    [HttpGet]
    public List<Usuario> Get()
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = "SELECT * FROM USUARIOS";

        MySqlCommand command =
            new MySqlCommand(sql, connection);

        MySqlDataReader reader =
            command.ExecuteReader();

        List<Usuario> usuarios =
            new List<Usuario>();

        while (reader.Read())
        {
            int idUsuario = reader.GetInt32("ID_USUARIO");
            string nome = reader.GetString("NOME");
            string email = reader.GetString("EMAIL");
            string senha = reader.GetString("SENHA");

            Usuario usuario =
                new Usuario(idUsuario, nome, email, senha);

            usuarios.Add(usuario);
        }

        reader.Close();
        command.Dispose();
        connection.Close();

        return usuarios;
    }

    //Listar um unico usuario
    [HttpGet("{idUsuario}")]
    public Usuario? GetById(int idUsuario)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql =
            "SELECT * FROM USUARIOS WHERE ID_USUARIO = @idUsuario";

        MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idUsuario", idUsuario);

        MySqlDataReader reader =
            command.ExecuteReader();

        if (reader.Read())
        {
            int idUsuarioBanco = reader.GetInt32("ID_USUARIO");
            string nome = reader.GetString("NOME");
            string email = reader.GetString("EMAIL");
            string senha = reader.GetString("SENHA");

            Usuario usuario =
                new Usuario(idUsuarioBanco, nome, email, senha);

            reader.Close();
            command.Dispose();
            connection.Close();

            return usuario;
        }

        reader.Close();
        command.Dispose();
        connection.Close();

        return null;
    }

    //Cadastrar um usuario
    [HttpPost]
    public IActionResult Post(UsuarioRequest request)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            INSERT INTO USUARIOS (NOME, EMAIL, SENHA)
            VALUES (@NOME, @EMAIL, @SENHA);
            SELECT LAST_INSERT_ID();
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@NOME", request.Nome);
        command.Parameters.AddWithValue("@EMAIL", request.Email);
        command.Parameters.AddWithValue("@SENHA", request.Senha);

        int idUsuario =
            Convert.ToInt32(command.ExecuteScalar());

        Usuario usuario =
            new Usuario(
                idUsuario,
                request.Nome,
                request.Email,
                request.Senha
            );

        connection.Close();

        return CreatedAtAction(
            nameof(GetById),
            new
            {
                idUsuario = usuario.IdUsuario
            },
            usuario
        );
    }

    //Alterar um usuario
    [HttpPut("{idUsuario}")]
    public IActionResult Put(int idUsuario, UsuarioRequest request)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            UPDATE USUARIOS
            SET NOME = @NOME,
                EMAIL = @EMAIL,
                SENHA = @SENHA
            WHERE ID_USUARIO = @idUsuario;
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@NOME", request.Nome);
        command.Parameters.AddWithValue("@EMAIL", request.Email);
        command.Parameters.AddWithValue("@SENHA", request.Senha);
        command.Parameters.AddWithValue("@idUsuario", idUsuario);

        int linhasAlteradas =
            command.ExecuteNonQuery();

        connection.Close();

        if (linhasAlteradas == 0)
        {
            return NotFound();
        }

        return Ok();
    }

    //Deleta um usuario
    [HttpDelete("{idUsuario}")]
    public IActionResult Delete(int idUsuario)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            DELETE FROM USUARIOS
            WHERE ID_USUARIO = @idUsuario;
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idUsuario", idUsuario);

        int linhasDeletadas =
            command.ExecuteNonQuery();

        connection.Close();

        if (linhasDeletadas == 0)
        {
            return NotFound();
        }

        return Ok();
    }
}