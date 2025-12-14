document.addEventListener('DOMContentLoaded', function () {
  const aumentaFonteBotao = document.getElementById('aumentar-fonte');
  const diminuiFonteBotao = document.getElementById('diminuir-fonte');

  
  const alternaContraste = document.getElementById(\'alterna-contraste\');
const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
  const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');
  const containerAcessibilidade = document.getElementById('acessibilidade');

  // ===== Fonte (melhoria): limites + persistência =====
  const STEP = 0.1;
  const MIN = 0.8;
  const MAX = 1.6;

  let tamanhoAtualFonte = Number(localStorage.getItem('tamanhoFonte')) || 1;
  tamanhoAtualFonte = Math.min(MAX, Math.max(MIN, tamanhoAtualFonte));
  document.body.style.fontSize = `${tamanhoAtualFonte}rem`;

  function salvarFonte() {
    localStorage.setItem('tamanhoFonte', String(tamanhoAtualFonte));
  }

  aumentaFonteBotao.addEventListener('click', function () {
    tamanhoAtualFonte = Math.min(MAX, +(tamanhoAtualFonte + STEP).toFixed(2));
    document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    salvarFonte();
  });

  diminuiFonteBotao.addEventListener('click', function () {
    tamanhoAtualFonte = Math.max(MIN, +(tamanhoAtualFonte - STEP).toFixed(2));
    document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    salvarFonte();
  });  // ===== Alto contraste (Aula 06) =====
  if (alternaContraste) {
    const CONTRASTE_KEY = 'altoContrasteAtivo';
    const ativoSalvo = localStorage.getItem(CONTRASTE_KEY);
    if (ativoSalvo === 'true') {
      document.body.classList.add('alto-contraste');
    }
    alternaContraste.setAttribute('aria-pressed', String(document.body.classList.contains('alto-contraste')));
    alternaContraste.addEventListener('click', function (e) {
      e.stopPropagation();
      document.body.classList.toggle('alto-contraste');
      localStorage.setItem(CONTRASTE_KEY, String(document.body.classList.contains('alto-contraste')));
    
      alternaContraste.setAttribute('aria-pressed', String(document.body.classList.contains('alto-contraste')));
});
  }



  // ===== Menu (Aula 05): toggle de classes + aria-expanded =====
  function abrirFecharMenu() {
    botaoDeAcessibilidade.classList.toggle('rotacao-botao');
    opcoesDeAcessibilidade.classList.toggle('apresenta-lista');

    const aberto = !opcoesDeAcessibilidade.classList.contains('apresenta-lista');
    botaoDeAcessibilidade.setAttribute('aria-expanded', String(aberto));
    botaoDeAcessibilidade.setAttribute(
      'aria-label',
      aberto ? 'Fechar opções de acessibilidade' : 'Abrir opções de acessibilidade'
    );
  }

  function fecharMenu() {
    // garante que volte ao estado fechado (vertical + lista escondida)
    if (!opcoesDeAcessibilidade.classList.contains('apresenta-lista')) {
      opcoesDeAcessibilidade.classList.add('apresenta-lista');
    }
    if (!botaoDeAcessibilidade.classList.contains('rotacao-botao')) {
      botaoDeAcessibilidade.classList.add('rotacao-botao');
    }
    botaoDeAcessibilidade.setAttribute('aria-expanded', 'false');
    botaoDeAcessibilidade.setAttribute('aria-label', 'Abrir opções de acessibilidade');
  }

  botaoDeAcessibilidade.addEventListener('click', function (e) {
    e.stopPropagation();
    abrirFecharMenu();
    const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';
    botaoDeAcessibilidade.setAttribute('aria-expanded', String(!botaoSelecionado));

  });

  // Melhoria: fechar ao clicar fora
  document.addEventListener('click', function (e) {
    if (containerAcessibilidade && !containerAcessibilidade.contains(e.target)) {
      fecharMenu();
    }
  });

  // Melhoria: ESC fecha o menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharMenu();
    }
  });
});

// ===== Melhoria: ao fechar modal, retornar o foco ao botão que abriu =====
document.addEventListener('DOMContentLoaded', function () {
  let ultimoGatilhoModal = null;

  document.querySelectorAll('[data-bs-toggle="modal"]').forEach((btn) => {
    btn.addEventListener('click', function () {
      ultimoGatilhoModal = btn;
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('hidden.bs.modal', function () {
      if (ultimoGatilhoModal) {
        ultimoGatilhoModal.focus();
      }
    });
  });
});
