!function($){function e(){var e=$(document).scrollTop();$("nav a").each(function(){var t=$(this),s=$(t.attr("href"));s.position().top<=e&&s.position().top+s.height()>e?($("nav a").removeClass("active"),t.addClass("active"),t.addClass("ion-arrow-right-b")):(t.removeClass("active"),t.removeClass("ion-arrow-right-b"))})}function t(){var e=$(this).scrollTop();Math.abs(j-e)<=B||(e>j&&e>H?p.removeClass("black-bg").addClass("is-up"):e+$(window).height()<$(document).height()&&p.removeClass("is-up").addClass("black-bg"),j=e)}function s(){U++,window.console.log(U),window.console.log(g),4===U&&(U=1);var e="assets/video/video"+U+".mp4";g.src=e,g.play()}function o(){return $.get("../assets/data/cisgender-text.txt",function(){})}function i(){Y.success(function(e){var t=e.split(/","/),s=r.data("term")||0;r.data("term",s===t.length-1?0:s+1).text(t[s]).fadeIn().delay(2e3).fadeOut(200,i)})}function n(){Y.success(function(e){var t=e.split(/","/),s=r.data("term")||0;r.data("term",s).text(t[s]),$(document).on("swipeleft",r,function(){window.console.log("swipe left"),s-=1,r.data("term",s).text(t[s])}),$(document).on("swiperight",function(){window.console.log("swipe right"),s+=1,r.data("term",s).text(t[s])})})}function a(){d.css("font-size")>"26px"&&(w.addClass("side-nav-is-open"),w.addClass("desktop")),d.css("font-size")<"26px"&&(w.removeClass("side-nav-is-open"),w.removeClass("desktop"))}function c(){var e="";return window.getSelection?(e=window.getSelection().toString(),window.console.log(e)):document.selection&&"Control"!==document.selection.type&&(e=document.selection.createRange().text),e}var l=window.console,d=$("body"),r=$("#rotate"),u=$(".reveal-wrapper").offset().top-50,v=$("#slide-1").offset().top,p=$(".banner"),f=$(".header-nav li"),w=$("#sideNav ul"),m=$(".overlay"),h=$("#swipe"),b=$("cis-form"),g=$("#video-slide1")[0],C=$("#logo"),k=$("#stamp"),y=$(".nav-mobile"),x=$(".nav-mobile-close"),T=$(".data-link"),I=$(".close-btn"),z=$(".smartphone-menu-trigger"),S=$(".smartphone-menu-trigger-close"),R=$("cis-submit"),D=$(".videoBtn-1"),U=1,O,j=0,B=5,H=p.outerHeight(),L,M,N,Q,X="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch;$(document).ready(function(){a(),$(window).resize(a),X?(h.css("display","block"),n()):i()}),$(window).scroll(function(){l.log(d.css("font-size")),O=!0,$(window).scrollTop()>=u&&(p.addClass("black-bg"),z.css("display","block")),$(window).scrollTop()<u&&p.removeClass("black-bg"),$(window).scrollTop()<v&&w.hasClass("desktop")&&w.removeClass("desktop-fixed"),$(window).scrollTop()>v&&w.hasClass("desktop")&&w.addClass("desktop-fixed")}),$(document).on("scroll",e),$('a[href^="#"]').on("click",function(t){t.preventDefault(),$(document).off("scroll"),$("a").each(function(){$(this).removeClass("active")}),$(this).addClass("active");var s=this.hash,o=$(s);$("html, body").stop().animate({scrollTop:o.offset().top+2},500,"swing",function(){window.location.hash=s,$(document).on("scroll",e)})}),$(document).mouseup(function(e){w.hasClass("side-nav-is-open")&&d.css("font-size")<="26px"&&!w.is(e.target)&&0===w.has(e.target).length&&(w.removeClass("side-nav-is-open"),S.hide(),z.show())}),$("p").mouseup(function(e){""!==c()&&(L=e.pageX,M=e.pageY,$("#tweet-button").css({top:M-150,left:L}).fadeIn("slow"))}),$("#tweet-button").mouseup(function(){window.open("https://twitter.com/intent/tweet?text="+encodeURI(c())+"&url="+encodeURI(document.URL),"_blank","toolbar=0,location=0,menubar=0")}),$("#tweet-button").mouseout(function(){$("#tweet-button").fadeOut("slow")}),setInterval(function(){O&&(t(),O=!1)},250),T.click(function(){return window.scrollTo(0,0),m.addClass("is-open"),p.css("visibility","hidden"),!1}),I.click(function(){return m.removeClass("is-open"),p.css("visibility","visible"),!1}),z.click(function(){return z.css("visibility","hidden"),S.show(),w.addClass("side-nav-is-open"),!1}),S.click(function(){return S.hide(),z.css("visibility","visible"),w.removeClass("side-nav-is-open"),!1}),w.hasClass("side-nav-is-open")&&z.hide(),y.click(function(){return f.css("visibility","visible"),y.css("visibility","hidden"),x.css("visibility","visible"),!1}),x.click(function(){return f.css("visibility","hidden"),x.css("visibility","hidden"),y.css("visibility","visible"),!1}),R.click(function(){b.submit(),localStorage.setItem("cisInput",Q);var e=localStorage.getItam("cisInput");l.log(Q)}),D.click(function(){return s(),!1});var Y=o()}(jQuery);