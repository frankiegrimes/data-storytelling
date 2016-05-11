/**
 * Transcend 
 * DCU Multimedia 2016
 * Frankie Grimes
 *
 * JQuery file to control DOM manipulation
 */

// Wrap JQuery in IIFE to locally scope $ - See http://benalman.com/news/2010/11/immediately-invoked-function-expression/
(function($){ 



// ------------------------------------------------------------------------------------------
// ------------------------------ VARIABLES --------------------------------------------------
// ------------------------------------------------------------------------------------------

// I should have made this variable ages ago instead of forgetting window and hitting an error 100 times

var console = window.console;

// ---------------- DOM Variables - Set as variables to only query server once

// Content

var body = $("body");
var rotater = $('#rotate');
var contentTop = (($(".reveal-wrapper").offset().top) - 50);
var articleTop = ($("#slide-1").offset().top);
var headerNav = $('.banner');
var headerList = $('.header-nav li');
var sideNav = $('#side-nav ul');
var overlay = $('.overlay');
var swipeIcon = $('#swipe');
var form = $("#cis-form");
var videoPlayer = $("#video-slide1")[0];
var logo = $('#logo');
var stamp = $('#stamp');
var quoteBefore = $('#quotes-placeholder');
var quoteAfter = $('#quotes-container');
var quoteResult = $('#quotes-result');
var textBox = $('.text');

var url =  window.location.href;
// Buttons

var headerNavBtn = $('.nav-mobile');
var headerNavCloseBtn = $('.nav-mobile-close');
var dataBtn = $('.data-link');
var dataCloseBtn = $('.close-btn');
var sideNavBtn = $('.smartphone-menu-trigger');
var sideNavCloseBtn = $('.smartphone-menu-trigger-close');
var submitBtn = $("#cis-submit");
var videoBtn = $('.videoBtn-1');
var textBtn = $('.btn');
var cisInput = $('#definition');

// ---------------- Logic Variables

// Interactive Video Players 

var video_count = 1;

// Header Scroll Variables

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = headerNav.outerHeight();

// Twitter Integration

var mouseX;
var mouseY;

// Rotating/Swipe Quotes
var currentTerm;

var hasTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

// ------------------------------------------------------------------------------------------
// ------------------------------ WINDOW FUNCTIONS ------------------------------------------
// ------------------------------------------------------------------------------------------

//  ---------------- Document Ready Function 

  $(document).ready(function() {
    // DOM IS READY
  
    // Run media query on page load
    console.log(url);
    checkSize();

    // and update if window is resized

    $(window).resize(checkSize);

    // Change Rotating/Swipe Quotes if touch capability

    if (hasTouch) {
      swipeIcon.css("display", "block");
      swipeTerm();
    } else {
    rotateTerm();
    }

    // Cisgender Form Input


});

 //  ----------------  Window Scroll Function

  $(window).scroll(function() {
    console.log(body.css("font-size"));
    // Checks and runs everytime the window is scrolled -> load intensive
     didScroll = true;


   // WRAP ALL THIS SHIT IN A FUNCTION AND JUST MAKE WINDOW SCROLL RETURN A BOOLEAN ---------------- ---------------- ---------------- ---------------- ---------------- 

        // Header Opacity & Sidebar Button Appear if window is below landing video

        if ($(window).scrollTop() >= (contentTop)) {

              headerNav.addClass('black-bg');
              sideNavBtn.css('display', 'block');
        }

        // Header Opacity & Sidebar Button Disappear if window is above landing video

        if ($(window).scrollTop() < (contentTop)) {
          
              headerNav.removeClass('black-bg');
      
        }

        // Desktop Only Sticky Sidenav - When Scroll is above content

        if (($(window).scrollTop() < (articleTop)) && (sideNav.hasClass('desktop'))) {
          sideNav.removeClass('desktop-fixed'); 
        }

        // Desktop Only Sticky Sidenav - When Scroll is below content

        if (($(window).scrollTop() > (articleTop)) && (sideNav.hasClass('desktop'))) {
          sideNav.addClass('desktop-fixed');             
        }
    
  });

  //   --------------------- Auto Scroll Sidebar Navigation Click

  function onScroll(){



    var scrollPos = $(document).scrollTop();
    $('nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('nav a').removeClass("active");
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
    if ((sideNav.hasClass('side-nav-is-open')) && (body.css("font-size") <= "26px") && (!sideNav.is(e.target) && (sideNav.has(e.target).length === 0))) 
    {
        sideNav.removeClass('side-nav-is-open');
        sideNavCloseBtn.hide();
        sideNavBtn.show();
    }
  });

  // Tweet Highlighted Text

  $('p').mouseup(function(e) {
    if (getSelectionText() !== "") {
       mouseX = e.pageX; 
      mouseY = e.pageY;
      $('#tweet-button').css({'top':mouseY-150, 'left':mouseX}).fadeIn('slow');
    }
  });

  $('#tweet-button').mouseup(function() {
    window.open('https://twitter.com/intent/tweet?text='+encodeURI(getSelectionText()) + '&url=' + encodeURI(document.URL), '_blank', 'toolbar=0,location=0,menubar=0');
  });

  $('#tweet-button').mouseout(function(){
  $('#tweet-button').fadeOut('slow');
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
      // If they scrolled down and are past the navbar, add class .is-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          headerNav.removeClass('black-bg').addClass('is-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              headerNav.removeClass('is-up').addClass('black-bg');

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
    textBox.css("visibility", "hidden");
    textBtn.css("visibility", "hidden");
    return false;
 });

 dataCloseBtn.click(function(){

     overlay.removeClass('is-open');
     headerNav.css("visibility", "visible");
     return false;
 });

 // -------------- Sidebar Navigation Click Functions

 sideNavBtn.click(function(){

    sideNavBtn.css("visibility", "hidden");
    sideNavCloseBtn.show();
    sideNav.addClass('side-nav-is-open');
    return false;
 });

 sideNavCloseBtn.click(function(){

    sideNavCloseBtn.hide();
    sideNavBtn.css("visibility", "visible");
    sideNav.removeClass('side-nav-is-open');
    return false;
 });

 if (sideNav.hasClass('side-nav-is-open')) {
    sideNavBtn.hide();
 } 

 // -------------- Header Navigation Click Functions

 headerNavBtn.click(function(){

    headerList.css("visibility", "visible");
   
    headerNavBtn.css("visibility", "hidden");
     headerNavCloseBtn.css("visibility", "visible");
    return false;
  });

 headerNavCloseBtn.click(function(){

    headerList.css("visibility", "hidden");
   
    headerNavCloseBtn.css("visibility", "hidden");
     headerNavBtn.css("visibility", "visible");
    return false;
  });

 // ------------------ Cis Form Submit Function

 submitBtn.click(function(){

      var inputText = cisInput.val();
      console.log(inputText);
      localStorage.setItem('definition', inputText);

      var retrievedObject = localStorage.getItem('definition');
      console.log(retrievedObject);
      quoteBefore.hide();
      form.css("display", "none");
     quoteResult.text(retrievedObject);
      quoteAfter.show();
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
    window.console.log(video_count);
    window.console.log(videoPlayer);
    if (video_count === 4) {
      video_count = 1;
    }
    var nextVid = "assets/video/video"+video_count+".mp4";
    videoPlayer.src = nextVid;
    videoPlayer.play();

  }

  // --------------------- Parse Quotes Function

 function parseTxt() {

      return $.get("assets/data/cisgender-text.txt", function() {});
  }

  // Rotating Survey Quotes 

  var termsArray = parseTxt();

 // --------------------- Auto Rotate Quotes Function

 function rotateTerm() { 
    termsArray.success(function(terms) {

      var items = terms.split(/","/);

      var currentTerm = rotater.data("term") || 0;
    rotater.data("term", currentTerm === items.length -1 ? 0 : currentTerm + 1).text(items[currentTerm]).fadeIn()
                .delay(2000).fadeOut(200, rotateTerm);
    });

  }

  function swipeTerm() {
    termsArray.success(function(terms) {
      var items = terms.split(/","/);

      var currentTerm = rotater.data("term") || 0;

      rotater.data("term", currentTerm).text(items[currentTerm]);

      $(document).on('swipeleft', rotater, function() {

        window.console.log('swipe left');
        currentTerm -= 1;
        rotater.data("term", currentTerm).text(items[currentTerm]);
      });

       $(document).on('swiperight', function() {

        window.console.log('swipe right');
        currentTerm += 1;
        rotater.data("term", currentTerm).text(items[currentTerm]);
      });

     });  
  }

  function checkSize() {

    if (body.css("font-size") > "23px") {
      sideNav.addClass("side-nav-is-open");
      sideNav.addClass("desktop");
    } if (body.css("font-size") < "23px") {
      sideNav.removeClass("side-nav-is-open");
      sideNav.removeClass("desktop");
    }

    if (sideNav.hasClass("desktop")) {
      sideNavBtn.css("visibility", "hidden");
    }

    if (body.css("font-size") < "21px") {
      headerList.css("visibility", "hidden");
      headerNavBtn.css("visibility", "visible").css("display", "block");
    }

    


  }

// Tweet Highlighted Text  

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
        window.console.log(text);
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    return text;

}



})(jQuery);







