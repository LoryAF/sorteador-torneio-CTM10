function sortear() {
    let quantidadeDupla = parseInt(document.getElementById('quantidade').value);
    let quantidadeBionicos = parseInt(document.getElementById('bionicos').value);

    // Verifica se "Quantidade de Duplas" está vazio
    if (isNaN(quantidadeDupla) || quantidadeDupla === 0) {
        alert('Por favor, preencha o campo "Quantidade de Duplas".');
        return;
    }

    // Verifica se o campo "Quantidade Biônicos" está vazio
    if (isNaN(quantidadeBionicos) || quantidadeBionicos === '') {
        alert('Por favor, preencha o campo "Quantidade Biônicos".');
        return; // Interrompe a função se o campo estiver vazio
    }

    let sorteados = [];
    let numero;

    // Sorteia números para os biônicos
    for (let i = 0; i < quantidadeBionicos; i++) {
        numero = obterNumeroAleatorio(1, quantidadeDupla);

        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(1, quantidadeDupla);
        }

        sorteados.push(numero);
    }

    for (let i = 0; i < quantidadeDupla - quantidadeBionicos; i++) {
        numero = obterNumeroAleatorio(1, quantidadeDupla);

        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(1, quantidadeDupla);
        }

        sorteados.push(numero);
    }

    // Armazena os dados no localStorage para usar na página de resultados
    localStorage.setItem('sorteados', JSON.stringify(sorteados));
    localStorage.setItem('quantidadeBionicos', quantidadeBionicos);

    // Redireciona para a página de resultados
    window.location.href = "resultado.html";
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Carrega os dados do localStorage na página de resultados
window.onload = function () {
    let sorteados = JSON.parse(localStorage.getItem('sorteados'));
    let quantidadeBionicos = parseInt(localStorage.getItem('quantidadeBionicos'));

    if (sorteados) {
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = `<label class="texto__paragrafo">Duplas sorteadas:</label><ul>`;

        // Imprime os números dos biônicos
        if (quantidadeBionicos > 0) {
            for (let i = 0; i < quantidadeBionicos; i++) {
                resultado.innerHTML += `<li>${i + 1} Biônico: ${sorteados[i]}</li>`;
            }
        }

        for (let i = quantidadeBionicos, jogo = 1; i < sorteados.length; i += 2, jogo++) {
            if (i + 1 < sorteados.length) {
                resultado.innerHTML += `<li>${jogo} Jogo: ${sorteados[i]} x ${sorteados[i + 1]}</li>`;
            } else {
                resultado.innerHTML += `<li>${sorteados[i]}</li>`;
            }
        }
        resultado.innerHTML += `</ul>`;
    }
    
    // Verifica se o botão "Reiniciar" está presente na página
    let botaoReiniciar = document.getElementById('btn-reiniciar');
    if (botaoReiniciar) {
        // Se o botão existir, adiciona o evento de clique
        botaoReiniciar.addEventListener('click', reiniciar);
    }
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reiniciar() {
    // Limpa os dados do localStorage
    localStorage.clear();

    // Redireciona para a página inicial
    window.location.href = "index.html";

    //document.getElementById('quantidade').value = '';
    //document.getElementById('bionicos').value = '';
    //document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Duplas sorteadas:</label>';
}