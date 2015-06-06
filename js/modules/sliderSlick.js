var sliderSlick = (function() {

  var sliderSlick = {
    init: function(){

  $(document).ready(function(){
        $('.js-slider').slick({
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
          responsive: [
        {
        breakpoint: 960,
          settings: {
            dots: true,
            infinite: false
          }
        },
        {
          breakpoint: 3200,
          settings: {
            dots: false,
            infinite: false
          }
        },
        {
          breakpoint: 320,
          settings: {
            dots: true,
            infinite: false
          }
        }
      ]
    });
  });
    }
  };

  return sliderSlick;
}());
