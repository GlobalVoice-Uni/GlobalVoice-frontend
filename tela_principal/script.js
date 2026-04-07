document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES DE ELEMENTOS ---
    const chatContainer = document.querySelector('.vg-chat-container');
    const chatMessages = document.querySelector('.vg-chat-messages');
    const chatInput = document.querySelector('.vg-chat-input');
    const sendBtn = document.querySelector('.vg-send-btn');
    const toolbarButtons = document.querySelectorAll('.vg-btn');
    const chatToggleBtn = document.querySelector('.vg-btn[title="Chat"]');

    // --- FUNÇÕES DE CHAT ---

    // Função para adicionar uma nova mensagem ao chat
    function addMessage(sender, text, translation = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'vg-message';
        
        let messageHTML = `
            <span class="sender">${sender}:</span>
            <p>${text}</p>
        `;

        if (translation) {
            messageHTML += `<span class="translation">${translation}</span>`;
        }

        messageDiv.innerHTML = messageHTML;
        chatMessages.appendChild(messageDiv);
        
        // Scroll automatico para a ultima mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Função para enviar mensagem
    function handleSendMessage() {
        const text = chatInput.value.trim();
        if (text !== "") {
            // Adiciona a mensagem do usuário (pra simular tradução automática)
            addMessage("Você (Português)", text, `EN: ${simulateTranslation(text)}`);
            chatInput.value = "";
            
            // Simula uma resposta automática (leva 1.5 segundos) 
            setTimeout(() => {
                addMessage("Sistema", "Tradução processada com sucesso.", "EN: Translation processed successfully.");
            }, 1500);
        }
    }

    // Simulação simples de tradução 
    function simulateTranslation(text) {
        const translations = {
            "olá": "hello",
            "bom dia": "good morning",
            "como vai?": "how are you?",
            "reunião": "meeting",
            "projeto": "project"
        };
        
        const lowerText = text.toLowerCase();
        return translations[lowerText] || "[Simulated Translation]";
    }

    // Eventos de envio
    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // --- FUNÇÕES DA BARRA DE FERRAMENTAS ---

    toolbarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Alterna a classe 'active' para feedback visual
            // Exceto para o chat, que tem lógica própria de visibilidade
            if (btn.title !== "Chat") {
                btn.classList.toggle('active');
                
                // Feedback no console para simular ação
                const status = btn.classList.contains('active') ? "Ativado" : "Desativado";
                console.log(`${btn.title}: ${status}`);
            }
        });
    });

    // Lógica específica para abrir e fechar o Chat
    chatToggleBtn.addEventListener('click', () => {
        const isVisible = chatContainer.style.display !== 'none';
        
        if (isVisible) {
            chatContainer.style.display = 'none';
            chatToggleBtn.classList.remove('active');
        } else {
            chatContainer.style.display = 'flex';
            chatToggleBtn.classList.add('active');
        }
    });

    // Garante que o chat comece aberto e o botão ativo
    chatContainer.style.display = 'flex';
    chatToggleBtn.classList.add('active');

    // Simulação de status de microfone no console
    const micBtn = document.querySelector('.vg-btn.mic');
    micBtn.addEventListener('click', () => {
        const isMuted = !micBtn.classList.contains('active');
        console.log(isMuted ? "Microfone Mutado" : "Microfone Ativo");
    });
});