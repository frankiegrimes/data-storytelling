(function($){ 


// --------------- Animated Survey Quotes ---------------

function parseTxt() {

      return $.get("../assets/data/cisgender-text.txt", function(data) {});
}
// Survey Quotes Array

var termsArray = parseTxt();

// Rotate Quotes Function

var rotater = $('#rotate');

function rotateTerm() { 
  termsArray.success(function(terms) {

    var items = terms.split(/","/);

    var currentTerm = rotater.data("term") || 0;
  rotater.data("term", currentTerm === items.length -1 ? 0 : currentTerm + 1).text(items[currentTerm]).fadeIn()
              .delay(2000).fadeOut(200, rotateTerm);
});

}

// --------------- Interactive Video Players ---------------

// Variables

var videoPlayer = $("myVideo"); 
var video_count = 1;
   

// On Click Video Function

function nextVideo() {

    video_count++;
    if (video_count === 4) {
      video_count = 1;
    }
    var nextVid = "assets/video/video"+video_count+".mp4";
    videoPlayer.src = nextVid;
    videoPlayer.play();

}

// ------------------- Set DOM Variables to only query the DOM once

var dataBtn = $('.data-link');
var dataCloseBtn = $('.close-btn');
var overlay = $('.overlay');
var headerNav = $('.flex-header-banner');
var headerList = $('.header-nav li');
var headerNavBtn = $('.nav-mobile');
var headNavCloseBtn = $('.nav-mobile-close');
var sideNav = $('.flex-nav-list');
var flexNav = $('#flexNav');
var sideNavBtn = $('.smartphone-menu-trigger');
var sideNavCloseBtn = $('.smartphone-menu-trigger-close');

var videoBtn = $('.MyButton');

//var contentTop = (($(".reveal-wrapper").offset().top) - 50);

// --------------- Show/Hide Header on Scroll Variables ---------------

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = headerNav.outerHeight();

// --------------- Document Ready Function ---------------

$(document).ready(function() {

    // DOM IS READY

    // Trigger Rotating Quotes
  
    $(rotateTerm);

    // ----------------------------- Button Functions 

    // -------------- Data Modal Page Click Functions

     dataBtn.click(function(){

        window.scrollTo(0,0);
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

     if (sideNav.hasClass('flex-nav-is-open')) {
        sideNavBtn.hide();
     } 

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

         nextVideo();
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

  $(window).scroll(function() {

  /* Checks and runs everytime the window is scrolled -> load intensive
   
        // Header Opacity & Sidebar Button Appear if window is below landing video

        if ($(window).scrollTop() >= (contentTop)) {

              headerNav.addClass('flex-header-banner-fixed');
              sideNavBtn.css('display', 'block');
              sideNavBtn.removeClass('smartphone-menu-trigger-black');
        }

        // Header Opacity & Sidebar Button Disappear if window is above landing video

        if ($(window).scrollTop() < (contentTop)) {
          
              headerNav.removeClass('flex-header-banner-fixed');
              sideNavBtn.addClass('smartphone-menu-trigger-black');
             sideNavBtn.css("display", "none");
        }

        if (!headerNav.hasClass('flex-header-banner-fixed')) {

                
        }

        */

        didScroll = true;
    
  }); // ------------- End of Window Scroll Function -------------------


  // Hide sidenav on click outside

  $(document).mouseup(function (e)
{
// if the target of the click isn't the container... // ... nor a descendant of the container
    if ((sideNav.hasClass('flex-nav-is-open')) && (!sideNav.is(e.target) && (sideNav.has(e.target).length === 0))) 
    {
        sideNav.removeClass('flex-nav-is-open');
        sideNavCloseBtn.hide();
        sideNavBtn.show();
    }
});

  // Show/Hide Header Nav Functions

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      var st = $(this).scrollTop();
      
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta) {
          return;
       }
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          headerNav.removeClass('flex-header-banner-fixed').addClass('nav-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              headerNav.removeClass('nav-up').addClass('flex-header-banner-fixed');

          }
      }
      
      lastScrollTop = st;
  }

  // Auto Scroll Sidebar Navigation Click

  function onScroll(){

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
      
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

});



})(jQuery);