
/*============================
=            AJAX            =
============================*/


//FormData
(function() {
  if(document.querySelector('.pic-list')) {

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
})();


/*-----  End of AJAX  ------*/
