/* Declaração de variáveis que serão utilizadas em mais de uma function */
let qtdeCaracteres = "";
let indice = "";
let palavra = "";
let link = "";
let numTentativas = "";
let bloco = "";

let blocoPalavra = document.getElementById("blocos");
let tentativas = document.getElementById("tentativas");

/* Esta função inicia a página e gera um número randômico entre 5 e 12, quantidade de letras de nossas palavras */
function carregarPalavra() {
    
    /* declarar os ids contidos no HTML */
    let tituloPalavra = document.getElementById("titulo");
    let dicaPalavra = document.getElementById("dica");

    /* inicializar as variáveis */
    let numRandom = "";
    let dica = "";

    /* O comando abaixo foi obtido através de consulta no Gemini, para descobrir como gerar um número
       randômico dentro de um intervalo pré-definido */
    numRandom = Math.floor(Math.random() * 8) + 5;
    qtdeCaracteres = numRandom;

    /* O primeiro título do HTML, contendo a quantidade de letras, será exibido através deste comando */
    tituloPalavra.innerHTML = `Adivinhe a palavra com ${qtdeCaracteres} letras`;

    /* Como o índice se inicia pelo 0 e o número inicial do intervalo é o 5, a variável índice é gerada
       através da subtração do número randômico menos o número inicial do intervalo */
    indice = qtdeCaracteres - 5;
    
    /* Passando os valores da palavra e dica selecionadas para as variáveis */
    palavra = dados[indice].palavra.toUpperCase();
    dica = dados[indice].dica;

    /* Criando os blocos com as letras da palavra. Esta função também peguei no Gemini e adaptei para 
       minha página. */
        for (let i = 0; i < qtdeCaracteres; i++) { 
        bloco = document.createElement('div');
        bloco.className = 'square bloco-inicial';
        bloco.id = 'bloco-' + i;
        blocoPalavra.appendChild(bloco);
    };
   
    dicaPalavra.innerHTML = `Dica: ${dica}`;
    
    /* Aqui inicializo a quantidade de tentativas que pode ter */
    numTentativas = 5;
    tentativas.innerHTML = `Você tem ${numTentativas} tentativa(s)!`;
};

/* Esta função verifica a palavra digitada pelo usuário, considerando um for (laço) para cada letra */
function verificar() {
    
    /* pegando as informações digitadas e as tratando */
    let valorPalavra = document.getElementById("campo-palavra").value;
    let validacao = document.getElementById("validacao");

    validacao.innerHTML = ``;
    
    /* Verifica se foi digitada alguma palavra */
    if (!valorPalavra) {
        validacao.innerHTML = `Digite uma palavra!`
        return
    };

    /* Verifica se foi digitado algum caractere não alfanumérico. A função split foi obtida pelo Gemini */
    let caracteresInvalidos = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "!", "?", ".", ","];
    let caracteres = valorPalavra.split('');

    for (let caractere of caracteres) {
      if (caracteresInvalidos.includes(caractere)) {
          validacao.innerHTML = `Caractere inválido encontrado!`
          return
      };
    }
    
    /* No mesmo conceito da funcionalidade anterior, verifica se há algum caractere numérico */
    let caracteresNumericos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let numCaracteres = valorPalavra.split('');

    for (let numCaractere of numCaracteres) {
      if (caracteresNumericos.includes(numCaractere)) {
          validacao.innerHTML = `A palavra não pode ter caractere numérico!`
          return
      };
    }

    /* Aqui é verificado se a quantidade de caracteres corresponde a da palavra selecionada */
    if (valorPalavra.length !== qtdeCaracteres) {
        validacao.innerHTML = `Quantidade incorreta de caracteres!`
        return
    };

    valorPalavra = valorPalavra.toUpperCase();
    
    /* De forma incremental, o processo "varre" a string para bater letra por letra se a palavra digitada
       é a mesma da selecionada. Se sim, ele marca como verde o bloco; se não, ele marca como vermelho */
    for (let i = 0; i < qtdeCaracteres; i++) {
        let blocoLetra = document.getElementById('bloco-' + i);
        if (valorPalavra[i] === palavra[i]) {
            blocoLetra.className = 'square bloco-correto';
            blocoLetra.innerHTML = valorPalavra[i];
        }
        if (valorPalavra[i] !== palavra[i]) {
            blocoLetra.className = 'square bloco-incorreto';
            blocoLetra.innerHTML = valorPalavra[i];
        }
    }
    
    /* Condição de tratamento quando a palavra for adivinhada antes de 5 tentativas. A função 'reload' e
    o atributo disabled foram obtidos através do Gemini */
    if (valorPalavra === palavra) {
        let msgResultado = document.getElementById("resultado")
        link = dados[indice].link;
        msgResultado.innerHTML =
        ` <h2 class="frase-correta">
              Você acertou! Para saber mais sobre o tema, <a href=${link} target="_blank">clique aqui</a>
          </h2>
          <button class="novo-jogo" onclick="window.location.reload();">Novo Jogo</button>
        `;
        document.getElementById("verifica").disabled = true;
        return;
    };
    
    /* Condição de tratamento quando a palavra não for adivinhada antes de 5 tentativas. A função 'reload' e
    o atributo disabled foram obtidos através do Gemini. Embora a condicional 'else' seja muito conehcida,
    ela não foi atribuída neste código por não ter sido apresentada em aula. Poderia colocar como as demais
    que busquei no Gemini, mas, preferi manter um código "simplista" tratando somente por 'if' */
    if (valorPalavra !== palavra) {
        numTentativas -= 1;
        tentativas.innerHTML = `Você tem ${numTentativas} tentativa(s)!`;
    };

    if (numTentativas === 0) {
        let msgResultado = document.getElementById("resultado")
        link = dados[indice].link;
        msgResultado.innerHTML =
        ` <h2 class="frase-incorreta">
              Que pena... A palavra correta é ${palavra}. Para saber mais sobre o tema, <a href=${link} target="_blank">clique aqui</a>
          </h2>
          <button class="novo-jogo" onclick="window.location.reload();">Novo Jogo</button>
        `;
        document.getElementById("verifica").disabled = true;
        return;
    };
};