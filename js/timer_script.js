$(document).ready(function(){
    // получаем время из локального хранилища, если оно там есть
    let startTime = localStorage.getItem('startTime');
    if (!startTime) {
    // если время еще не сохранено, сохраняем текущее время
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
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
    
    window.addEventListener('beforeunload', function (e) {
        // Установить cookie, чтобы указать, что пользователь покидает страницу
        document.cookie = 'leaving=true; expires=' + new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString(); // Устанавливаем cookie на истечение 24 часов
      
        // Удалить файл cookie, указывающий на то, что пользователь перезагружает страницу, если он существует
        document.cookie = 'reloading=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      });
      
    window.addEventListener('load', function (e) {
    // Проверка, установлен ли файл cookie, чтобы отличить перезагрузку страницы от ухода пользователя со страницы
    if (document.cookie.indexOf('leaving=') !== -1) {
        // пользователь покидает страницу:
        localStorage.removeItem('startTime');
        // удаялем cookie, чтобы он не мешал загрузке страницы в будущем
        document.cookie = 'leaving=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } else if (document.cookie.indexOf('reloading=') !== -1) {
        // удаялем cookie, чтобы он не мешал загрузке страницы в будущем
        document.cookie = 'reloading=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } else {
        // установка cookie, чтобы указать, что пользователь перезагружает страницу
        document.cookie = 'reloading=true; expires=' + new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString(); // Устанавливаем срок действия cookie через 24 часа
    }
    });
});





