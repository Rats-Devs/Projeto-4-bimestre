//banner
//guarda os filmes recebidos da API
let filmes = [];

let indexAtual = 0;

//busca na API
fetch("http://localhost:5160/api/Filme")
    .then(resposta => resposta.json())
    .then(dados => {
        filmes = dados;//guarda os dados dos filmes

        filmes.forEach(filme => {
            const link = document.createElement("a");
            const imagem = document.createElement("img");

            link.href = `detalhes.html?id=${filme.idFilme}`;

            imagem.src = filme.urlImagem; //pega a url do banco de dados pela API
            imagem.alt = filme.titulo;

            link.appendChild(imagem); //coloca a imagem dentro do link, se clicar na imagem vai ser a mesma coisa q clicar no link
            carrossel.appendChild(link);//coloca o link dentro do .carrosel do HTML
        });
        //cada repetição do forEach vai criar um link e uma imagem para um filme

        //mostra o primeiro filme se ele estiver criado
        if (filmes.length > 0) {
            trocarBanner();

            //troca a cada 4 seg o banner
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

    //puxa o filme atual
    const filme = filmes[indexAtual];

    //atualiza para a imagem e o titulo do filme atual
    banner.style.backgroundImage = `url('${filme.urlBanner}')`;
    titulo.textContent = filme.titulo;

    //navegação usando o id do filme
    botao.onclick = () => {
        window.location.href = `detalhes.html?id=${filme.idFilme}`;
    };

    // Próximo filme
    indexAtual++;

    // Volta ao primeiro quando chegar ao final
    if (indexAtual >= filmes.length) {
        indexAtual = 0;
    }
}

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

// 1 vai para a direita e -1 vai para a esquerda, setinhas
function scrollCarrossel(direcao) {

    carrossel.scrollBy({
        left: direcao * larguraItem * 5,
        behavior: "smooth"
    });
}


//loop do carrossel
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


//compra do ingresso
const sessoes = document.querySelectorAll(".sessao");

sessoes.forEach(botao => {

    botao.addEventListener("click", () => {

        sessoes.forEach(b => b.classList.remove("ativa"));

        botao.classList.add("ativa");

    });

});