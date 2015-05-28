/* menu */
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


//counter

var pluralizeWord = function(i, str1, str2, str3) {
      var plural = function(a) {
        if (a % 10 === 1 && a % 100 !== 11) {
          return 0;
        } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
          return 1;
        } else {
          return 2;
        }
      };
      switch (plural(i)) {
        case 0:
          return str1;
        case 1:
          return str2;
        default:
          return str3;
      }
    };

var count = 1,
  countEl = document.getElementById("duration-day");

function plus() {
   count++;
   countEl.value = count + ' ' + pluralizeWord(count, 'день', 'дня', 'дней');
}

function minus() {
  if (count > 1) {
    count--;
    countEl.value = count + ' ' + pluralizeWord(count, 'день', 'дня', 'дней');
  }
}

  var counter = 1;
    var countElem = document.getElementById("traveler-number");
    function plusPerson(){
        counter++;
        countElem.value = counter + " чел";
    }
    function minusPerson(){
      if (counter > 1) {
        counter--;
        countElem.value = counter + " чел";
      }
    }

//FormData

(function() {
 var form = document.querySelector(".form");
form.querySelector("#js-upload-photo").addEventListener("change", function() {
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
  preview(files[i]);
 }
});
function preview(file) {
  var area = document.querySelector(".pic-list");
  if (file.type.match(/image.*/)) {
    var reader = new FileReader();
      reader.addEventListener("load", function(event) {
        var img = document.createElement("img");
        img.src = event.target.result; // Картинка в base64-кодировке
        img.alt = file.name; // Имя файла

        area.appendChild(img);
      });
    reader.readAsDataURL(file);
 }
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
  xhr.open("post", "http://simonenko.su/academy/echo" + time);
     xhr.addEventListener("readystatechange", function() {
     if (xhr.readyState == 4) {
     fn(xhr.responseText);
     }
     });
   xhr.send(data);
 }
})();
