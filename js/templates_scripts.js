// general
$(document).ready(function() { 
  document.cookie = "visited=true; SameSite=strict";
  let startTime = Date.now();
  let timeSpent = 0;

  // получаем значение куки "timeSpent"
  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)timeSpent\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  // если куки есть, берем из них значение времени
  if (cookieValue) {
      timeSpent = parseInt(cookieValue);
      startTime = Date.now() - timeSpent;
  }

  // сохраняем текущее время в куки при закрытии страницы
  window.addEventListener("beforeunload", function(event) {
      
    if (document.cookie.indexOf("visited") >= 0) {
      document.cookie = "timeSpent=";
      document.cookie = "visited=false";
      console.log("User is leaving the website");
    } else {
      let timeSpent = Date.now() - startTime;
      document.cookie = "timeSpent=" + timeSpent + "; SameSite=strict";
    }
  });

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
