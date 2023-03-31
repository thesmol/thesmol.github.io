// general


// $(document).ready(function() {
//   $('ul.nav a').click(function(e) {
//     console.log('no suc');
//     e.preventDefault(); // отменяем стандартное действие ссылки
//     var url = $(this).attr('href'); // получаем URL страницы
//     // отправляем AJAX-запрос на сервер
//     $.ajax({
//       url: url,
//       dataType: 'html',
//       success: function(data) {
//         // обновляем содержимое страницы
//         $('body').html(data);
//         console.log('suc');
//       }
//     });
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
        highlightCurrentPage();
        var content = document.querySelector('body');
        content.innerHTML = xhr.responseText;

        // меняем URL страницы
        history.pushState(null, null, link.href);
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
      highlightCurrentPage();
      var content = document.querySelector('body');
      content.innerHTML = xhr.responseText;
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
  }
  
// $(document).ready(function () {
// highlightCurrentPage();
// });

//map
// document.cookie = "cookieName=cookieValue; SameSite=Secure; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
ymaps.ready(init);

function init() { 
var map; 
var placemark; 
 map = new ymaps.Map("map", { 
  center: [56.749905, 37.141429], 
  zoom: 14, 
 }); 
 placemark = new ymaps.Placemark([56.749905, 37.141429], {}, { 
  preset: "islands#redDotIcon", 
  draggable: true 
 }); 
 
 map.geoObjects.add(placemark); 
 
 map.events.add("boundschange", function() { 
  showLoader(); 
 }); 
  ymaps.ready(function() {
  hideLoader();
  });
}

function showLoader() {
 document.getElementById("loader").style.display="block";
}

function hideLoader() {
 document.getElementById("loader").classList.toggle("shut-the-loader");
}

