/* menu */
// nav .js-menu
// main link .js-menu-control
// .js-headline
var menuControl = document.querySelector(".js-menu-control"),
    menu = document.querySelector(".js-menu");

menuControl.addEventListener("click", function(ev){
    ev.preventDefault();
    menu.classList.toggle("opened");
}, false);
