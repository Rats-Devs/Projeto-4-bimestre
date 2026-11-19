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


//botões
    
    //seleciona os botões de tipo(inteiro e meia)
    const tiposIngresso = document.querySelectorAll(".tipo-ingresso");

    //seleciona os botões de horario
    const sessoes = document.querySelectorAll(".sessao");

    //guarda as escolhas
    let tipoSelecionado = null;
    let horarioSelecionado = null;

    //seleção do tipo de ingresso
    tiposIngresso.forEach(botao => {
        botao.addEventListener("click", () => {

            //remove a seleção anterior
            tiposIngresso.forEach(b => b.classList.remove("ativa"));

            //marca o botão clicado
            botao.classList.add("ativa");

            //guarda o tipo escolhido
            tipoSelecionado = botao.textContent.trim();

            //atualiza o preço imediatamente
            atualizarResumo();

            console.log("Tipo:", tipoSelecionado);
        });
    });

    //seleção do horário
    sessoes.forEach(botao => {
        botao.addEventListener("click", async () => {
            //remove a seleção anterior
            sessoes.forEach(b => b.classList.remove("ativa"));
            //marca o horário clicado
            botao.classList.add("ativa");
            //guarda o horário escolhido
            horarioSelecionado = botao.textContent.trim();

            //limpa as seleções anteriores ao trocar de horário
            assentos.forEach(assento => {
                assento.classList.remove("selecionado");
                assento.classList.remove("ocupado");
            });

            //atualiza o resumo da compra
            atualizarResumo();

            //busca os assentos já vendidos na API
            await carregarAssentosOcupados();

            console.log("Horário:", horarioSelecionado);
        });
    });

//seleção dos assentos
const assentos = document.querySelectorAll(".container .assento");

//resumo da compra
const campoAssentos = document.querySelector("#assentos-selecionados");
const campoQuantidade = document.querySelector("#quantidade");
const campoTotal = document.querySelector("#preco-total");
const campoHorario = document.querySelector("#horario-selecionado");

//preços
const precoInteira = 30;
const precoMeia = 15;

assentos.forEach(assento => {
    assento.addEventListener("click", () => {

        //impede selecionar assentos ocupados
        if (assento.classList.contains("ocupado")) {
            return;
        }

        //alterna a seleção do assento
        assento.classList.toggle("selecionado");

        atualizarResumo();
    });
});

//atualização do resumo da compra
function atualizarResumo() {

    //busca os assentos selecionados
    const selecionados = document.querySelectorAll(
        ".container .assento.selecionado"
    );

    //cria uma lista com os assentos
    const listaAssentos = Array.from(selecionados).map(
        assento => assento.dataset.assento
    );

    //atualiza a quantidade
    campoQuantidade.textContent = listaAssentos.length;

    //atualiza os assentos selecionados
    campoAssentos.textContent = listaAssentos.length > 0
        ? listaAssentos.join(", ")
        : "Nenhum";

    campoHorario.textContent = horarioSelecionado || "Não selecionado";

    //define o preço de acordo com o tipo escolhido
    let precoUnitario = 0;

    if (tipoSelecionado === "Meia") {
        precoUnitario = precoMeia;
    } else if (tipoSelecionado === "Inteira") {
        precoUnitario = precoInteira;
    }

    //calcula o valor total
    const total = listaAssentos.length * precoUnitario;

    campoTotal.textContent = total.toFixed(2).replace(".", ",");
}

//comprar o ingresso (finalização da compra)

const botaoComprar = document.querySelector("#comprar-ingresso");

botaoComprar.addEventListener("click", async () => {

    //verifica se o tipo do ingresso foi escolhido
    if (!tipoSelecionado) {
        alert("Selecione o tipo de ingresso!");
        return;
    }

    //verifica se o horário foi escolhido
    if (!horarioSelecionado) {
        alert("Selecione um horário!");
        return;
    }

    //busca os assentos selecionados
    const assentosSelecionados = Array.from(
        document.querySelectorAll(".container .assento.selecionado")
    );

    //verifica se existe pelo menos um assento
    if (assentosSelecionados.length === 0) {
        alert("Selecione pelo menos um assento!");
        return;
    }

    //define o preço conforme o tipo
    const preco = tipoSelecionado === "Meia"
        ? precoMeia
        : precoInteira;

    //confirma o início da compra
    botaoComprar.disabled = true;

    try {

        //envia um ingresso por assento selecionado
        for (const assento of assentosSelecionados) {

            const ingresso = {
                idFilme: idFilme,
                assento: assento.dataset.assento,
                tipoIngresso: tipoSelecionado,
                preco: preco,
                horarioSessao: horarioSelecionado + ":00"
            };

            const resposta = await fetch(
                "http://localhost:5160/api/Ingresso",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ingresso)
                }
            );

            if (!resposta.ok) {
                throw new Error(
                    `Não foi possível comprar o assento ${ingresso.assento}.`
                );
            }

            //marca o assento como ocupado
            assento.classList.remove("selecionado");
            assento.classList.add("ocupado");
        }

        atualizarResumo();

        alert("Compra realizada com sucesso!");

    } catch (erro) {

        console.error("Erro na compra:", erro);
        atualizarResumo();
        alert(erro.message);

    } finally {

        botaoComprar.disabled = false;
    }
});

//busca os assentos ocupados na API
async function carregarAssentosOcupados() {

    try {

        const resposta = await fetch(
            `http://localhost:5160/api/Ingresso/assentos-ocupados?idFilme=${idFilme}&horarioSessao=${encodeURIComponent(horarioSelecionado)}`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao consultar assentos ocupados.");
        }

        const ocupados = await resposta.json();

        //marca como ocupado cada assento retornado pela API
        assentos.forEach(assento => {

            if (ocupados.includes(assento.dataset.assento)) {
                assento.classList.add("ocupado");
            }

        });

    } catch (erro) {

        console.error("Erro ao carregar assentos:", erro);
        alert("Não foi possível carregar os assentos. Tente novamente.");
    }
}