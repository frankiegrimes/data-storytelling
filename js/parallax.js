$(document).ready(function() {


  
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
    if ($(window).scrollTop() > 74) {
      $('#flex-nav-list').addClass('flex-nav-fixed');
      $('.flex-content').addClass('flex-content-fixed');
    }
    if ($(window).scrollTop() < 75) {
      $('#flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
    }
  });
});