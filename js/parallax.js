// --------------- Animated Survey Quotes ---------------

// Cisgender Survey Quotes Array

var terms = [
"a label for those whose experiences of their own gender agree with the sex they were assigned at birth", 
"a fridge magnet Consequat magnam tempor a! Ornare malesuada aliquet perferendis incididunt? Aliquet mi autem? Litora senectus at dolorum at eos error ex.", 
"Tellus saepe ducimus torquent omnis magna? Cillum lobortis netus eaque debitis sollicitudin? Convallis harum tincidunt. Elementum posuere? Quam! Blandit duis."];

// Rotate Quotes Function

var rotater = $('#rotate');

function rotateTerm() {
  var ct = rotater.data("term") || 0;
  rotater.data("term", ct === terms.length -1 ? 0 : ct + 1).text(terms[ct]).fadeIn()
              .delay(2000).fadeOut(200, rotateTerm);
}

// --------------- Interactive Video Players ---------------

// Variables

var videoPlayer = $("myVideo"); 
var video_count = 1;
   

// On Click Video Function

function NextVideo() {

    video_count++;
    if (video_count === 4) {
      video_count = 1;
    }
    var nextVid = "assets/video/video"+video_count+".mp4";
    videoPlayer.src = nextVid;
    videoPlayer.play();

}



// --------------- Document Ready Function ---------------

$(document).ready(function() {

    // DOM IS READY

    // Trigger Rotating Quotes
  
    $(rotateTerm);

    // ------------------- Set DOM Variables to only query the DOM once

    var dataBtn = $('.data-link');
    var dataCloseBtn = $('.close-btn');
    var overlay = $('.overlay');
    var headerNav = $('flex-header-banner');
    var headerList = $('.header-nav li');
    var headerNavBtn = $('.nav-mobile');
    var headNavCloseBtn = $('.nav-mobile-close');
    var sideNav = $('.flex-nav-list');
    var sideNavBtn = $('.smartphone-menu-trigger');
    var sideNavCloseBtn = $('.smartphone-menu-trigger-close');

    var videoBtn = $('.MyButton');

    var contentTop = (($(".reveal-wrapper").offset().top) - 50);

    // ----------------------------- Button Functions 

    // -------------- Data Modal Page Click Functions

     dataBtn.click(function(){

        overlay.addClass('is-open');
        headerNav.css("visibility", "hidden");
        return false;
     });

     dataCloseBtn.click(function(){

         overlay.removeClass('is-open');
         headerNav.css("visibility", "visible");
         return false;
     });

     // -------------- Sidebar Navigation Click Functions

     sideNavBtn.click(function(){

        sideNavBtn.hide();
        sideNavCloseBtn.show();
        sideNav.addClass('flex-nav-is-open');
        return false;
     });

     sideNavCloseBtn.click(function(){

        sideNavCloseBtn.hide();
        sideNavBtn.show();
        sideNav.removeClass('flex-nav-is-open');
        return false;
     });

     // -------------- Header Navigation Click Functions

     headerNavBtn.click(function(){
 
        headerList.css("visibility", "visible");
        headNavCloseBtn.css("visibility", "visible");
        headerNavBtn.css("visibility", "hidden");
        return false;
      });

     headNavCloseBtn.click(function(){

        headerList.css("visibility", "hidden");
        headerNavBtn.css("visibility", "visible");
        headNavCloseBtn.css("visibility", "hidden");
        return false;
      });


      // ------------------ Video Player Click Function

     videoBtn.click(function(){

         NextVideo();
         return false;

      });

       // ------------------- Device Specific Functions

      if (window.matchMedia('(max-width: 768px)').matches) {
      
        // Remove header opacity for smaller devices
         headerNav.removeClass('flex-header-banner-fixed');

      }

      if (window.matchMedia('(max-width: 992px)').matches) {
    
      }

  // --------------- Window Scroll Function ---------------  

  $(window).scroll(function () {

  // Checks and runs everytime the window is scrolled -> load intensive
   
        // Header Opacity & Sidebar Button Appear if window is below landing video

        if ($(window).scrollTop() >= contentTop) {

              headerNav.addClass('flex-header-banner-fixed');
              sideNavBtn.css('display', 'block');
        }

        // Header Opacity & Sidebar Button Disappear if window is above landing video

        if ($(window).scrollTop() < (contentTop)) {
          
              headerNav.removeClass('flex-header-banner-fixed');
              sideNavBtn.css("display", "none");
        }
    
  }); // ------------- End of Window Scroll Function -------------------

  // Auto Scroll Sidebar Navigation Click

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

// Smooth Scrolling

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




