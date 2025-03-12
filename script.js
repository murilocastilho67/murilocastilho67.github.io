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
    message.style.display = message.style.display === 'none' ? 'block' : 'none';
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