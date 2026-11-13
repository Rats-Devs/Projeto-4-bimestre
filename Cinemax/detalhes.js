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
    });