// Variáveis
let listaDeNumerosSorteados = [];
let geracaoMaxima = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let maiorPontuacao = parseInt(localStorage.getItem("maiorPontuacao")) || Infinity;

// Exibir mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10:");
}

// Trocar texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// Iniciar mensagem
exibirMensagemInicial();

// Gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * geracaoMaxima + 1);

    if (listaDeNumerosSorteados.length === geracaoMaxima) {
        listaDeNumerosSorteados = []; 
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Limpar campo
function limparCampo() {
    let chute = document.querySelector("input");
    chute.value = "";
}

// Reiniciar jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

// Verificar chute
function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = "Você descobriu o número secreto em " + tentativas + " " + palavraTentativas;
        exibirTextoNaTela("p", mensagemTentativas);

        if (tentativas < maiorPontuacao) {  // Correção aqui
            maiorPontuacao = tentativas;
            localStorage.setItem("maiorPontuacao", maiorPontuacao);
            document.getElementById("maior-pontuacao").innerText = "Melhor pontuação: " + maiorPontuacao + " tentativas.";
        }

        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

// Atualizar maior pontuação ao carregar a página
window.onload = function () {
    if (maiorPontuacao !== Infinity) {
        document.getElementById("maior-pontuacao").innerText = "Melhor pontuação: " + maiorPontuacao + " tentativas.";
    } else {
        document.getElementById("maior-pontuacao").innerText = "Melhor pontuação: --";
    }
};
