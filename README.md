# GlobalVoice-frontend
Aqui será o ambiente dos códigos front-end do GlobalVoice


Frontend da extensão GlobalVoice para tradução simultânea em videoconferências.

Repositório com duas frentes complementares (embora estejam no mesmo frontend, a organização separa os fluxos):

- **Homepage institucional**: landing page do produto (globalvoice.com)
- **Extensão (Chrome)**: interface da extensão (popup, chat, barra de controle)

## Visão geral

A ideia é separar os contextos:

- **Homepage** para apresentação do produto, download, documentação.
- **Extensão** para a experiência dentro da videoconferência (captura de áudio, tradução, chat).

Assim cada frente evolui com seus próprios arquivos HTML/CSS/JS e dependências, sem misturar o código da landing page com o código da extensão.


## Setup inicial

1. **Clonar o repositório**

bash : git clone https://github.com/SnapShare-UNi/GlobalVoice-frontend.git
cd GlobalVoice-frontend

Visualizar a homepage
Basta abrir o arquivo homepage/index.html no navegador.
