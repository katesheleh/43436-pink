
/*==================================
=            MAP ONLINE            =
==================================*/
(function() {
  var map;
  var mapCoordinates = new google.maps.LatLng(59.938788, 30.323072);
  var markerPosition = mapCoordinates;

  function initialize() {
    var mapOptions = {
      zoom: 14,
      disableDefaultUI: true,
      center: mapCoordinates
    };

    map = new google.maps.Map(document.getElementById('online-map'),mapOptions);
    addMarker();
  }

  var markers = [];
  var image = new google.maps.MarkerImage(
      'img/pin.png',
      new google.maps.Size(37,37)
    );

  function addMarker() {
      markers.push(new google.maps.Marker({
      image: 'img/pin.png',
      position: markerPosition,
      raiseOnDrag: false,
      icon: image,
      map: map,
      draggable: false
    }));
  }
  google.maps.event.addDomListener(window, 'load', initialize);
})();
/*-----  End of MAP ONLINE  ------*/
