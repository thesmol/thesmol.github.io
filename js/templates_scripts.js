// general
$(document).ready(function () {
  // Сохраняем текущее время в куки с временем жизни 0 (куки исчезнут после закрытия сайта)
  var startTime = new Date().getTime();
  document.cookie = "lastVisitTime=" + startTime + ";path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  // Получаем элемент таймера
  const timerElem = document.getElementById('timer');
  // Получаем время последнего посещения страницы из куки
  var lastVisitTime = getCookie('lastVisitTime');
  // Обновляем значение таймера и время последнего захода на страницу в куки каждые 1 секунду
  if (timerElem){
  setInterval(function() {
      // Получаем текущее время
    let currentTime = new Date().getTime();
    // Вычисляем, сколько времени прошло с последнего обновления таймера
    let timeDiff = currentTime - lastVisitTime;
    // Обновляем значение элемента на странице
    timerElem.innerHTML = formatTime(timeDiff);
  }, 1000);}

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
  let hours = Math.floor(time / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  
  return `${hours}:${minutes}:${seconds}`;
}