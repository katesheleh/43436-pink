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
