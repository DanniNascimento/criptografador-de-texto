// Selecionando os elementos necessários
const textarea = document.getElementById('input-text');
const imagem = document.getElementById('imagem');
const textoCriptografadoElement = document.getElementById('texto-criptografado');
const botaoCriptografar = document.getElementById('botao-criptografar');
const botaoDescriptografar = document.getElementById('botao-descriptografar');
const botaoLimpar = document.getElementById('botao-limpar');
const botaoCopiar = document.getElementById('botao-copiar');

// Variáveis para armazenarzenamento do texto criptografado e o estado atual
let textoCriptografado = '';
let textoDescriptografado = '';
let estadoTexto = ''; // 'criptografado' ou 'descriptografado'

// Adicionando evento para o botão Criptografar
botaoCriptografar.addEventListener('click', () => {
    const texto = textarea.value;
    textoCriptografado = criptografarTexto(texto); // Atualizando a variável com o texto criptografado
    estadoTexto = 'criptografado'; // Atualizando o estado
    imagem.style.display = 'none';
    textoCriptografadoElement.innerText = textoCriptografado;
    textoCriptografadoElement.style.display = 'block';
    alert('Parabéns, texto criptografado com sucesso!'); // Mostrando o alerta
});

// Adicionando evento para o botão Descriptografar
botaoDescriptografar.addEventListener('click', () => {
    const texto = textarea.value;
    textoDescriptografado = descriptografarTexto(texto);
    estadoTexto = 'descriptografado'; // Atualizando o estado
    imagem.style.display = 'none';
    textoCriptografadoElement.innerText = textoDescriptografado;
    textoCriptografadoElement.style.display = 'block';
    alert('Parabéns, texto descriptografado com sucesso!'); // Mostrando o alerta
});

// Adicionando evento para o botão Limpar
botaoLimpar.addEventListener('click', () => {
    textarea.value = ''; // Limpando o conteúdo da textarea
    textoCriptografadoElement.innerText = ''; // Limpando o texto criptografado
    textoCriptografadoElement.style.display = 'none'; // Escondendo o texto criptografado
    imagem.style.display = 'block'; // Exibindo a imagem
    textoCriptografado = ''; // Resetando a variável do texto criptografado
    textoDescriptografado = ''; // Resetando a variável do texto descriptografado
    estadoTexto = ''; // Resetando o estado do texto
});

// Adicionando evento para o botão Copiar
botaoCopiar.addEventListener('click', () => {
    let textoParaCopiar = '';

    if (estadoTexto === 'criptografado') {
        textoParaCopiar = textoCriptografado;
    } else if (estadoTexto === 'descriptografado') {
        textoParaCopiar = textoDescriptografado;
    } else {
        alert('Nenhum texto para copiar!');
        return; // O botao não irar nada se não houver texto para copiar
    }
    
    // Copiando o texto correto
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => {
            alert('Texto copiado com sucesso!');
        })
        .catch(err => {
            console.error('Erro ao copiar o texto: ', err);
        });
});

// Função para criptografar o texto
function criptografarTexto(texto) {
    // Substituições
    const substituicoes = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    let textoCriptografado = '';

    for (let i = 0; i < texto.length; i++) {
        const letra = texto[i];
        if (substituicoes[letra]) {
            textoCriptografado += substituicoes[letra];
        } else {
            textoCriptografado += letra;
        }
    }

    return textoCriptografado;
}

// Função para descriptografar o texto
function descriptografarTexto(textoCriptografado) {
    // Substituições
    const substituicoes = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    // Criando forma regular para substituir as palavras
    const regex = new RegExp(Object.keys(substituicoes).join('|'), 'g');

    let textoDescriptografado = textoCriptografado.replace(regex, (match) => substituicoes[match]);

    return textoDescriptografado;
}

// Buscando o elemento do canvas
const c = document.getElementById("matrix");

//dando definicao ao seu contexto
const ctx = c.getContext("2d");

// definindo o canvas com tamanho máximo da tela
c.height = window.innerHeight;
c.width = window.innerWidth;

//definindo o tamanho e tipo de fonte do tetxo
ctx.fillStyle = "#0F0";
ctx.font = `60px arial`;
//ctx.fillText("Matrix Rain", 0, 60);

//letras no estilo matrix
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "K", "M", "N", "O", "P", "Q", "R", "S", "T", "Y", "W", "X", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "l", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "z", ".", "?", "!", "+", "-", "*", "/", ";", ];

const fontSize = 18;

//definindo quantas colunas serao necessaria pelo tamanho da tela e fonte
const columns = c.width / fontSize;

//criando um array para cada gota, sempre iniciando na posicao do y=1
const drops = new Array(Math.floor(columns)).fill(1);

function draw() {
    // preenchendo a tela toda de preto com opacidade e letras sumindo aos poucos
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    // Cor e estilo da fonte do texto matrix
    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px arial`;

    for (let i = 0; i < drops.length; i++) {
        // buscando uma letra randomicamente no nosso array
        const text = letters[Math.floor(Math.random() * letters.length)];

        // escrevendo na tela
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // resetando a posição da letra ao chegar no fim
        if (drops[i] * fontSize > c.height && Math.random() > 0.95) {
            drops[i] = 0;
        }

        // movendo as letras no eixo y
        drops[i]++;
    }

    // chamada recursiva para animar quadro a quadro
    window.requestAnimationFrame(draw);
}

// chamando a função criada
draw();
