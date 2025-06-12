const typingSpeed = 1;
const chatBox = document.getElementById('chatBox');
const inputText = document.getElementById('inputText');
const sendButton = document.getElementById('sendButton');
const stopButton = document.getElementById('stopButton');
let isBotTyping = false;
let botTypingTimeout;

inputText.addEventListener('input', () => {
    sendButton.disabled = inputText.value.trim() === '';
});

inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !sendButton.disabled && !isBotTyping) {
        sendButton.click();
    }
});

sendButton.addEventListener('click', () => {
    const message = inputText.value.trim();
    if (!message) return;

    addUserMessage(message);
    inputText.value = '';
    showTypingIndicator();

    getChat(message)
        .then(response => {
            hideTypingIndicator();
            addBotMessage(response);
        })
        .catch(error => {
            hideTypingIndicator();
            addBotMessage('서버 오류가 발생했습니다. 다시 시도해 주세요.');
            console.error(error);
        });

    sendButton.disabled = true;
});

stopButton.addEventListener('click', () => {
    setBotTypingStop();
    hideTypingIndicator();
    if (botTypingTimeout) clearTimeout(botTypingTimeout);
    addBotMessage('답변이 중단되었습니다.');
});

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user';
    const messageText = document.createElement('p');
    messageText.innerHTML = message;
    messageElement.appendChild(messageText);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(message) {
    setBotTypingStart();

    const messageElement = document.createElement('div');
    messageElement.className = 'message bot';

    const botImage = document.createElement('img');
    botImage.src = '/static/img/bot.png';
    botImage.alt = 'Bot';
    messageElement.appendChild(botImage);

    const messageText = document.createElement('p');
    messageElement.appendChild(messageText);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    const html = marked.parse(message);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const parts = Array.from(tempDiv.childNodes);
    let typingIndex = 0;

    function typeNext() {
        if (typingIndex >= parts.length) {
            setBotTypingStop();
            return;
        }

        const part = parts[typingIndex++];
        if (part.nodeType === Node.TEXT_NODE) {
            let i = 0;
            function typeChar() {
                if (i < part.textContent.length) {
                    messageText.innerHTML += part.textContent.charAt(i++);
                    chatBox.scrollTop = chatBox.scrollHeight;
                    botTypingTimeout = setTimeout(typeChar, typingSpeed);
                } else {
                    typeNext();
                }
            }
            typeChar();
        } else if (part.nodeType === Node.ELEMENT_NODE) {
            messageText.appendChild(part.cloneNode(true));
            typeNext();
        }
    }

    typeNext();
}

function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'message bot typing-indicator';
    typing.innerHTML = '입력 중...';
    typing.id = 'typingIndicator';
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

function setBotTypingStart() {
    isBotTyping = true;
    sendButton.style.display = 'none';
    stopButton.style.display = 'flex';
}

function setBotTypingStop() {
    isBotTyping = false;
    sendButton.style.display = 'flex';
    stopButton.style.display = 'none';
}

function getChat(message) {
    return fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
        .then(res => res.json())
        .then(data => data.reply || '응답이 없습니다.')
        .catch(() => '서버 오류가 발생했습니다. 다시 시도해 주세요.');
}

document.addEventListener('DOMContentLoaded', () => {
    addBotMessage('취업 지원 챗봇에 오신 것을 환영합니다!\n\n**"이력서 작성 가이드"**, **"직업 선택"**, **"채용 공고 제공"**, **"학습 자료 제공"** 중 하나를 입력해 주세요.');
});