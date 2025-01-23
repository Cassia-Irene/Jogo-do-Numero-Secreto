let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio(); 
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML =  texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTexto('h1', 'Bem-vindo ao Jogo do Número Secreto! 🤫');
    exibirTexto('p', `Eu pensei em um número entre 1 e ${numeroLimite}. Será que você consegue adivinhar?`);
}

exibirMensagemInicial();

function verificarPalpite() {
    let palpite = document.querySelector('input').value;
    
    if (palpite == numeroSecreto) {
        exibirTexto('h1', 'Parabéns! Você acertou! 🎉');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você é um(a) verdadeiro(a) mestre(a) da adivinhação! \n Você acertou em ${tentativas} ${palavraTentativa}.`;
        exibirTexto('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (palpite > numeroSecreto) {
            exibirTexto('p', 'O número secreto é menor! 🤔');
        } else {
            exibirTexto('p', 'O número secreto é maior! 🤔');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    palpite = document.querySelector('input');
    palpite.value = '';
}

function reiniciarGame() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
