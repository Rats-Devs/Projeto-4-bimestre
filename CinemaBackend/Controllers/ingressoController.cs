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

    //converte os dados do banco em um objeto Ingresso
    private static Ingresso MapearIngresso(MySqlDataReader reader)
    {
        return new Ingresso(
            reader.GetInt32("ID_INGRESSOS"),
            reader.GetInt32("ID_FILMES_FK"),
            reader.GetString("ASSENTO"),
            reader.GetString("TIPO_INGRESSO"),
            reader.GetDecimal("PRECO"),
            reader.GetDateTime("DATA_COMPRA"),
            TimeOnly.FromTimeSpan(
                reader.GetTimeSpan(
                    reader.GetOrdinal("HORARIO_SESSAO")
                )
            )
        );
    }

    //lista todos os ingressos
    [HttpGet]
    public ActionResult<List<Ingresso>> Get()
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = "SELECT * FROM INGRESSOS";

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        using MySqlDataReader reader =
            command.ExecuteReader();

        List<Ingresso> ingressos = new();

        while (reader.Read())
        {
            ingressos.Add(MapearIngresso(reader));
        }

        return Ok(ingressos);
    }

    //consulta assentos ocupados de um filme e horário
    [HttpGet("assentos-ocupados")]
    public IActionResult GetAssentosOcupados(
        [FromQuery] int idFilme,
        [FromQuery] string horarioSessao)
    {
        if (!TimeOnly.TryParse(horarioSessao, out TimeOnly horario))
        {
            return BadRequest("Horário inválido.");
        }

        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            SELECT ASSENTO
            FROM INGRESSOS
            WHERE ID_FILMES_FK = @idFilme
            AND HORARIO_SESSAO = @horario;
            """;

        using MySqlCommand command = new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idFilme", idFilme);

        command.Parameters.Add("@horario", MySqlDbType.Time)
            .Value = horario.ToTimeSpan();

        using MySqlDataReader reader = command.ExecuteReader();

        List<string> assentosOcupados = new();

        while (reader.Read())
        {
            assentosOcupados.Add(
                reader.GetString("ASSENTO")
            );
        }

        return Ok(assentosOcupados);
    }

    //lista um único ingresso
    [HttpGet("{idIngresso}")]
    public ActionResult<Ingresso> GetById(int idIngresso)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            SELECT *
            FROM INGRESSOS
            WHERE ID_INGRESSOS = @idIngresso;
            """;

        using MySqlCommand command = new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idIngresso", idIngresso);

        using MySqlDataReader reader = command.ExecuteReader();

        if (!reader.Read())
        {
            return NotFound();
        }

        Ingresso ingresso = MapearIngresso(reader);

        return Ok(ingresso);
    }

    //cadastrar um ingresso
    [HttpPost]
    public IActionResult Post(IngressoRequest request)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            INSERT INTO INGRESSOS
                (ID_FILMES_FK, ASSENTO, TIPO_INGRESSO,
                 PRECO, HORARIO_SESSAO)
            VALUES
                (@idFilme, @assento, @tipoIngresso,
                 @preco, @horario);

            SELECT LAST_INSERT_ID();
            """;

        using MySqlCommand command = new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idFilme", request.IdFilme);

        command.Parameters.AddWithValue("@assento", request.Assento);

        command.Parameters.AddWithValue("@tipoIngresso", request.TipoIngresso);

        command.Parameters.AddWithValue("@preco", request.Preco);

        command.Parameters.Add("@horario", MySqlDbType.Time)
            .Value = request.HorarioSessao.ToTimeSpan();

        try
        {
            int idIngresso =
                Convert.ToInt32(command.ExecuteScalar());

            Ingresso ingresso = new(
                idIngresso,
                request.IdFilme,
                request.Assento,
                request.TipoIngresso,
                request.Preco,
                DateTime.Now,
                request.HorarioSessao
            );

            return CreatedAtAction(
                nameof(GetById),
                new { idIngresso = ingresso.IdIngresso },
                ingresso
            );
        }
        catch (MySqlException ex) when (ex.Number == 1062)
        {
            return Conflict(
                "Esse assento já foi comprado para esse filme e horário."
            );
        }
    }

    //altera um ingresso
    [HttpPut("{idIngresso}")]
    public IActionResult Put(
        int idIngresso,
        IngressoRequest request)
    {
        string connectionString = configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection = new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            UPDATE INGRESSOS
            SET ID_FILMES_FK = @idFilme,
                ASSENTO = @assento,
                TIPO_INGRESSO = @tipoIngresso,
                PRECO = @preco,
                HORARIO_SESSAO = @horario
            WHERE ID_INGRESSOS = @idIngresso;
            """;

        using MySqlCommand command = new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idFilme", request.IdFilme);

        command.Parameters.AddWithValue("@assento", request.Assento);

        command.Parameters.AddWithValue("@tipoIngresso", request.TipoIngresso);

        command.Parameters.AddWithValue("@preco", request.Preco);

        command.Parameters.Add("@horario", MySqlDbType.Time)
            .Value = request.HorarioSessao.ToTimeSpan();

        command.Parameters.AddWithValue("@idIngresso", idIngresso);

        try
        {
            //verifica se o ingresso existe
            using MySqlCommand verificar =
                new MySqlCommand(
                    "SELECT COUNT(*) FROM INGRESSOS WHERE ID_INGRESSOS = @id",
                    connection
                );

            verificar.Parameters.AddWithValue("@id", idIngresso);

            if (Convert.ToInt32(verificar.ExecuteScalar()) == 0)
            {
                return NotFound();
            }

            command.ExecuteNonQuery();

            return Ok();
        }
        catch (MySqlException ex) when (ex.Number == 1062)
        {
            return Conflict(
                "Esse assento já foi comprado para esse filme e horário."
            );
        }
    }

    //deleta um ingresso
    [HttpDelete("{idIngresso}")]
    public IActionResult Delete(int idIngresso)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            DELETE FROM INGRESSOS
            WHERE ID_INGRESSOS = @idIngresso;
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue(
            "@idIngresso", idIngresso);

        int linhasDeletadas = command.ExecuteNonQuery();

        if (linhasDeletadas == 0)
        {
            return NotFound();
        }

        return Ok();
    }
}