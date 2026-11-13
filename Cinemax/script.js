//banner
//guarda os filmes recebidos da API
let filmes = [];

let indexAtual = 0;

// A API não possui os links das páginas individuais.
// Por isso, vamos manter os links separados.
const linksFilmes = {
    "Avatar": "avatar.html",
    "Batman": "batman.html",
    "Star Wars": "starwars.html",
    "Harry Potter": "harry.html",
    "Lilo Stitch": "lilo.html",
    "Vingadores: Ultimato": "avengers.html",
    "Homem-Aranha": "spider.html",
    "Carros 2": "cars.html",
    "Sonic": "sonic.html",
    "Superman": "superman.html",
    "Quarteto Fantástico": "quarteto.html",
    "Coraline": "coraline.html"
};

// Busca os filmes na API
fetch("http://localhost:5160/api/Filme")
    .then(resposta => resposta.json())
    .then(dados => {

        // Guarda os filmes recebidos
        filmes = dados;

        // Mostra o primeiro filme, se houver dados
        if (filmes.length > 0) {
            trocarBanner();

            // Troca o banner a cada 4 segundos
            setInterval(trocarBanner, 4000);
        }

    })
    .catch(erro => {
        console.error("Erro ao carregar os filmes:", erro);
    });

function trocarBanner() {

    const banner = document.getElementById("banner");
    const titulo = document.getElementById("banner-titulo");
    const botao = document.getElementById("banner-botao");

    // Pega o filme atual
    const filme = filmes[indexAtual];

    // Atualiza imagem e título
    banner.style.backgroundImage = `url('${filme.urlImagem}')`;
    titulo.textContent = filme.titulo;

    // Mantém a navegação para a página individual
    botao.onclick = () => {
        const link = linksFilmes[filme.titulo];

        if (link) {
            window.location.href = link;
        }
    };

    // Próximo filme
    indexAtual++;

    // Volta ao primeiro quando chegar ao final
    if (indexAtual >= filmes.length) {
        indexAtual = 0;
    }
}


// ==========================
// CARROSSEL
// ==========================

// Seleciona o elemento do carrossel
const carrossel = document.querySelector(".carrossel");

// Duplica os filmes para criar o loop
carrossel.innerHTML += carrossel.innerHTML;

// Guarda o tamanho de cada filme
let larguraItem = 0;

// Controla o tempo e evita bugs
let timeout = null;

// Quando a página carregar, executa
window.addEventListener("load", () => {

    // Pega o primeiro elemento dentro do carrossel
    const item = carrossel.children[0];

    // Pega o espaço entre os itens
    const gap = parseFloat(getComputedStyle(carrossel).gap) || 0;

    // Calcula a largura do item + espaço
    larguraItem = item.offsetWidth + gap;
});


// ==========================
// SETAS DO CARROSSEL
// ==========================

// 1 vai para a direita e -1 vai para a esquerda
function scrollCarrossel(direcao) {

    carrossel.scrollBy({
        left: direcao * larguraItem * 5,
        behavior: "smooth"
    });
}


// ==========================
// LOOP INFINITO
// ==========================

carrossel.addEventListener("scroll", () => {

    // Cancela o timer antigo
    clearTimeout(timeout);

    // Aguarda um pequeno intervalo
    timeout = setTimeout(() => {

        // Tamanho da metade do conteúdo
        const metade = carrossel.scrollWidth / 2;

        // Se chegar à metade, volta ao início correspondente
        if (carrossel.scrollLeft >= metade) {
            carrossel.scrollLeft -= metade;
        }

        // Se chegar ao início, volta ao final correspondente
        if (carrossel.scrollLeft <= 0) {
            carrossel.scrollLeft += metade;
        }

    }, 50);
});


// ==========================
// COMPRA DE INGRESSOS
// ==========================

const sessoes = document.querySelectorAll(".sessao");

sessoes.forEach(botao => {

    botao.addEventListener("click", () => {

        sessoes.forEach(b => b.classList.remove("ativa"));

        botao.classList.add("ativa");

    });

});