function rotateTerm(){var e=$("#rotate").data("term")||0;$("#rotate").data("term",e===terms.length-1?0:e+1).text(terms[e]).fadeIn().delay(2e3).fadeOut(200,rotateTerm)}function NextVideo(){video_count++,4===video_count&&(video_count=1);var e="assets/video/video"+video_count+".mp4";videoPlayer.src=e,videoPlayer.play()}function onScroll(e){var t=$(document).scrollTop();$("#flex-nav a").each(function(){var e=$(this),o=$(e.attr("href"));o.position().top<=t&&o.position().top+o.height()>t?($("#flex-nav a").removeClass("active"),e.addClass("active")):e.removeClass("active")})}var terms=["a label for those whose experiences of their own gender agree with the sex they were assigned at birth","a fridge magnet Consequat magnam tempor a! Ornare malesuada aliquet perferendis incididunt? Aliquet mi autem? Litora senectus at dolorum at eos error ex.","Tellus saepe ducimus torquent omnis magna? Cillum lobortis netus eaque debitis sollicitudin? Convallis harum tincidunt. Elementum posuere? Quam! Blandit duis."],video_count=1,videoPlayer=document.getElementById("myVideo");$(document).ready(function(){var e=document.createElement("div");e.className="nav-mobile",document.querySelector(".header-nav-white").appendChild(e),$(window).scroll(function(){$(".MyButton").click(function(){NextVideo()});var e=$("#slide-1").offset().top;$(window).scrollTop()>=e&&($(".flex-nav-list").addClass("flex-nav-fixed"),$(".flex-content").addClass("flex-content-fixed"),$(".flex-footer").removeClass("hidden"),$(".toggle").removeClass("hidden")),$(window).scrollTop()<e&&($(".flex-nav-list").removeClass("flex-nav-fixed"),$(".flex-content").removeClass("flex-content-fixed"),$(".toggle").addClass("hidden"),$(".flex-footer").addClass("hidden")),window.matchMedia("(max-width: 768px)").matches&&($(".flex-nav-list").removeClass("flex-nav-fixed"),$(".flex-content").removeClass("flex-content-fixed")),window.matchMedia("(max-width: 992px)").matches&&($(".flex-nav-list").removeClass("flex-nav-fixed"),$(".flex-content").removeClass("flex-content-fixed"))}),$(document).on("scroll",onScroll),$('a[href^="#"]').on("click",function(e){e.preventDefault(),$(document).off("scroll"),$("a").each(function(){$(this).removeClass("active")}),$(this).addClass("active");var t=this.hash,o=t;$target=$(t),$("html, body").stop().animate({scrollTop:$target.offset().top+2},500,"swing",function(){window.location.hash=t,$(document).on("scroll",onScroll)})})});