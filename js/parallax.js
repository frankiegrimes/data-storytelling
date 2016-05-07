(function($){ 

// ------------------------------------------------------------------------------------------
// ------------------------------ VRIABLES --------------------------------------------------
// ------------------------------------------------------------------------------------------

// DOM Variables

var rotater = $('#rotate');
var contentTop = (($(".reveal-wrapper").offset().top) - 50);
var articleTop = ($("#slide-1").offset().top);
var headerNav = $('.flex-header-banner');
var headerList = $('.header-nav li');
var sideNav = $('.flex-nav-list');
//var flexNav = $('#flexNav');
var overlay = $('.overlay');
var videoPlayer = $("myVideo"); 
var videoBtn = $('.MyButton');
var headerNavBtn = $('.nav-mobile');
var headNavCloseBtn = $('.nav-mobile-close');
var dataBtn = $('.data-link');
var dataCloseBtn = $('.close-btn');
var sideNavBtn = $('.smartphone-menu-trigger');
var sideNavCloseBtn = $('.smartphone-menu-trigger-close');

// Interactive Video Players 

var video_count = 1;

// Header Scroll Variables

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = headerNav.outerHeight();

// ------------------------------------------------------------------------------------------
// ------------------------------ WINDOW FUNCTIONS ------------------------------------------
// ------------------------------------------------------------------------------------------

//  Document Ready Function 

  $(document).ready(function() {
    // DOM IS READY
    // Trigger Rotating Quotes
    $(rotateTerm);

    // Run media query on page load

    checkSize();

    // and if window is resized

    $(window).resize(checkSize);

  });

 // Window Scroll Function

  $(window).scroll(function() {

    // Checks and runs everytime the window is scrolled -> load intensive
   
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
        }

        // Desktop Only Sticky Sidenav - When Scroll is above content

        if (($(window).scrollTop() < (articleTop)) && (sideNav.hasClass('desktop'))) {
          sideNav.removeClass('desktop-fixed'); 
             

        }

        // Desktop Only Sticky Sidenav - When Scroll is below content

        if (($(window).scrollTop() > (articleTop)) && (sideNav.hasClass('desktop'))) {
          sideNav.addClass('desktop-fixed');             
        }




        didScroll = true;
    
  });

  //   --------------------- Auto Scroll Sidebar Navigation Click

  function onScroll(){

    var scrollPos = $(document).scrollTop();
    $('#flex-nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#flex-nav a').removeClass("active");
            currLink.addClass("active");
            currLink.addClass("ion-arrow-right-b");
        }
        else {
            currLink.removeClass("active");
            currLink.removeClass("ion-arrow-right-b");
        }
    });
  }
  // Document Scroll Function
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

  // Document Mouseup (Release Click) Function
  // Hide sidenav on click outside

  $(document).mouseup(function (e) {
    // if the target of the click isn't the container... // ... nor a descendant of the container
    if ((sideNav.hasClass('flex-nav-is-open')) && ($("body").css("font-size") <= "26px") && (!sideNav.is(e.target) && (sideNav.has(e.target).length === 0))) 
    {
        sideNav.removeClass('flex-nav-is-open');
        sideNavCloseBtn.hide();
        sideNavBtn.show();
    }
  });

// ------------------------------------------------------------------------------------------
// ------------------------------ FUNCTIONS -------------------------------------------------
// ------------------------------------------------------------------------------------------

  //  --------------------- Show/Hide Header Nav Functions

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

 // ---------------------  On Click Video Function

function nextVideo() {

    video_count++;
    if (video_count === 4) {
      video_count = 1;
    }
    var nextVid = "assets/video/video"+video_count+".mp4";
    videoPlayer.src = nextVid;
    videoPlayer.play();

  }

  // --------------------- Parse Quotes Function

 function parseTxt() {

      return $.get("../assets/data/cisgender-text.txt", function() {});
  }

  // Rotating Survey Quotes 

  var termsArray = parseTxt();

 // --------------------- Rotate Quotes Function

 function rotateTerm() { 
  termsArray.success(function(terms) {

    var items = terms.split(/","/);

    var currentTerm = rotater.data("term") || 0;
  rotater.data("term", currentTerm === items.length -1 ? 0 : currentTerm + 1).text(items[currentTerm]).fadeIn()
              .delay(2000).fadeOut(200, rotateTerm);
});

}

  function checkSize() {
    window.console.log($("body").css("font-size"));
    if ($("body").css("font-size") > "26px") {
      sideNav.addClass("flex-nav-is-open");
      sideNavBtn.css("display", "none");
      sideNavCloseBtn.css("display", "none");
      sideNav.addClass("desktop");
    } if ($("body").css("font-size") < "26px") {
      sideNav.removeClass("flex-nav-is-open");
      sideNavBtn.css("display", "block");
      sideNavCloseBtn.css("display", "block");
      sideNav.removeClass("desktop");
    }
  }




})(jQuery);







