// app.js - Lógica para o sorteio do Torneio Interno

// Função para mostrar/esconder a caixa de texto dos nomes
function toggleCaixaNomes() {
    const adicionarNomesCheckbox = document.getElementById('adicionar-nomes');
    const containerNomes = document.getElementById('container-nomes');
  
    if (adicionarNomesCheckbox && containerNomes) { // Verifica se os elementos existem na página
      adicionarNomesCheckbox.addEventListener('change', () => {
        if (adicionarNomesCheckbox.checked) {
          containerNomes.style.display = 'block';
        } else {
          containerNomes.style.display = 'none';
        }
      });
    }
}
  
  // Função para sortear as duplas e redirecionar para a página de resultados
  function sortear(event) {
    // Previne o comportamento padrão do formulário de recarregar a página
    event.preventDefault(); 
  
    // Obtém os valores dos campos do formulário
    let categoria = document.getElementById('categoria').value;
    let quantidadeDupla = parseInt(document.getElementById('quantidade-duplas').value);
    let quantidadeBionicos = parseInt(document.getElementById('quantidade-bionicos').value);
    let nomesDuplas = []; // Array para armazenar os nomes das duplas
  
    // Validação dos nomes das duplas com a mensagem adicional
    if (document.getElementById('adicionar-nomes').checked) {
      // Se estiver marcado, obtém os nomes das duplas da textarea, removendo linhas vazias
      nomesDuplas = document.getElementById('nomes-duplas').value.trim().split('\n').filter(nome => nome.trim() !== "");
  
      // 1. Valida se a quantidade de nomes é igual à quantidade de duplas
      if (nomesDuplas.length !== quantidadeDupla) {
        let diferença = Math.abs(nomesDuplas.length - quantidadeDupla); // Calcula a diferença
        if (nomesDuplas.length < quantidadeDupla) {
            if (diferença === 1) {
                alert(`Falta ${diferença} nome de dupla. Por favor, insira um nome para cada dupla participante.`);
              } else {
                alert(`Faltam ${diferença} nomes de duplas. Por favor, insira um nome para cada dupla participante.`);
              }
        } else {
          alert(`Você inseriu ${diferença} nomes de duplas a mais. Por favor, verifique a quantidade de duplas e a lista de nomes.`);
        }
        return; 
      }
  
      // 2. Valida se há nomes repetidos
      let nomesRepetidos = nomesDuplas.filter((nome, index) => nomesDuplas.indexOf(nome) !== index);
      if (nomesRepetidos.length > 0) {
        alert(`Os seguintes nomes de duplas estão repetidos: ${nomesRepetidos.join(', ')}. Por favor, corrija a lista de nomes.`);
        return;
      }
    }
  
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
  
    // Armazena os nomes das duplas no localStorage, se tiverem sido informados
    if (nomesDuplas.length > 0) {
      localStorage.setItem('nomesDuplas', JSON.stringify(nomesDuplas));
    }
  
    // Redireciona o usuário para a página "resultado.html"
    window.location.href = "resultado.html";
}
  
  // Função para gerar um número aleatório dentro de um intervalo (min e max)
  function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  function copiarResultados() {
    // Recupera os dados do localStorage
    let categoria = localStorage.getItem('categoria');
    let sorteados = JSON.parse(localStorage.getItem('sorteados'));
    let quantidadeBionicos = parseInt(localStorage.getItem('quantidadeBionicos'));
    let nomesDuplas = localStorage.getItem('nomesDuplas') ? JSON.parse(localStorage.getItem('nomesDuplas')) : [];
  
    // Formata o texto a ser copiado
    let textoCopiado = `Torneio Interno
Categoria: ${categoria}

Duplas Sorteadas:

`;
  
    for (let i = 0; i < sorteados.length; i++) {
      let duplaNumero = sorteados[i];
      let textoDupla = nomesDuplas.length > 0 ? nomesDuplas[duplaNumero - 1] : duplaNumero;
  
      if (i < quantidadeBionicos) {
        textoCopiado += `${i + 1}° Biônico: ${textoDupla}\n`;
      } else {
        let jogo = Math.floor((i - quantidadeBionicos) / 2) + 1;
        let proximaDuplaNumero = sorteados[i + 1];
        let proximoTextoDupla = nomesDuplas.length > 0 ? nomesDuplas[proximaDuplaNumero - 1] : proximaDuplaNumero;
        textoCopiado += `${jogo}° Jogo: ${textoDupla} x ${proximoTextoDupla}\n`;
        i++;
      }
    }
  
    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(textoCopiado)
      .then(() => {
        // Exibe uma mensagem de sucesso (opcional)
        const mensagemCopia = document.getElementById('mensagem-copia');
        mensagemCopia.textContent = "Copiado!"; // Define o texto da mensagem
        mensagemCopia.style.display = "inline-block"; // Exibe a mensagem 

        // Oculta a mensagem após 3 segundos (opcional)
        setTimeout(() => {
        mensagemCopia.style.display = "none"; 
      }, 3000);
      })
      .catch(err => {
        console.error("Falha ao copiar resultados: ", err);
      });
}
  
  // Função executada quando a página de resultados é carregada
  window.onload = function () {
    // Recupera os dados do localStorage
    let sorteados = JSON.parse(localStorage.getItem('sorteados'));
    let quantidadeBionicos = parseInt(localStorage.getItem('quantidadeBionicos'));
    let categoria = localStorage.getItem('categoria');
    let nomesDuplas = localStorage.getItem('nomesDuplas') ? JSON.parse(localStorage.getItem('nomesDuplas')) : [];
  
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
        let duplaNumero = sorteados[i]; // Número da dupla sorteada
        
        let textoDupla; // Variável para armazenar o texto a ser exibido
        if (nomesDuplas.length > 0) { 
          // Se nomesDuplas não estiver vazio, usa os nomes
          textoDupla = nomesDuplas[duplaNumero - 1]; 
        } else {
          // Se nomesDuplas estiver vazio, usa os números
          textoDupla = duplaNumero; 
        }
  
        if (i < quantidadeBionicos) {
          // Se for um biônico, exibe "Biônico"
          listItem.textContent = `${i + 1}° Biônico: ${textoDupla}`; // Usa a variável textoDupla
        } else {
          // Se não for um biônico, calcula o número do jogo
          let jogo = Math.floor((i - quantidadeBionicos) / 2) + 1;
  
          // Se for o último elemento e a quantidade de jogadores restantes for ímpar, exibe apenas o número/nome da dupla
          if (i === sorteados.length - 1 && (sorteados.length - quantidadeBionicos) % 2 !== 0) {
            listItem.textContent = `${textoDupla}`; // Usa a variável textoDupla
          } else {
            // Caso contrário, exibe o número do jogo e as duplas
            let proximaDuplaNumero = sorteados[i + 1]; // Número da próxima dupla no jogo
  
            // Exibe nomes ou números das duplas
            let proximoTextoDupla;
            if (nomesDuplas.length > 0) {
              proximoTextoDupla = nomesDuplas[proximaDuplaNumero - 1];
            } else {
              proximoTextoDupla = proximaDuplaNumero;
            }
            listItem.textContent = `${jogo}° Jogo: ${textoDupla} x ${proximoTextoDupla}`; // Usa as variáveis textoDupla e proximoTextoDupla
            i++; // Pula o próximo elemento, pois ele já foi usado neste jogo
          }
        } 
        listaDuplas.appendChild(listItem);
      }
    }

    const botaoCopiar = document.getElementById('copiar-resultados');
    if (botaoCopiar) {
        botaoCopiar.addEventListener('click', copiarResultados);
    }
  
    // Chama a função para controlar a visibilidade da caixa de texto
    toggleCaixaNomes(); 

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
  
    // Redireciona o usuário para a página "index.html"
    window.location.href = "index.html"; 
}
  
  // Adiciona o evento de "submit" ao formulário (sorteador.html) - FORA da função window.onload
  let formulario = document.getElementById('formulario'); 
  if (formulario) {
    formulario.addEventListener('submit', sortear);
  
    // Chama a função para controlar a visibilidade da caixa de texto
    toggleCaixaNomes(); 
}