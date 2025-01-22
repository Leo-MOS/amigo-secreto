function ByID(id) { // Objetivo dessa função é não precisar ficar chamando o método documento.getElementByID() o tempo inteiro
    return document.getElementById(id);
}

var nomeAmigo = ByID('nome-amigo');
var listaAmigos = ByID('lista-amigos');
var arrayAmigos = []; //Vai guardar todos os nomes dos participantes
var listaSorteio = ByID('lista-sorteio');

function adicionar() {
    // Verificar se algum nome foi inserido
    if (nomeAmigo.value == '') {
        alert('Insira o nome do amigo.');
        return
    }

    // Verificar se o nome inserido já foi inserido antes
    if (arrayAmigos.map(elemento => elemento.toUpperCase()).includes(nomeAmigo.value.toUpperCase())) {
        alert(`Este amigo já está participando. Insira um novo!`);
        return
    }

    // Obter o nome inserido e guardar no array
    arrayAmigos.push(nomeAmigo.value);

    // Escrever o nome inserido na tela
    listaAmigos.innerHTML = arrayAmigos.join('<br>'); //Escreve os nomes dos amigos acrescentando quebras de linha entre eles
    // Isto não funcionar com .textContent. Segundo a Luri, .textContent define apenas o texto puro dentro da tag HTML, enquanto .innerHTML interpreta de fato o código HTML inserido.

    // Limpar o campo de entrada
    nomeAmigo.value = '';

    //alert(`${arrayAmigos[arrayAmigos.length-1]} incluído com sucesso!`);
    //👆 comentado apenas para facilitar os testes.

    // Limpar a lista de sorteio
    listaSorteio.innerHTML = '';
    arraySorteio = [];
    arrayResultado = [];
    // Esta última etapa serve para limpar a lista caso o usuário insira novos amigos mesmo depois de um sorteio.
}

function sortear() {
    console.log('Sorteio solicitado.')
    // Verificar se há pelo menos 4 participantes
    if (arrayAmigos.length < 4) {
        console.log('Quantidade de amigos insuficiente.');
        alert('Inscreva pelo menos 4 amigos para participar da brincadeira.');
        return; //Interrompe a rotina
    }

    let arraySorteio = [...arrayAmigos]; //Vai armazenar o sorteio
    
    //console.log(arrayAmigos);
    //console.log(arraySorteio);
    embaralharArray(arraySorteio); //embaralha o array
    //console.log('depois de embaralhar');
    //console.log(arrayAmigos);
    //console.log(arraySorteio);

    let comparacao = arrayAmigos.map((elemento, i) => elemento === arraySorteio[i]);
    let limiteWhile = 100;

    while (comparacao.includes(true) && limiteWhile > 0) {
        embaralharArray(arraySorteio);
        comparacao = arrayAmigos.map((elemento, i) => elemento === arraySorteio[i]);
        limiteWhile--;
    }

    if (limiteWhile == 0) {
        console.log('Interrompido por looping longo.');
        return
    } else {
        console.log(`${100 - limiteWhile} iterações executadas.`);
    }

    let arrayResultado = [];

    for (i = 0; i < arrayAmigos.length; i++) {
        arrayResultado.push([arrayAmigos[i], arraySorteio[i]].join(' → '));
    }

    listaSorteio.innerHTML = arrayResultado.join('<br>');
}    


function reiniciar() {
    // Limpar entrada do nome amigo
    nomeAmigo.value = ''; //OK
    listaAmigos.innerHTML = ''; //OK
    arrayAmigos = [];
    listaSorteio.innerHTML = ''; //OK

    // Limpar a lista de amigos
    // Limpar o resultado do sorteio
    
    console.clear();
    console.log('Sorteio reiniciado.');
}

function gerarNumeroAleatorio(i, max){
    numero = parseInt(Math.random() * (max + 1)); //gera um número aleatório no intervalo [0,max+1), quando converte para inteiro fica [0,max]

    if (numero == i) {
        return gerarNumeroAleatorio(i, max); //chama a função novamente se o número gerado for igual a i
    } else {
        return numero; //retorna o número sorteado, encerrando a recursão
    }
}

function embaralharArray(array){
    for (let i = 0; i < array.length; i++) {
        posicaoSorteada = gerarNumeroAleatorio(i, array.length - 1); //gera um número aleatório entre 0 e o último índice de arraySorteio
        [array[i], array[posicaoSorteada]] = [array[posicaoSorteada], array[i]]; //inverte os elementos de posição
    } //repete em todos os elementos
}