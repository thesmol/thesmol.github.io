// general
$(document).ready(function() {
  let startTime = Date.now();
  let timeSpent = 0;

  // получаем значение куки "timeSpent"
  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)timeSpent\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  // если куки есть, берем из них значение времени
  if (cookieValue) {
      timeSpent = parseInt(cookieValue);
      startTime = Date.now() - timeSpent;
  }

  // Зарегистрируем событие `beforeunload`.
  window.addEventListener('beforeunload', function(event) {
    // Сохраняем текущую временную метку в cookie
    document.cookie = 'pageUnloadTime=' + Date.now();
  });

  // Зарегистрируем событие `load`.
  window.addEventListener('load', function(event) {
    // Считываем куки, установленные событием beforeunload
    var cookies = document.cookie.split(';');
    var pageUnloadTime;
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf('pageUnloadTime=') === 0) {
        pageUnloadTime = parseInt(cookie.substring(15));
      }
    }
    // Если cookie установлен, страница была завершена, в противном случае она была обновлена
    if (pageUnloadTime) {
      document.cookie = "timeSpent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log('Покинуть страницу');
    } else {
      let timeSpent = Date.now() - startTime;
      document.cookie = "timeSpent=" + timeSpent + "; SameSite=strict";
      console.log('Обновление страницы');
    }

    // Очистить cookie
    document.cookie = 'pageUnloadTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
