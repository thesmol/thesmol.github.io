$(document).ready(function(){
    // // получаем время из локального хранилища, если оно там есть
    // let startTime = localStorage.getItem('startTime');
    // if (!startTime) {
    // // если время еще не сохранено, сохраняем текущее время
    // startTime = Date.now();
    // localStorage.setItem('startTime', startTime);
    // }

    // получаем время из куки, если оно там есть
    let startTime = getCookie('startTime');
    if (!startTime) {
        // если время еще не сохранено, сохраняем текущее время
        startTime = Date.now();
        setCookie('startTime', startTime);
    }

    // запускаем таймер
    setInterval(updateTimer, 1000);

    function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').innerText = timeString;
    }
    
});
// функция для установки куки
function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// функция для получения куки
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}


