var terms = [
"a label for those whose experiences of their own gender agree with the sex they were assigned at birth", 
"a fridge magnet Consequat magnam tempor a! Ornare malesuada aliquet perferendis incididunt? Aliquet mi autem? Litora senectus at dolorum at eos error ex.", 
"Tellus saepe ducimus torquent omnis magna? Cillum lobortis netus eaque debitis sollicitudin? Convallis harum tincidunt. Elementum posuere? Quam! Blandit duis."];

function rotateTerm() {
  var ct = $("#rotate").data("term") || 0;
  $("#rotate").data("term", ct === terms.length -1 ? 0 : ct + 1).text(terms[ct]).fadeIn()
              .delay(2000).fadeOut(200, rotateTerm);
}

var video_count = 1;
var videoPlayer = document.getElementById("myVideo");        

function NextVideo(){

    video_count++;
    if (video_count === 4) video_count = 1;
    var nextVid = "assets/video/video"+video_count+".mp4"
    videoPlayer.src = nextVid;
    videoPlayer.play();

}


$(document).ready(function() {


  var mobile = document.createElement('div');
mobile.className = 'nav-mobile';
document.querySelector('.header-nav-white').appendChild(mobile);

  
  $(rotateTerm);
  
  
  $(window).scroll(function () {

    $('.MyButton').click(function(){
       NextVideo();
    });

      var targetOffset3 = $("#slide-1").offset().top;
      //stick nav-bar
    if ($(window).scrollTop() >= targetOffset3) {
      $('.flex-nav-list').addClass('flex-nav-fixed');
      $('.flex-content').addClass('flex-content-fixed');
      $('.flex-footer').removeClass('hidden');
        $('.toggle').removeClass('hidden');
      
    }
    if ($(window).scrollTop() < (targetOffset3)) {
      $('.flex-nav-list').removeClass('flex-nav-fixed');
      $('.flex-content').removeClass('flex-content-fixed');
      $('.toggle').addClass('hidden');
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

    /* Change slide background colour

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

 var cisSlide = $("#slide-8").offset().top;

    var $w3 = $(window).scroll(function(){
    if ( $w3.scrollTop() > cisSlide ) {   
        $('.flex-content').css({"background":"#F39237"});
    } else {
    }

});
    */
    
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