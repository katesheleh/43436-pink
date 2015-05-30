//counter

// var pluralizeWord = function(i, str1, str2, str3) {
//       var plural = function(a) {
//         if (a % 10 === 1 && a % 100 !== 11) {
//           return 0;
//         } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
//           return 1;
//         } else {
//           return 2;
//         }
//       };
//       switch (plural(i)) {
//         case 0:
//           return str1;
//         case 1:
//           return str2;
//         default:
//           return str3;
//       }
//     };

// var count = 1,
//   countEl = document.getElementById("duration-day");

// function plus() {
//    count++;
//    countEl.value = count + ' ' + pluralizeWord(count, 'день', 'дня', 'дней');
// }

// function minus() {
//   if (count > 1) {
//     count--;
//     countEl.value = count + ' ' + pluralizeWord(count, 'день', 'дня', 'дней');
//   }
// }

//   var counter = 1;
//     var countElem = document.getElementById("traveler-number");
//     function plusPerson(){
//         counter++;
//         countElem.value = counter + " чел";
//     }
//     function minusPerson(){
//       if (counter > 1) {
//         counter--;
//         countElem.value = counter + " чел";
//       }
//     }


/*============================
=            MENU            =
============================*/


// nav .js-menu
// main link .js-menu-control
// .js-headline
(function() {
var menuControl = document.querySelector(".js-menu-control"),
    menu = document.querySelector(".js-menu");

menuControl.addEventListener("click", function(ev){
    ev.preventDefault();
    //menu.classList.toggle("opened");
    document.body.classList.toggle("mobile-menu-opened");
}, false);
})();
/*-----  End of MENU  ------*/













/*===============================
=            COUNTER            =
===============================*/

// .js-counter
// .js-counter-minus
// .js-counter-plus
// .js-counter-input атрибуты data-single и data plural
(function() {
  var minusBtns = document.querySelectorAll('.js-counter-minus'),
      minusBtnsLength = minusBtns.length,
      plusBtns = document.querySelectorAll('.js-counter-plus'),
      plusBtnsLength = plusBtns.length,
      inputs = document.querySelectorAll('.js-counter-input');






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

  }





  function pluralize(input, value) {
    var single = input.getAttribute('data-single'),
        plural = input.getAttribute('data-plural'),
        pluralStart = input.getAttribute('data-pluralStart');

    if (isNaN(value) || value < 0) {
      value = 0;
    }
    else if (isNaN(value) || value > 29) {
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
  }





  function calculateMinus(input) {
    var value = parseInt(input.value);
    if (isNaN(value) || value <= 1) return 0;
    return value - 1;
  }






    function onPlusClicked(a) {
    a.preventDefault();

    var plus = this,
        counter1 = plus.parentNode,
        input = counter1.querySelector('.js-counter-input');;

    input.value = pluralize(input,calculatePlus(input));
  }





  function calculatePlus(input) {
    var value = parseInt(input.value);
    if (value >= 30) return 30;
    return value + 1;
  }
})();

/*-----  End of COUNTER  ------*/












/*============================
=            AJAX            =
============================*/


//FormData
(function() {
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
})();


/*-----  End of AJAX  ------*/
