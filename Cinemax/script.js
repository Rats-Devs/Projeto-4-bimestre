//Banner
const filmes = [
    {
        nome: "Avatar",
        imagem: "https://wallpapers.com/images/hd/avatar-na-vi-promotional-poster-eoaiyd4amdhnf8id.jpg",
        link: "avatar.html"
    },
    {
        nome: "Batman",
        imagem: "https://wallpapers.com/images/high/dark-knight-hd-xkxae6xoeyge790g.webp",
        link: "batman.html"
    },
    {
        nome: "Star Wars",
        imagem: "https://a-static.besthdwallpaper.com/star-wars-the-rise-of-skywalker-wallpaper-2880x1800-93681_8.jpg",
        link: "starwars.html"
    },
    {
        nome: "Harry Potter",
        imagem: "https://4kwallpapers.com/images/wallpapers/harry-potter-and-3840x2160-10617.jpg",
        link: "harry.html"
    },
    {
        nome: "Lilo Stitch",
        imagem: "https://4kwallpapers.com/images/wallpapers/lilo-stitch-2025-7680x4320-20079.jpg",
        link: "lilo.html"
    },
    {
        nome: "Vingadores: Ultimato",
        imagem: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirI5QtVB-dBRLOO8XefqkYhASOEQVDOqfBG6LwLTJ8s7d62BZES1p4ojogw5NJDYNXhl5Pjurm8asCntnI5t4-J_PIe2xerV-uGyYouDZLrR6id0cJYdYnVs0GOnqDRrV8kzJHk2XIZg8/s1600/Vingadores-Ultimato.jpg",
        link: "avengers.html"
    },
    {
        nome: "O Espetacular Homem Aranha",
        imagem: "https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbJcyay2kFecMyX1buDokhAm5NwXqkRQN1PQbugxgHfolQmrtrkPenphsG8lJPGqmTZfh5Mkntz64oEEerRJ8ZeAFdS6-NIiIgQb.jpg?r=e8b",
        link: "spider.html"
    },
    {
        nome: "Carros 2",
        imagem: "https://wallpapers.com/images/hd/cars-2-pictures-x5fda17mhzgimb2u.jpg",
        link: "cars.html"
    },
    {
        nome: "Sonic",
        imagem: "https://images.alphacoders.com/138/1383777.jpg",
        link: "sonic.html"
    },
    {
        nome: "Superman",
        imagem: "https://www.10wallpaper.com/wallpaper/3840x2400/2508/Superman_2025_Films_Chinese_international_Poster_5K_3840x2400.jpg",
        link: "superman.html"
    },
    {
        nome: "Quarteto Fantástico",
        imagem: "https://images6.alphacoders.com/139/1397668.jpg",
        link: "quarteto.html"
    },
    {
        nome: "Coraline",
        imagem: "https://wallpapers.com/images/hd/coraline-background-abpb3f3z9w19dxls.jpg",
        link: "coraline.html"
    }
];



let indexAtual = 0;

function trocarBanner() {
    const banner = document.getElementById("banner");
    const titulo = document.getElementById("banner-titulo");
    const botao = document.getElementById("banner-botao");

    const filme = filmes[indexAtual];

    banner.style.backgroundImage = `url('${filme.imagem}')`;
    titulo.textContent = filme.nome;

    botao.onclick = () => {
        window.location.href = filme.link;
    };

    //próximo filme
    indexAtual++;

    if (indexAtual >= filmes.length) {
        indexAtual = 0;
    }
}

//inicia o banner
trocarBanner();

//troca o banner a cada 3 segundos
setInterval(trocarBanner, 4000);

//Carrossel

//duplica os filminho para o loop
carrossel.innerHTML += carrossel.innerHTML;

//variáveis 

//guarda o tamanho de cada filme
let larguraItem = 0;

//controla o tempo e evita bug
let timeout = null;

//variáveis 

//quando a página carregar vai executar
window.addEventListener("load", () => {

    //children = lista dos elementos dentro do carrossel, [0] pega o primeiro elemento
    const item = carrossel.children[0];

    //getComputedStyle → pega o CSS aplicado, .gap → pega o espaço entre os itens, parseFloat transforma o texto em número, || 0 se der erro, usa 0
    const gap = parseFloat(getComputedStyle(carrossel).gap) || 0;

    //largura do item e espaço entre eles
    larguraItem = item.offsetWidth + gap;
});

//seta
//1 vai pra direita e -1 vai pra esquerda
function scrollCarrossel(direcao) {

//scrollBy move a posição atual, left movimento horizontal, direcao * larguraItem * 2 anda 2 filmes por clique, smooth faz uma animaçãozinha
    carrossel.scrollBy({
        left: direcao * larguraItem * 5,
        behavior: "smooth"
    });
}


//loop infinito
//Sempre que move o carrossel, esse código é usado
carrossel.addEventListener("scroll", () => {

//Cancela o timer antigo
    clearTimeout(timeout);

//atraso pequeno pra ficar bonitin
    timeout = setTimeout(() => {

//scrollWidth é o tamanho total do conteúdo
        const metade = carrossel.scrollWidth / 2;

        //Se o scroll chegar na metade ou passar dela → volta pro correspondente
        if (carrossel.scrollLeft >= metade) {
            carrossel.scrollLeft -= metade;
        }

        //Se foi pra esquerda no início → vai pro final correspondente
        if (carrossel.scrollLeft <= 0) {
            carrossel.scrollLeft += metade;
        }
    }, 50);
});

//Compra de Ingressos
    const sessoes = document.querySelectorAll(".sessao")
    sessoes.forEach(botao => {
    botao.addEventListener("click", () => {
    sessoes.forEach(b => b.classList.remove("ativa"))
    botao.classList.add("ativa")
})
})