// Contador de tempo de namoro
const startDate = new Date("2021-09-12");

function updateCounter() {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
        minutes--;
        seconds += 60;
    }

    if (minutes < 0) {
        hours--;
        minutes += 60;
    }

    if (hours < 0) {
        days--;
        hours += 24;
    }

    if (days < 0) {
        months--;
        let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("counter").innerHTML = `💜 ${years} anos, ${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos 💜`;
}

setInterval(updateCounter, 1000);
updateCounter();

// Carrossel de mensagens
const messages = [
    "Você é a pessoa mais incrível da minha vida. Eu te amo mais do que tudo! 💖",
    "Cada dia com você é como um presente que nunca quero parar de abrir. 🎁",
    "Você faz meu coração bater mais rápido e o mundo parecer mais bonito. 🌍",
    "Te amar é a melhor aventura da minha vida. 🚀",
    "Prometo estar sempre ao seu lado, hoje e para sempre. 💍"
];
let messageIndex = 0;

document.getElementById('secretButton').addEventListener('click', function() {
    const message = document.getElementById('secretMessage');
    message.style.display = 'block';
    document.getElementById('messageText').innerText = messages[messageIndex];
    // Confetes
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d4d', '#d1a3d8', '#6a4c9c']
    });
});

document.getElementById('nextMessage').addEventListener('click', function() {
    messageIndex = (messageIndex + 1) % messages.length;
    document.getElementById('messageText').innerText = messages[messageIndex];
});

// Função para curtir as fotos
document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('liked');
        if (this.classList.contains('liked')) {
            this.innerHTML = '<i class="fas fa-heart"></i> Curtido';
        } else {
            this.innerHTML = '<i class="fas fa-heart"></i> Curtir';
        }
    });
});

// Lightbox para fotos
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.post img').forEach(img => {
    img.addEventListener('click', function() {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.src;
    });
});

closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Corações animados
function createHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts';
    document.body.appendChild(heartsContainer);
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
    }
}
window.onload = createHearts;

// Compartilhamento
document.querySelector('.fa-share').addEventListener('click', function() {
    navigator.share({
        title: 'Nosso Amor ❤️',
        text: 'Veja o site que fiz para meu amor!',
        url: window.location.href
    }).catch(err => alert('Erro ao compartilhar: ' + err));
});

// Controle de música
const music = document.getElementById('backgroundMusic');
const toggleBtn = document.getElementById('musicToggle');
toggleBtn.addEventListener('click', function() {
    if (music.paused) {
        music.play().catch(err => console.log('Erro ao tocar música: ', err));
        toggleBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar Música';
    } else {
        music.pause();
        toggleBtn.innerHTML = '<i class="fas fa-play"></i> Tocar Música';
    }
});

// Campo de mensagem
document.querySelector('.fa-comment').addEventListener('click', function() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = messageBox.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('saveMessage').addEventListener('click', function() {
    const userMessage = document.getElementById('userMessage').value;
    if (userMessage.trim()) {
        localStorage.setItem('savedMessage', userMessage);
        document.getElementById('savedMessage').innerText = `Mensagem salva: ${userMessage}`;
        document.getElementById('userMessage').value = '';
    }
});

// Carregar mensagem salva
const savedMessage = localStorage.getItem('savedMessage');
if (savedMessage) {
    document.getElementById('savedMessage').innerText = `Mensagem salva: ${savedMessage}`;
}