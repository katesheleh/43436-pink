var mapGoogle = (function() {

  var mapGoogle = {
    init: function(){

  var map;
  var mapCoordinates = new google.maps.LatLng(59.938788, 30.323072);
  var markerPosition = mapCoordinates;

  function initialize() {
    var mapOptions = {
      zoom: 14,
      minZoom: 5,
      maxZoom: 24,
      scrollwheel: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_BOTTOM
    },
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

    }
  };

  return mapGoogle;
}());
