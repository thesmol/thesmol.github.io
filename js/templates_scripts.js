// general
// Сохраняем текущее время в куки с временем жизни 0 (куки исчезнут после закрытия сайта)
var startTime = new Date().getTime();
document.cookie = "lastVisitTime=" + startTime + ";path=/;expires=Session";

$(document).ready(function () {
  // подсвеиваем элемент меню навигации, соотвествующий текущей странице
  highlightCurrentPage();
  // Получаем элемент карты
  var mapElem = document.getElementById('map');
  //если на странице есть карта, то показываем
  if(mapElem){
    ymaps.ready(mapInit);
  }

  // Получаем элемент таймера
  var timerElem = document.getElementById('timer');
  // Получаем время последнего посещения страницы из куки
  var lastVisitTime = parseInt(getCookie('lastVisitTime')); 
  // Обновляем значение таймера и время последнего захода на страницу в куки каждые 1 секунду
  if (timerElem != null){
  setInterval(function() {
      // Получаем текущее время
    let currentTime = new Date().getTime();
    // Вычисляем, сколько времени прошло с последнего обновления таймера
    let timeDiff = currentTime - lastVisitTime;
    // Обновляем значение элемента на странице
    timerElem.innerHTML = formatTime(timeDiff);
  }, 1000);}

  // Реализуем SPA
  $('body').on('click', '.ajax-link', function(event) {
    event.preventDefault(); // отменяем стандартное действие при клике на ссылку

    var url = $(this).attr('href'); // получаем URL страницы, на которую нужно перейти
    var cacheKey = 'page_' + url; // Создаем ключ для кэша
    //var title = $(this).data('title'); // получаем значение атрибута "data-title"
    var title = $('ul.nav a[href="'+ url +'"]').data('title');
    console.log("url: ", url);
    console.log("selected element: ", $('ul.nav a[href="'+ url +'"]'));
    console.log("title: ", title);
    // изменяем заголовок страницы 
    document.title = title;

     // Проверяем наличие сохраненных данных в кэше
     if (sessionStorage.getItem(cacheKey)) {
      // удаляем подсветку предыдущего элемента навигационного меню
      removeActiveClass();
      var mainContent = $(sessionStorage.getItem(cacheKey)).filter('#mainContent').eq(0).html();
      // Если данные есть в кэше используем их
      $('#mainContent').html(mainContent);

      timerElem = document.getElementById('timer');
      mapElem = document.getElementById('map');

      if(mapElem){
        ymaps.ready(mapInit);
      }

      if (timerElem != null) {
        setInterval(function() { 
          if (timerElem != null) {
            let currentTime = new Date().getTime(); 
            let timeDiff = currentTime - lastVisitTime; 
            timerElem.innerHTML = formatTime(timeDiff);
          }
        }, 1000);
      }
      // добавляем запись в историю браузера
      history.pushState(null, null, url);
      // добавляем подсветку элемента навигационного меню
      highlightCurrentPage();
      } else {
        // Если данных нет в кэше, отправляем AJAX-запрос на сервер
        $.ajax({
          url: url,
          type: 'GET',
          success: function(data) {
            // Сохраняем полученные данные в кэше
            sessionStorage.setItem(cacheKey, data);
            // удаляем подсветку предыдущего элемента навигационного меню
            removeActiveClass();

            // Находим элемент "main" в полученном HTML-коде
            var mainContent = $(data).filter('#mainContent').eq(0).html();
            // Заменяем содержимое элемента "main" на странице
            $('#mainContent').html(mainContent);
            timerElem = document.getElementById('timer');
            mapElem = document.getElementById('map');

            if(mapElem){
              ymaps.ready(mapInit);
            }

            if (timerElem != null) {
              setInterval(function() { 
                if (timerElem != null) {
                  let currentTime = new Date().getTime(); 
                  let timeDiff = currentTime - lastVisitTime; 
                  timerElem.innerHTML = formatTime(timeDiff);
                }
              }, 1000);
            }
            // добавляем запись в историю браузера
            history.pushState(null, null, url);
            // добавляем подсветку элемента навигационного меню
            highlightCurrentPage();
          },
          error: function(xhr, status, error) {
            console.log("AJAX Error:", status, error);}
        });
      }
    });
    
  $(window).on('popstate', function(event) {
    var url = location.pathname;
    var title = $('ul.nav a[href="'+ url +'"]').data('title');
    var cacheKey = 'page_' + url; // Создаем ключ для кэша
    console.log("url: ", url);
    console.log("selected element: ", $('ul.nav a[href="'+ url +'"]'));
    console.log("title: ", title);
    console.log('document.title ', document.title);
    // изменяем заголовок страницы 
    // document.title = title;
     // Проверяем наличие сохраненных данных в кэше
     if (sessionStorage.getItem(cacheKey)) {
      // удаляем подсветку предыдущего элемента навигационного меню
      removeActiveClass();
      // Если данные есть в кэше используем их
      var mainContent = $(sessionStorage.getItem(cacheKey)).filter('#mainContent').eq(0).html();
      $('#mainContent').html(mainContent);
      console.log('Заголовок подгруженного контетнта ', document.title)
      timerElem = document.getElementById('timer');
      mapElem = document.getElementById('map');

      if(mapElem){
        ymaps.ready(mapInit);
      }

      if (timerElem != null) {
        setInterval(function() { 
          if (timerElem != null) {
            let currentTime = new Date().getTime(); 
            let timeDiff = currentTime - lastVisitTime; 
            timerElem.innerHTML = formatTime(timeDiff);
          }
        }, 1000);
      }
      
      // добавляем подсветку элемента навигационного меню
      highlightCurrentPage();              
      } else {
        // Если данных нет в кэше, отправляем AJAX-запрос на сервер
        $.ajax({
          url: location.href,
          type: 'GET',
          success: function(data) {
            // Сохраняем полученные данные в кэше
            sessionStorage.setItem(cacheKey, data);
            // удаляем подсветку предыдущего элемента навигационного меню
            removeActiveClass();

            // Находим элемент "main" в полученном HTML-коде
            var mainContent = $(data).filter('#mainContent').eq(0).html();
            // Заменяем содержимое элемента "main" на странице
            $('#mainContent').html(mainContent);
            console.log('Заголовок подгруженного контетнта ', document.title)
            timerElem = document.getElementById('timer');
            mapElem = document.getElementById('map');

            if(mapElem){
              ymaps.ready(mapInit);
            }

            if (timerElem != null) {
              setInterval(function() { 
                if (timerElem != null) {
                  let currentTime = new Date().getTime(); 
                  let timeDiff = currentTime - lastVisitTime; 
                  timerElem.innerHTML = formatTime(timeDiff);
                }
              }, 1000);
            }
            // добавляем подсветку элемента навигационного меню
            highlightCurrentPage();
          },
          error: function(xhr, status, error) {
            console.log("AJAX Error:", status, error);}
        });
      }
  });
});


// функция для подсветки выбранной страницы в меню навигации
function highlightCurrentPage() { 
  var url = window.location.href;
  if (url.endsWith('#') || url.endsWith('?')) {
      url = url.slice(0, -1);
  }
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active'); 
  $('ul.nav a').filter(function() { 
      return this.href == url; 
  }).parent().addClass('active'); 
}

// функция для удаления подсветки выбранной страницы
function removeActiveClass() {
  $('ul.nav a').parent().removeClass('active');
}

// Функция для получения значения из куки по имени
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// функция для преобразовния времени в милисекундай в формат чч:мм:сс
function formatTime(time) {
  let hours = Math.floor(time / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  let timer = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  return timer;
}

// функция для показа элемента с кружочком закрузки
function showLoader() {
  document.getElementById("loader").style.display="block";
 }
 
// функция для скрытия элемента с кружочком закрузки
function hideLoader() {
document.getElementById("loader").classList.toggle("shut-the-loader");
}

// функция для инициализации Яндекс карты
function mapInit() { 
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