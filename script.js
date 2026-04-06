(function() {
  const form = document.getElementById('loginForm');
  const feedbackDiv = document.getElementById('formFeedback');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheck = document.getElementById('remember');

  // Helper para mostrar mensagem de erro/sucesso simulada
  function showMessage(msg, isError = true) {
    feedbackDiv.textContent = msg;
    feedbackDiv.style.color = isError ? '#d14545' : '#2c6e4f';
    if (!isError) {
      setTimeout(() => {
        if (feedbackDiv.textContent === msg) feedbackDiv.textContent = '';
      }, 2500);
    } else {
      setTimeout(() => {
        if (feedbackDiv.textContent === msg) feedbackDiv.textContent = '';
      }, 3000);
    }
  }

  // Carregar "lembrar email" se existir no localStorage (simulação de persistência)
  function loadRememberedEmail() {
    const savedEmail = localStorage.getItem('globalvoice_remembered_email');
    const savedRemember = localStorage.getItem('globalvoice_remember_check');
    if (savedRemember === 'true' && savedEmail) {
      emailInput.value = savedEmail;
      rememberCheck.checked = true;
    } else {
      rememberCheck.checked = false;
    }
  }

  // Salvar preferência de "lembrar-me"
  function persistRemember(email, rememberMe) {
    if (rememberMe && email) {
      localStorage.setItem('globalvoice_remembered_email', email);
      localStorage.setItem('globalvoice_remember_check', 'true');
    } else {
      localStorage.removeItem('globalvoice_remembered_email');
      localStorage.setItem('globalvoice_remember_check', 'false');
    }
  }

  // validação simples front-end
  function validateForm(email, password) {
    if (!email.trim()) {
      showMessage('Por favor, informe o e-mail.', true);
      emailInput.focus();
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      showMessage('Insira um e-mail válido (ex: nome@dominio.com).', true);
      emailInput.focus();
      return false;
    }
    if (!password.trim()) {
      showMessage('A senha não pode estar vazia.', true);
      passwordInput.focus();
      return false;
    }
    if (password.length < 4) {
      showMessage('A senha deve ter pelo menos 4 caracteres (apenas para demonstração).', true);
      passwordInput.focus();
      return false;
    }
    return true;
  }

  // Simular requisição de login (integração futura com backend real)
  function fakeLoginRequest(email, password, remember) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'demo@globalvoice.com' || (email.includes('@') && password.length >= 4)) {
          resolve({ success: true, message: 'Login bem-sucedido! Redirecionando...' });
        } else {
          resolve({ success: false, message: 'Credenciais inválidas. Tente demo@globalvoice.com' });
        }
      }, 800);
    });
  }

  // Evento de submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheck.checked;

    if (!validateForm(email, password)) return;

    const btn = form.querySelector('.login-btn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Entrando...';
    showMessage('Verificando credenciais...', false);

    try {
      const result = await fakeLoginRequest(email, password, remember);
      if (result.success) {
        persistRemember(email, remember);
        showMessage(result.message, false);
        setTimeout(() => {
          alert('✅ Demonstração: redirecionamento para o painel GlobalVoice.\n(integração com backend em desenvolvimento)');
          btn.disabled = false;
          btn.textContent = originalText;
        }, 1200);
      } else {
        persistRemember(email, false);
        showMessage(result.message, true);
        btn.disabled = false;
        btn.textContent = originalText;
        passwordInput.value = '';
        passwordInput.focus();
      }
    } catch (err) {
      showMessage('Erro de conexão. Tente novamente.', true);
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });

  // link "Esqueceu a senha" (simulação de recuperação)
  const forgotLink = document.getElementById('forgotPasswordLink');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🔐 Funcionalidade de recuperação de senha.\nEm breve integração com e-mail de redefinição.');
    });
  }

  // Carregar email lembrado ao iniciar a página
  loadRememberedEmail();

  // pequeno efeito para foco visual
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement?.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement?.classList.remove('focused');
    });
  });
})();