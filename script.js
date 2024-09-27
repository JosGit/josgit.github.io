// ir a esta url:  https://josgit.github.io/

document.addEventListener('DOMContentLoaded', function() {
    const letrasDiv = document.getElementById('letras');
    const audio = document.getElementById('musica');
    let letrasArray = [];

    fetch('letra.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            letrasArray = rows.map(row => {
                const [time, text] = row.split(';');
                const [minutos, segundos, centesimas] = time.split(':').map(Number);
                const timeInMilliseconds = (minutos * 60 * 1000) + (segundos * 1000) + (centesimas * 10);
                return { time: timeInMilliseconds / 1000, text }; // Convertimos a segundos
            });
        });

    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        letrasDiv.innerHTML = '';
        letrasArray.forEach((letra, index) => {
            const p = document.createElement('p');
            p.textContent = letra.text;
            if (currentTime >= letra.time && (index === letrasArray.length - 1 || currentTime < letrasArray[index + 1].time)) {
                p.style.fontWeight = 'bold';
                p.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                p.style.fontWeight = 'normal';
            }
            letrasDiv.appendChild(p);
        });
    });
});
