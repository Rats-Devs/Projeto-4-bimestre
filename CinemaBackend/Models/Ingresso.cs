namespace CinemaBackend.Models;

public class Ingresso
{
    public int IdIngresso { get; private set; }
    public int IdFilme { get; private set; }
    public string Assento { get; private set; }
    public string TipoIngresso { get; private set; }
    public decimal Preco { get; private set; }
    public DateTime DataCompra { get; private set; }
    public TimeOnly HorarioSessao { get; private set; }

    public Ingresso(int idIngresso, int idFilme, string assento, string tipoIngresso, decimal preco, DateTime dataCompra, TimeOnly horarioSessao){
        IdIngresso = idIngresso;
        IdFilme = idFilme;
        Assento = assento;
        TipoIngresso = tipoIngresso;
        Preco = preco;
        DataCompra = dataCompra;
        HorarioSessao = horarioSessao;
    }
}