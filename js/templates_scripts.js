// general
$(document).ready(function() { 
  // устанавливаем начальное время для таймера
  let startTime = localStorage.getItem('startTime');
    if (!startTime) {
    // если время еще не сохранено, сохраняем текущее время
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
    };

  // подсвеиваем элемент меню навигации, соотвествующий текущей странице
  highlightCurrentPage();
    // получаем ссылки на элементы меню 
  var menuLinks = document.querySelectorAll('.nav-link');

  // обрабатываем клик по каждой ссылке 
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // отменяем стандартное действие ссылки
  
      // отправляем AJAX-запрос на сервер
      $.ajax({
        url: link.href,
        method: 'GET',
        success: function(data) {
          // если запрос успешен, заменяем содержимое страницы на полученный HTML-код 
          var content = $('html');
          content.html(data);
          // меняем URL страницы 
          history.pushState(null, null, link.href);
  
          highlightCurrentPage();
        }
      });
    });
  });
  
  // обрабатываем событие изменения URL страницы 
  window.addEventListener('popstate', function(e) {
    // отправляем AJAX-запрос на сервер с новым URL 
    $.ajax({
      url: location.href,
      method: 'GET',
      success: function(data) {
        // если запрос успешен, заменяем содержимое страницы на полученный HTML-код 
        var content = $('html');
        content.html(data);
  
        highlightCurrentPage();
      }
    });
  });
});

function highlightCurrentPage() {
  var url = window.location;
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
  $('ul.nav a').filter(function() {
      return this.href == url;
  }).parent().addClass('active');
}
