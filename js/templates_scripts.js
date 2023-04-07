// general
$(document).ready(function () {
  // Получаем текущее значение таймера из куки, если оно есть, или инициализируем его с нуля
  var timerValue = getCookie('timerValue') || 0;
  // Получаем текущее время, чтобы можно было вычислить, сколько времени сейчас прошло
  var currentTime = new Date().getTime();
  // Получаем элемент таймера
  var timerElem = document.getElementById('timer');

  // Обновляем значение таймера и время последнего захода на страницу в куки каждые 1 секунду
  setInterval(function () {
    // Вычисляем, сколько времени прошло с последнего обновления таймера
    var timeDiff = new Date().getTime() - currentTime;
    // Добавляем время к текущему значению таймера
    timerValue += timeDiff;
    // Обновляем время последнего захода на страницу
    currentTime = new Date().getTime();

    // Записываем новое значение таймера в куки, истечение срока действия - посещение сайта, путь - корень домена
    document.cookie = "timerValue=" + timerValue + ";expires=" + new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toUTCString() + ";path=/";

    // Обновляем значение элемента на странице
    if(timerElem){
      timerElem.innerHTML = formatTime(timerValue);
    }
  }, 1000);



  // let startTime = Date.now();
  // let timeSpent = 0;

  // // получаем значение куки "timeSpent"
  // let cookieValueTimer = document.cookie.replace(/(?:(?:^|.*;\s*)timeSpent\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  // // если куки есть, берем из них значение времени
  // if (cookieValueTimer) {
  //   timeSpent = parseInt(cookieValueTimer);
  //   startTime = Date.now() - timeSpent;
  // }

  // // Зарегистрируем событие `beforeunload`.
  // window.addEventListener('beforeunload', function (event) {
  //   let timeSpent = Date.now() - startTime;
  //   document.cookie = "timeSpent=" + timeSpent;
  // });
  
  // подсвеиваем элемент меню навигации, соотвествующий текущей странице
  highlightCurrentPage();
  //   // получаем ссылки на элементы меню 
  // var menuLinks = document.querySelectorAll('.nav-link');

  // // обрабатываем клик по каждой ссылке 
  // menuLinks.forEach(function(link) {
  //   link.addEventListener('click', function(e) {
  //     e.preventDefault(); // отменяем стандартное действие ссылки
  
  //     // отправляем AJAX-запрос на сервер
  //     $.ajax({
  //       url: link.href,
  //       method: 'GET',
  //       success: function(data) {
  //         // если запрос успешен, заменяем содержимое страницы на полученный HTML-код 
  //         var content = $('html');
  //         content.html(data);
  //         // меняем URL страницы 
  //         history.pushState(null, null, link.href);
  
  //         highlightCurrentPage();
  //       }
  //     });
  //   });
  // });
  
  // // обрабатываем событие изменения URL страницы 
  // window.addEventListener('popstate', function(e) {
  //   // отправляем AJAX-запрос на сервер с новым URL 
  //   $.ajax({
  //     url: location.href,
  //     method: 'GET',
  //     success: function(data) {
  //       // если запрос успешен, заменяем содержимое страницы на полученный HTML-код 
  //       var content = $('html');
  //       content.html(data);
  
  //       highlightCurrentPage();
  //     }
  //   });
  // });
});

function highlightCurrentPage() {
  var url = window.location;
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
  $('ul.nav a').filter(function() {
      return this.href == url;
  }).parent().addClass('active');
}

// Функция для получения значения из куки по имени
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function formatTime(time) {
  let currentTime = Date.now();
  timeSpent = currentTime - time;
  let seconds = Math.floor((timeSpent / 1000) % 60);
  let minutes = Math.floor((timeSpent / (1000 * 60)) % 60);
  let hours = Math.floor((timeSpent / (1000 * 60 * 60)) % 24);
  let timer = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  return timer;
}