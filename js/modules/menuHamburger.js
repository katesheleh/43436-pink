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
