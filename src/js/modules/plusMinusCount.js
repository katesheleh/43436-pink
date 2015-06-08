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
