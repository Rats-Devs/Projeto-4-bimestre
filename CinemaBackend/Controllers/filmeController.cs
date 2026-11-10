using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using CinemaBackend.Models;
using CinemaBackend.DTOs;

namespace CinemaBackend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FilmeController : ControllerBase{

    private readonly IConfiguration configuration;

    public FilmeController(IConfiguration configuration){
        this.configuration = configuration;
    }

    //Listar todos os Filmes
    [HttpGet]/*Injeção de independência*/
    public List<Filme> Get(){
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;/*Instânciando e conectando o mysql*/

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();/*Abre a conexão*/

        string sql = "SELECT * FROM FILMES";

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

       using MySqlDataReader reader = 
            command.ExecuteReader();/*Lê o mysql e gera a leitura dos filmes*/


        List<Filme> filmes = 
            new List<Filme>();

        while (reader.Read())
        {
            int idFilme = reader.GetInt32("ID_FILMES");
            string titulo = reader.GetString("TITULO");
            int classificacaoIdade = reader.GetInt32("CLASSIFICACAO_IDADE");
            string sinopse = reader.GetString("SINOPSE");
            string genero = reader.GetString("GENERO");
            int duracao = reader.GetInt32("DURACAO");      
            string? urlImagem = reader.IsDBNull(reader.GetOrdinal("URL_IMAGEM"))
                ? null
                : reader.GetString("URL_IMAGEM");
            string diretor = reader.GetString("DIRETOR");
            int anoLancamento = reader.GetInt32("ANO_LANCAMENTO");

            Filme filme = 
                new Filme(idFilme, titulo, classificacaoIdade, sinopse, genero, duracao, urlImagem, diretor, anoLancamento);

            filmes.Add(filme);
        }

        return filmes;
    }

    //Lista um único filme
    [HttpGet("{idFilme}")]
    public Filme? GetById(int idFilme){
        string connectionString = configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection = new MySqlConnection(connectionString);

        connection.Open();

        string sql = "SELECT * FROM FILMES WHERE ID_FILMES = @idFilme";

        using MySqlCommand command = new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idFilme", idFilme);//Injetar a variável que tem o ID

        using MySqlDataReader reader = command.ExecuteReader();

        if(reader.Read())
        {
            int idFilmeBanco = reader.GetInt32("ID_FILMES");
            string titulo = reader.GetString("TITULO");
            int classificacaoIdade = reader.GetInt32("CLASSIFICACAO_IDADE");
            string sinopse = reader.GetString("SINOPSE");
            string genero = reader.GetString("GENERO");
            int duracao = reader.GetInt32("DURACAO");
            string? urlImagem = reader.IsDBNull(reader.GetOrdinal("URL_IMAGEM"))
                ? null
                : reader.GetString("URL_IMAGEM");
            string diretor = reader.GetString("DIRETOR");
            int anoLancamento = reader.GetInt32("ANO_LANCAMENTO");


            Filme filme = 
                new Filme(idFilmeBanco, titulo, classificacaoIdade, sinopse, genero, duracao, urlImagem, diretor, anoLancamento);

            return filme;
        } 

        return null;
    }

    //Cadastrar um filme
    [HttpPost]
    public IActionResult Post(FilmeRequest request){
        string connectionString = 
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection = 
                new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            INSERT INTO FILMES (TITULO, CLASSIFICACAO_IDADE, SINOPSE, GENERO, DURACAO, URL_IMAGEM, DIRETOR, ANO_LANCAMENTO)
            VALUES (@TITULO, @CLASSIFICACAO_IDADE, @SINOPSE, @GENERO, @DURACAO, @URL_IMAGEM, @DIRETOR, @ANO_LANCAMENTO);
            SELECT LAST_INSERT_ID();
            """;

        using MySqlCommand command = 
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@TITULO", request.Titulo);
        command.Parameters.AddWithValue("@CLASSIFICACAO_IDADE", request.ClassificacaoIdade);
        command.Parameters.AddWithValue("@SINOPSE", request.Sinopse);
        command.Parameters.AddWithValue("@GENERO", request.Genero);
        command.Parameters.AddWithValue("@DURACAO", request.Duracao);
        command.Parameters.AddWithValue("@URL_IMAGEM", (object?)request.UrlImagem ?? DBNull.Value);
        command.Parameters.AddWithValue("@DIRETOR", request.Diretor);
        command.Parameters.AddWithValue("@ANO_LANCAMENTO", request.AnoLancamento);

        int idFilme = Convert.ToInt32(command.ExecuteScalar());

        Filme filme = new Filme(idFilme, request.Titulo, request.ClassificacaoIdade, request.Sinopse, request.Genero, request.Duracao, request.UrlImagem, request.Diretor, request.AnoLancamento);


        return CreatedAtAction(
            nameof(GetById),
            new {
                idFilme = filme.IdFilme
            },
            filme
        );
    }

    //alterar um filme
    [HttpPut("{idFilme}")]
    public IActionResult Put(int idFilme, FilmeRequest request)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            UPDATE FILMES
            SET TITULO = @TITULO,
                CLASSIFICACAO_IDADE = @CLASSIFICACAO_IDADE,
                SINOPSE = @SINOPSE,
                GENERO = @GENERO,
                DURACAO = @DURACAO,
                URL_IMAGEM = @URL_IMAGEM,
                DIRETOR = @DIRETOR,
                ANO_LANCAMENTO = @ANO_LANCAMENTO
            WHERE ID_FILMES = @idFilme;
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@TITULO", request.Titulo);
        command.Parameters.AddWithValue("@CLASSIFICACAO_IDADE", request.ClassificacaoIdade);
        command.Parameters.AddWithValue("@SINOPSE", request.Sinopse);
        command.Parameters.AddWithValue("@GENERO", request.Genero);
        command.Parameters.AddWithValue("@DURACAO", request.Duracao);
        command.Parameters.AddWithValue("@URL_IMAGEM", (object?)request.UrlImagem ?? DBNull.Value);
        command.Parameters.AddWithValue("@idFilme", idFilme);
        command.Parameters.AddWithValue("@DIRETOR", request.Diretor);
        command.Parameters.AddWithValue("@ANO_LANCAMENTO", request.AnoLancamento);

        int linhasAlteradas = command.ExecuteNonQuery();//executa um comando que não rpecisa devolver uma tabela de resultados


        if (linhasAlteradas == 0)
        {
            return NotFound();
        }

        return Ok();
    }

    // Deletar um filme
    [HttpDelete("{idFilme}")]
    public IActionResult Delete(int idFilme)
    {
        string connectionString =
            configuration.GetConnectionString("DefaultConnection")!;

        using MySqlConnection connection =
            new MySqlConnection(connectionString);

        connection.Open();

        string sql = """
            DELETE FROM FILMES
            WHERE ID_FILMES = @idFilme;
            """;

        using MySqlCommand command =
            new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@idFilme", idFilme);

        int linhasDeletadas = command.ExecuteNonQuery();

        if (linhasDeletadas == 0)
        {
            return NotFound();
        }

        return Ok();
    }
}