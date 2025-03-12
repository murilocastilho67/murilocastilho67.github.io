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

// Botão de surpresa
document.getElementById('secretButton').addEventListener('click', function() {
    const message = document.getElementById('secretMessage');
    message.style.display = 'block';
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

// Função para criar corações
function createHearts() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHearts, 300);

// Função para criar estrelas
function createStars() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = Math.random() * 2 + 1 + 's';
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 3000);
}

setInterval(createStars, 100);