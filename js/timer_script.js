// отображаем время таймера на странице
$(document).ready(function(){
    // получаем значение куки "timeSpent"
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)timeSpent\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // если куки есть, берем из них значение времени
    if (cookieValue) {
        timeSpent = parseInt(cookieValue);
        startTime = Date.now() - timeSpent;
    }

      // обновляем значение таймера каждую секунду
    setInterval(function() {
    let currentTime = Date.now();
    timeSpent = currentTime - startTime;
    let seconds = Math.floor((timeSpent / 1000) % 60);
    let minutes = Math.floor((timeSpent / (1000 * 60)) % 60);
    let hours = Math.floor((timeSpent / (1000 * 60 * 60)) % 24);
    let timer = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    document.getElementById("timer").innerHTML = timer;
}, 1000);
});




