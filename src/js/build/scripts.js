var ajaxBlock = (function() {

  var ajaxBlock = {
    init: function(){


  var form = document.querySelector(".form");
  var area = form.querySelector(".pic-list");
  var template = document.querySelector("#image-template").innerHTML;
  var queue = [];



    form.querySelector("#js-upload-photo").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
    });



    function preview(file) {
      if (file.type.match(/image.*/)) {
        var area = document.querySelector(".pic-list");
          var reader = new FileReader();


            reader.addEventListener("load", function(event) {
              var html = Mustache.render(template, {
                "image": event.target.result,
                "name": file.name
              });


              var li = document.createElement("li");
              li.classList.add("pic-list__item");
              li.innerHTML = html;
              area.appendChild(li);


              li.querySelector(".pic-list__close").addEventListener("click",
                function(event) {
                event.preventDefault();
                removePreview(li);
            });

              queue.push({
                "file": file,
                "li": li
              });
            });
        reader.readAsDataURL(file);
      }
    }





    function removePreview(li) {
      queue = queue.filter(function(element) {
        return element.li != li;
      });
      li.parentNode.removeChild(li);
    }





    form.addEventListener("submit", function(event) {
      event.preventDefault();
      var data = new FormData(form);
        request(data, function(response) {
        console.log(response);
      });
    });





    function request(data, fn) {
      var xhr = new XMLHttpRequest();
      var time = (new Date()).getTime();
      xhr.open("post", "http://simonenko.su/academy/echo?" + time);
        xhr.addEventListener("readystatechange", function() {
          if (xhr.readyState == 4) {
          fn(xhr.responseText);
        }
        });
      xhr.send(data);
    }
  }
};

  return ajaxBlock;
}());

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

var menuHamburger = (function() {

  var menuHamburger = {
    init: function(){
      // nav .js-menu
      // main link .js-menu-control
      // .js-headline
      var menuControl = document.querySelector(".js-menu-control"),
      menu = document.querySelector(".js-menu");

menuControl.addEventListener("click", function(ev){
    ev.preventDefault();
    //menu.classList.toggle("opened");
    document.body.classList.toggle("mobile-menu-opened");
}, false);
    }
  };

  return menuHamburger;
}());

var plusMinusCount = (function() {

  var plusMinusCount = {
    init: function(){


  var minusBtns = document.querySelectorAll('.js-counter-minus'),
      minusBtnsLength = minusBtns.length,
      plusBtns = document.querySelectorAll('.js-counter-plus'),
      plusBtnsLength = plusBtns.length,
      inputs = document.querySelectorAll('.js-counter-input'),
      travelersInput = document.getElementById('traveler-number'),
      afterChangesEvent,
      friendList = document.getElementById('friend-list'),
      friendsTemplate = document.getElementById('friend-template').innerHTML,
      friendsQueue = [];









    Mustache.parse(friendsTemplate);

    function insertFriend(name) {
      var rendered = Mustache.render(friendsTemplate, { id: (new Date()).getTime()});
      var li = document.createElement("li");
      li.classList.add('quiz');
      li.innerHTML = rendered;
      friendList.appendChild(li);


      li.querySelector('.js-quiz-delete').addEventListener("click",
      function(event) {
        event.preventDefault();
        // removeFriend(li);
        li.remove();
        console.log('111');
      });
    }








  // Polyfill creation of event [for different browsers, especially IE]
  if (document.createEvent) {
    afterChangesEvent = document.createEvent("HTMLEvents");
    afterChangesEvent.initEvent("pluralizationFinished", true, true);
  } else {
    afterChangesEvent = document.createEventObject();
    afterChangesEvent.eventType = "pluralizationFinished";
  }

  afterChangesEvent.eventName = "pluralizationFinished";



    // Polyfill triggering of event [for different browsers, especially IE]
  function fireEvent(element, event) {
    if (document.createEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent("on" + event.eventType, event);
    }
  }











  for (var i = 0; i < minusBtnsLength; i++) {
    minusBtns[i].addEventListener('click', onMinusClicked);
  };

  for (var i = 0; i < plusBtnsLength; i++) {
    plusBtns[i].addEventListener('click', onPlusClicked);
  };

  for (var i = inputs.length - 1; i >= 0; i--) {
    inputs[i].addEventListener('change', onInputChange);
  };







  function onInputChange(e) {
    var input = this,
        value = parseInt(input.value);
    input.value = pluralize(input, value);

    fireEvent(input, afterChangesEvent);
  }

  function pluralize(input, value) {
    var single = input.getAttribute('data-single'),
        plural = input.getAttribute('data-plural'),
        pluralStart = input.getAttribute('data-pluralStart');

    if (isNaN(value) || value < 0) {
      value = 0;
    }
    else if (value > 29) {
      value = 30;
    }

    // проверяем single
    if (!single) return value;

    // выяснили single указан
    // проверяем plural
    else if (value % 10 === 1 && value % 100 !== 11) return value + ' ' + single;
    else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) return value + ' ' + pluralStart;
    else return value + ' ' + plural;
  }







  function onMinusClicked(e) {
    e.preventDefault();

    var minus = this,
        counter = minus.parentNode,
        input = counter.querySelector('.js-counter-input');;

    input.value = pluralize(input,calculateMinus(input));

    fireEvent(input, afterChangesEvent);
  }

  function calculateMinus(input) {
    var value = parseInt(input.value);
    if (isNaN(value) || value <= 1) return 0;
    return value - 1;
  }







  function onPlusClicked(event) {
    event.preventDefault();

    var plus = this,
        counter1 = plus.parentNode,
        input = counter1.querySelector('.js-counter-input');;

    input.value = pluralize(input, calculatePlus(input));

    fireEvent(input, afterChangesEvent);
  }

  function calculatePlus(input) {
    var value = parseInt(input.value);
    if (value >= 30) return 30;
    return value + 1;
  }








  travelersInput.addEventListener('pluralizationFinished', function(event) {
    var count = parseInt(event.target.value);
    var len = friendsQueue.length;


    if (count > len) {

      for (var i = len; i < count; i++) {
        insertFriend(i+1)
      };
      friendsQueue = friendList.children;

    } else if (count < len) {

      for(var i = len-1; i>=count; i--) {
        var last = friendsQueue[i];
        friendList.removeChild(last);
      };

      friendsQueue = friendList.children;
      }
  });

  fireEvent(travelersInput, afterChangesEvent);
    }
  };


  return plusMinusCount;
}());

var sliderSlick = (function() {

  var sliderSlick = {
    init: function(){

 $(document).ready(function(){
        $('.js-slider').slick({
          dots: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          adaptiveHeight: true,
           responsive: [
         {
         breakpoint: 960,
           settings: {
             dots: true,
           }
         },
         {
           breakpoint: 1500,
           settings: {
             dots: false,
           }
         },

       ]
    });
  });
    }
  };

  return sliderSlick;
}());

var test = (function() {

  var test = {
    init: function(){
      console.log('hey there!');
    }
  };

  return test;
}());

var timeMoments = (function() {

  var timeMoments = {
    init: function(){

      var startDay = document.getElementById('start-date');
      var finishDay = document.getElementById('back-date');
      var interval = document.getElementById('duration-day');


      if(startDay) {
        startDay.addEventListener('change', onDateChange);
        finishDay.addEventListener('change', onDateChange);

        function onDateChange() {
          var dateB = startDay.value;
          var dateC = finishDay.value;
          var diff = 0;
          if (dateB.length && dateC.length) {
            dateB = moment(dateB);
            dateC = moment(dateC);
            diff = dateC.diff(dateB, 'days');
            if( diff <= 0) {
              diff = "";
            }
            interval.value = diff;
          }
        }
      }
    }
  };

  return timeMoments;
}());


  document.querySelector('.benefits') && test.init();

  document.querySelector('.js-menu-control') && menuHamburger.init();

  document.querySelector('.js-counter-input') && plusMinusCount.init();

  document.querySelector('#duration-day') && timeMoments.init();

  document.querySelector('.form') && ajaxBlock.init();

  document.querySelector('.js-map') && mapGoogle.init();

  document.querySelector('.js-slider') && sliderSlick.init();
