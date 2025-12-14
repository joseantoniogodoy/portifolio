document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('acessibilidade');
  const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
  const opcoes = document.getElementById('opcoes-acessibilidade');

  const aumentaFonteBotao = document.getElementById('aumentar-fonte');
  const diminuirFonteBotao = document.getElementById('diminuir-fonte');

  // Fonte (rem): leitura inicial + limites
  const MIN = 0.8;
  const MAX = 1.6;
  const STEP = 0.1;

  let tamanhoAtualFonte = Number(localStorage.getItem('tamanhoFonte')) || 1;
  tamanhoAtualFonte = Math.min(MAX, Math.max(MIN, tamanhoAtualFonte));
  document.body.style.fontSize = `${tamanhoAtualFonte}rem`;

  function salvarFonte() {
    localStorage.setItem('tamanhoFonte', String(tamanhoAtualFonte));
  }

  function abrirFechar() {
    const aberto = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
    const novoEstado = !aberto;

    botaoAcessibilidade.setAttribute('aria-expanded', String(novoEstado));
    opcoes.hidden = !novoEstado;
  }

  // Toggle do menu
  botaoAcessibilidade.addEventListener('click', abrirFechar);

  // Controles de fonte
  aumentaFonteBotao.addEventListener('click', function () {
    tamanhoAtualFonte = Math.min(MAX, +(tamanhoAtualFonte + STEP).toFixed(2));
    document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    salvarFonte();
  });

  diminuirFonteBotao.addEventListener('click', function () {
    tamanhoAtualFonte = Math.max(MIN, +(tamanhoAtualFonte - STEP).toFixed(2));
    document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    salvarFonte();
  });

  // Fechar ao clicar fora (opcional, melhora usabilidade)
  document.addEventListener('click', function (e) {
    if (!container.contains(e.target)) {
      botaoAcessibilidade.setAttribute('aria-expanded', 'false');
      opcoes.hidden = true;
    }
  });

  // ESC fecha o menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      botaoAcessibilidade.setAttribute('aria-expanded', 'false');
      opcoes.hidden = true;
    }
  });
});
