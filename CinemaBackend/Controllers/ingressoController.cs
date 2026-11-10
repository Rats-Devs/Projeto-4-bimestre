using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using CinemaBackend.Models;
using CinemaBackend.DTOs;

namespace CinemaBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngressoController : ControllerBase
{
    private readonly IConfiguration configuration;

    public IngressoController(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    //Listar todos os ingressos
    [HttpGet]
    public List<Ingresso> Get()
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = "SELECT * FROM INGRESSOS";

        MySqlCommand command =
            new MySqlCommand(sql, connection);

        MySqlDataReader reader =
            command.ExecuteReader();

        List<Ingresso> ingressos =
            new List<Ingresso>();

        while (reader.Read())
        {
            int idIngresso =
                reader.GetInt32("ID_INGRESSOS");

            int idFilme =
                reader.GetInt32("ID_FILMES_FK");

            int idUsuario =
                reader.GetInt32("ID_USUARIO_FK");

            decimal preco =
                reader.GetDecimal("PRECO");

            string tipo =
                reader.GetString("TIPO");

            DateTime dataCompra =
                reader.GetDateTime("DATA_COMPRA");

            Ingresso ingresso =
                new Ingresso(
                    idIngresso,
                    idFilme,
                    idUsuario,
                    preco,
                    tipo,
                    dataCompra
                );

            ingressos.Add(ingresso);
        }

        reader.Close();
        command.Dispose();
        connection.Close();

        return ingressos;
    }

    //Listar um unico ingresso

    [HttpGet("{idIngresso}")]
    public Ingresso? GetById(int idIngresso)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql =
            "SELECT * FROM INGRESSOS WHERE ID_INGRESSOS = @idIngresso";

        MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue(
            "@idIngresso",
            idIngresso
        );

        MySqlDataReader reader =
            command.ExecuteReader();

        if (reader.Read())
        {
            int idIngressoBanco =
                reader.GetInt32("ID_INGRESSOS");

            int idFilme =
                reader.GetInt32("ID_FILMES_FK");

            int idUsuario =
                reader.GetInt32("ID_USUARIO_FK");

            decimal preco =
                reader.GetDecimal("PRECO");

            string tipo =
                reader.GetString("TIPO");

            DateTime dataCompra =
                reader.GetDateTime("DATA_COMPRA");

            Ingresso ingresso =
                new Ingresso(
                    idIngressoBanco,
                    idFilme,
                    idUsuario,
                    preco,
                    tipo,
                    dataCompra
                );

            reader.Close();
            command.Dispose();
            connection.Close();

            return ingresso;
        }

        reader.Close();
        command.Dispose();
        connection.Close();

        return null;
    }

    //Cadastra um ingresso

    [HttpPost]
    public IActionResult Post(IngressoRequest request)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            INSERT INTO INGRESSOS
                (ID_FILMES_FK, ID_USUARIO_FK, PRECO, TIPO)
            VALUES
                (@ID_FILMES_FK, @ID_USUARIO_FK, @PRECO, @TIPO);

            SELECT LAST_INSERT_ID();
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue(
            "@ID_FILMES_FK",
            request.IdFilme
        );

        command.Parameters.AddWithValue(
            "@ID_USUARIO_FK",
            request.IdUsuario
        );

        command.Parameters.AddWithValue(
            "@PRECO",
            request.Preco
        );

        command.Parameters.AddWithValue(
            "@TIPO",
            request.Tipo
        );

        int idIngresso =
            Convert.ToInt32(command.ExecuteScalar());

        DateTime dataCompra =
            DateTime.Now;

        Ingresso ingresso =
            new Ingresso(
                idIngresso,
                request.IdFilme,
                request.IdUsuario,
                request.Preco,
                request.Tipo,
                dataCompra
            );

        connection.Close();

        return CreatedAtAction(
            nameof(GetById),
            new
            {
                idIngresso = ingresso.IdIngresso
            },
            ingresso
        );
    }

    //Altera um ingresso
    [HttpPut("{idIngresso}")]
    public IActionResult Put(
        int idIngresso,
        IngressoRequest request)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            UPDATE INGRESSOS
            SET ID_FILMES_FK = @ID_FILMES_FK,
                ID_USUARIO_FK = @ID_USUARIO_FK,
                PRECO = @PRECO,
                TIPO = @TIPO
            WHERE ID_INGRESSOS = @idIngresso;
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue(
            "@ID_FILMES_FK",
            request.IdFilme
        );

        command.Parameters.AddWithValue(
            "@ID_USUARIO_FK",
            request.IdUsuario
        );

        command.Parameters.AddWithValue(
            "@PRECO",
            request.Preco
        );

        command.Parameters.AddWithValue(
            "@TIPO",
            request.Tipo
        );

        command.Parameters.AddWithValue(
            "@idIngresso",
            idIngresso
        );

        int linhasAlteradas =
            command.ExecuteNonQuery();

        connection.Close();

        if (linhasAlteradas == 0)
        {
            return NotFound();
        }

        return Ok();
    }

    //Deleta um ingresso
    [HttpDelete("{idIngresso}")]
    public IActionResult Delete(int idIngresso)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            DELETE FROM INGRESSOS
            WHERE ID_INGRESSOS = @idIngresso;
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue(
            "@idIngresso",
            idIngresso
        );

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