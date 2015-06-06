var plusMinusCount = (function() {

  var plusMinusCount = {
    init: function(){


// .js-counter
// .js-counter-minus
// .js-counter-plus
// .js-counter-input атрибуты data-single и data plural
  var minusBtns = document.querySelectorAll('.js-counter-minus'),
      minusBtnsLength = minusBtns.length,
      plusBtns = document.querySelectorAll('.js-counter-plus'),
      plusBtnsLength = plusBtns.length,
      inputs = document.querySelectorAll('.js-counter-input'),
      travelersInput = document.getElementById('traveler-number'),
      afterChangesEvent,
      inputsContainer = document.getElementById('additional-inputs');
      fieldClone = document.getElementById("js-block-quiz");



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

  // function cloneAndAppend(originalNode, container) {
  //   if (originalNode) {
  //     clonedField = originalNode.cloneNode(true);
  //     container.appendChild(clonedField);
  //   }
  // }


  travelersInput.addEventListener('pluralizationFinished', function(event) {
    var count = parseInt(event.target.value);
    var originalInput = document.querySelector(".js-block-quiz");

    // Clear previosly created inputs
    while (inputsContainer.firstChild) {
      inputsContainer.removeChild(inputsContainer.firstChild);
    }

    for (var i = 0; i < count; i += 1) {
      console.log('начинаем');
      // cloneAndAppend(originalInput, inputsContainer);
      function friendSection(row) {
        var template = document.getElementById('friend-template').innerHTML;
        var box = document.getElementById('additional-inputs');
        var output = Mustache.render(template, {'value': event.target.result});
        box.innerHTML = output;
        console.log('Все! Приехали.')
      }
    }
  });

  fireEvent(travelersInput, afterChangesEvent);


    }
  };

  return plusMinusCount;
}());
