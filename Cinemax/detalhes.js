const parametros = new URLSearchParams(window.location.search);
//window.location.search vai acessar os parâmetros da URL.
//URLSearchParams() interpreta os parâmetros.

const idFilme = parametros.get("id");
//.get("id") recupera o valor do parâmetro id.
//idFilme guarda o ID do filme

fetch(`http://localhost:5160/api/Filme/${idFilme}`)
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados);
        document.getElementById("nomeFilme").textContent = dados.titulo;
        document.getElementById("sinopse").textContent = dados.sinopse;
        document.getElementById("poster").src = dados.urlImagem;

        const classificacao = document.getElementById("classificacao");
        const idade = dados.classificacaoIdade;

        classificacao.className = "classificacao";

        if (idade === 0) {
            classificacao.textContent = "L";
            classificacao.classList.add("classificacao-livre");
        } else {
            classificacao.textContent = idade;
            classificacao.classList.add(`classificacao-${idade}`);
        }

        document.getElementById("duracao").textContent = `${dados.duracao} min`;
        document.getElementById("genero").textContent = dados.genero;
        document.getElementById("diretor").textContent = dados.diretor;
        document.getElementById("anoLancamento").textContent = dados.anoLancamento;
    });