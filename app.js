// app.js - Lógica para o sorteio do Torneio Interno

// Função para sortear as duplas e redirecionar para a página de resultados
function sortear(event) {
    // Previne o comportamento padrão do formulário de recarregar a página
    event.preventDefault(); 

    // Obtém os valores dos campos do formulário
    let categoria = document.getElementById('categoria').value;
    let quantidadeDupla = parseInt(document.getElementById('quantidade-duplas').value);
    let quantidadeBionicos = parseInt(document.getElementById('quantidade-bionicos').value);

    // Valida se o campo "Categoria" está vazio
    if (categoria === '') {
        alert('Por favor, preencha o campo "Categoria".');
        return; // Encerra a função se a categoria estiver vazia
    }

    // Valida se o campo "Quantidade de Duplas" está vazio ou igual a zero
    if (isNaN(quantidadeDupla) || quantidadeDupla === 0) {
        alert('Por favor, preencha o campo "Quantidade de Duplas".');
        return; // Encerra a função se a quantidade de duplas for inválida
    }

    // Valida se o campo "Quantidade de Biônicos" está vazio 
    if (isNaN(quantidadeBionicos) || quantidadeBionicos === '') {
        alert('Por favor, preencha o campo "Quantidade Biônicos".');
        return; // Encerra a função se a quantidade de biônicos for inválida
    }

    // Cria um array vazio para armazenar os números sorteados
    let sorteados = [];
    let numero;

    // Sorteia os números para os biônicos, garantindo que não haja repetição
    for (let i = 0; i < quantidadeBionicos; i++) {
        // Gera um número aleatório entre 1 e a quantidade de duplas
        numero = obterNumeroAleatorio(1, quantidadeDupla);

        // Verifica se o número já foi sorteado
        while (sorteados.includes(numero)) {
            // Se o número já foi sorteado, gera um novo número até que seja um número único
            numero = obterNumeroAleatorio(1, quantidadeDupla);
        }

        // Adiciona o número sorteado ao array 'sorteados'
        sorteados.push(numero);
    }

    // Sorteia os números para as duplas restantes (que não são biônicos)
    for (let i = 0; i < quantidadeDupla - quantidadeBionicos; i++) {
        // Gera um número aleatório entre 1 e a quantidade de duplas
        numero = obterNumeroAleatorio(1, quantidadeDupla);

        // Verifica se o número já foi sorteado
        while (sorteados.includes(numero)) {
            // Se o número já foi sorteado, gera um novo número até que seja um número único
            numero = obterNumeroAleatorio(1, quantidadeDupla);
        }

        // Adiciona o número sorteado ao array 'sorteados'
        sorteados.push(numero);
    }

    // Armazena os dados no localStorage para serem usados na página de resultados
    localStorage.setItem('sorteados', JSON.stringify(sorteados));
    localStorage.setItem('quantidadeBionicos', quantidadeBionicos);
    localStorage.setItem('categoria', categoria);

    // Redireciona o usuário para a página "resultado.html"
    window.location.href = "resultado.html";
}

// Função para gerar um número aleatório dentro de um intervalo (min e max)
function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função executada quando a página de resultados é carregada
window.onload = function () {
    // Recupera os dados do localStorage
    let sorteados = JSON.parse(localStorage.getItem('sorteados'));
    let quantidadeBionicos = parseInt(localStorage.getItem('quantidadeBionicos'));
    let categoria = localStorage.getItem('categoria');

    // Verifica se existem dados de sorteio no localStorage
    if (sorteados) {
        // Obtém os elementos HTML relevantes
        let categoriaResultado = document.getElementById('categoria-resultado');
        let listaDuplas = document.getElementById('lista-duplas');

        // Exibe a categoria
        categoriaResultado.textContent = categoria;

        // Exibe os resultados das duplas sorteadas
        for (let i = 0; i < sorteados.length; i++) {
            let listItem = document.createElement('li');

            if (i < quantidadeBionicos) {
                // Se for um biônico, exibe "Biônico"
                listItem.textContent = `${i + 1} Biônico: ${sorteados[i]}`;
            } else {
                // Se não for um biônico, calcula o número do jogo
                let jogo = Math.floor((i - quantidadeBionicos) / 2) + 1;

                // Se for o último elemento e a quantidade de jogadores restantes for ímpar, exibe apenas o número da dupla
                if (i === sorteados.length - 1 && (sorteados.length - quantidadeBionicos) % 2 !== 0) {
                    listItem.textContent = `${sorteados[i]}`;
                } else {
                    // Caso contrário, exibe o número do jogo e as duplas
                    listItem.textContent = `${jogo} Jogo: ${sorteados[i]} x ${sorteados[i + 1]}`;
                    i++; // Pula o próximo elemento, pois ele já foi usado neste jogo
                }
            }
            listaDuplas.appendChild(listItem);
        }
    }

    // Adiciona um evento de clique ao botão "Reiniciar" para limpar o localStorage e redirecionar para a página inicial
    let botaoReiniciar = document.getElementById('btn-reiniciar');
    if (botaoReiniciar) {
        botaoReiniciar.addEventListener('click', reiniciar);
    }
};

// Função para limpar os dados do localStorage e redirecionar para a página inicial
function reiniciar() {
    // Limpa todos os dados armazenados no localStorage
    localStorage.clear(); 

    // Redireciona o usuário para a página "sorteador.html"
    window.location.href = "index.html"; 
}

// Adiciona o evento de "submit" ao formulário (sorteador.html) - FORA da função window.onload
let formulario = document.getElementById('formulario'); // Corrigido: ID do formulário
if (formulario) {
    formulario.addEventListener('submit', sortear);
}