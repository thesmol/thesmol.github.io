//map
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
