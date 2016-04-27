

$(document).ready(function() {

  $('.flex-footer').addClass('hidden');
  
  
  $(window).scroll(function () {

    var targetOffset3 = $("#slide-1").offset().top;
      //stick nav-bar
    if ($(window).scrollTop() > targetOffset3) {
      $('.flex-nav-list').addClass('flex-nav-fixed');
      $('.flex-content').addClass('flex-content-fixed');
      $('.flex-footer').removeClass('hidden');
      
    }
    if ($(window).scrollTop() < (targetOffset3)) {
      $('.flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
      
      $('.flex-footer').addClass('hidden');
    }

    // remove for smaller devices
    if (window.matchMedia('(max-width: 768px)').matches) {
      $('.flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
    }
    if (window.matchMedia('(max-width: 992px)').matches) {
      $('.flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
    }

    // Change slide background colour

    var targetOffset = $("#slide-3").offset().top;

    var $w = $(window).scroll(function(){
    if ( $w.scrollTop() > targetOffset ) {   
        $('.flex-content').css({"background":"#5FC3E4"});
         $('#slide-3').css({"background":"#5FC3E4"});
    } else {
      $('.flex-content').css({"background":"white"});
    
    }
});

        var targetOffset2 = $("#slide-4").offset().top;

    var $w2 = $(window).scroll(function(){
    if ( $w2.scrollTop() > targetOffset2 ) {   
        $('.flex-content').css({"background":"#E3170A"});
         $('#slide-4').css({"background":"#E3170A"});
    } else {
    }
});
    
    
  });

$(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#flex-nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#flex-nav a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}