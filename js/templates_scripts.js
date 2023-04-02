// general

// $(document).ready(function() {
//   highlightCurrentPage()
//   // Обработчик клика на ссылке
//   $('.nav-link').on('click', function(event) {
//     event.preventDefault();

//     // Получаем URL и заголовок страницы, на которую переходим
//     var url = $(this).attr('href');
//     var title = $(this).text();

//     // Меняем URL и заголовок страницы без перезагрузки
//     history.pushState(null, title, url);
//     document.title = title;

//     // Загружаем содержимое страницы с помощью AJAX-запроса
//     $.ajax({
//       url: url,
//       success: function(data) {
//         // Обновляем содержимое страницы
//         $('html').html(data);
//       }
//     });
//     highlightCurrentPage()
//   });
// });

$(document).ready(function() { 
  highlightCurrentPage();
    // получаем ссылки на элементы меню 
  var menuLinks = document.querySelectorAll('.nav-link'); 
   
  // обрабатываем клик по каждой ссылке 
  menuLinks.forEach(function(link) { 
    link.addEventListener('click', function(e) { 
      e.preventDefault(); // отменяем стандартное действие ссылки 
   
      // отправляем AJAX-запрос на сервер 
      var xhr = new XMLHttpRequest(); 
      xhr.open('GET', link.href); 
      xhr.onload = function() { 
        if (xhr.status === 200) { 
          // если запрос успешен, заменяем содержимое страницы на полученный HTML-код 
          var content = document.querySelector('html'); 
          content.innerHTML = xhr.responseText; 
          // меняем URL страницы 
          history.pushState(null, null, link.href); 
          // перезагружаем скрипты
          loadScripts();  
          highlightCurrentPage(); 
        } 
      }; 
      xhr.send(); 
    }); 
  }); 
   
  // обрабатываем событие изменения URL страницы 
  window.addEventListener('popstate', function(e) { 
    // отправляем AJAX-запрос на сервер с новым URL 
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', location.href); 
    xhr.onload = function() { 
      if (xhr.status === 200) { 
        // если запрос успешен, заменяем содержимое страницы на полученный HTML-код 
        var content = document.querySelector('html'); 
        content.innerHTML = xhr.responseText; 
        highlightCurrentPage(); 
      } 
    }; 
    xhr.send(); 
  }); 
  });

function highlightCurrentPage() {
  var url = window.location;
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
  $('ul.nav a').filter(function() {
      return this.href == url;
  }).parent().addClass('active');
  console.log("подсветили")
}

function loadScripts() {  
  // получаем все скрипты на странице  
  var scripts = document.querySelectorAll('.page-script');   
  // создаем новый скрипт для каждого существующего на странице  
  for (var i = 0; i < scripts.length; i++) {  
    var script = document.createElement('script');  
    script.type = scripts[i].type;  
    script.src = scripts[i].src; 
    console.log("добавили"); 
    // добавляем новый скрипт на страницу и удаляем старый  
    scripts[i].parentNode.insertBefore(script, scripts[i]);  
    scripts[i].parentNode.removeChild(scripts[i]);  
  }  
}
  
// $(document).ready(function () {
// highlightCurrentPage();
// });
