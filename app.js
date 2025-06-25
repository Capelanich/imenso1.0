let listaDeSorteio = [];
let maximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
let acertou = false;

function exibirTextoNaTela(tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.1});
}

function exibirInicio() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${maximo}`);
}

exibirInicio();

function verificarChute() {
    if (acertou) return; // Não faz nada se já acertou

    let chute = document.querySelector('input').value;
    tentativas++;
    if (chute == numeroSecreto) {
        acertou = true;
        let numeroTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Você acertou em ${tentativas} ${numeroTentativas}.`;
        exibirTextoNaTela('h1', `Acertou! É ${numeroSecreto}.`);
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `Errou. O número secreto é menor que ${chute}.`);
        limparCampo();
    } else {
        exibirTextoNaTela('p', `Errou. O número secreto é maior que ${chute}.`);
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * maximo + 1);
    let quantidadeDeElementosNaLista = listaDeSorteio.length;

    if (quantidadeDeElementosNaLista == maximo) {
        listaDeSorteio = [];
    }

    if (listaDeSorteio.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
        listaDeSorteio.push(numeroEscolhido);
        console.log(listaDeSorteio);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${maximo}`);
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    acertou= false;
    exibirInicio();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}