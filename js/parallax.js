$(document).ready(function() {

  $('.flex-footer').addClass('hidden');
  
  
  $(window).scroll(function () {
      //stick nav-bar
    if ($(window).scrollTop() > 95) {
      $('#flex-nav-list').addClass('flex-nav-fixed');
      $('.flex-content').addClass('flex-content-fixed');
      $('.flex-footer').removeClass('hidden');
      
    }
    if ($(window).scrollTop() < 96) {
      $('#flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
      
      $('.flex-footer').addClass('hidden');
    }

    // remove for smaller devices
    if (window.matchMedia('(max-width: 768px)').matches) {
      $('#flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
    }
    if (window.matchMedia('(max-width: 992px)').matches) {
      $('#flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
    }
    
    
  });

});


