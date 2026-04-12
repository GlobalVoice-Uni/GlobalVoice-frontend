document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Botão "Saiba Mais" leva até a seção "Como Funciona"
const saibaMaisBtn = document.querySelector('.btn-outline');
if (saibaMaisBtn) {
  saibaMaisBtn.addEventListener('click', () => {
    const comoFunciona = document.querySelector('#como-funciona');
    if (comoFunciona) {
      comoFunciona.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Mensagem de boas-vindas para o botão "Adicionar ao Chrome" (simulação)
const chromeBtn = document.querySelector('.btn-primary');
if (chromeBtn) {
  chromeBtn.addEventListener('click', () => {
    alert('🔊 Em breve, você poderá instalar a extensão GlobalVoice diretamente da Chrome Web Store!');
  });
}