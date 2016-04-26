

$(document).ready(function() {

  $('.flex-footer').addClass('hidden');
  
  
  $(window).scroll(function () {

    var viewportHeight = $(window).height();
      //stick nav-bar
    if ($(window).scrollTop() > viewportHeight) {
      $('.flex-nav-list').addClass('flex-nav-fixed');
      $('.flex-content').addClass('flex-content-fixed');
      $('.flex-footer').removeClass('hidden');
      
    }
    if ($(window).scrollTop() < (viewportHeight + (viewportHeight/10))) {
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