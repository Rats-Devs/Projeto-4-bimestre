namespace CinemaBackend.Models;

public class Ingresso
{
    public int IdIngresso { get; private set; }
    public int IdFilme { get; private set; }
    public int IdUsuario { get; private set; }
    public decimal Preco { get; private set; }
    public string Tipo { get; private set; }
    public DateTime DataCompra { get; private set; }

    public Ingresso(int idIngresso, int idFilme, int idUsuario, decimal preco, string tipo, DateTime dataCompra){
        IdIngresso = idIngresso;
        IdFilme = idFilme;
        IdUsuario = idUsuario;
        Preco = preco;
        Tipo = tipo;
        DataCompra = dataCompra;
    }
}