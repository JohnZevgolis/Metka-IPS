$(function() {

  modal();

  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
  });
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    thumbs: {
      swiper: galleryThumbs
    },
  });

  $(".next-swiper,.swiper-button-next").click(function() {
    galleryTop.slideNext();
    galleryThumbs.slideNext();
  })

  $(".prev-swiper,.swiper-button-prev").click(function() {
    galleryTop.slidePrev();
    galleryThumbs.slidePrev();
  })

  var videoSlider = new Swiper('.video-slider', {
    simulateTouch:false,
    pagination: {
      el: $('.video-pagination'),// to find the swiper-pagination you put outside of the swiper-container
      clickable: true,
      renderBullet: function (index, className) {
          var slider_array = [];
          var el = $('.video-slider');

          return '<span class="' + className + '">' + [index+1] + '</span>';
      }
    },
  });

  if(videoSlider.slides.length == 1) { 
    $('.video-pagination').hide(); 
  } 

})

function modal() {

  var modal = $("#myModal");
  var modalContent = $("#myModal .modal-content");

  var span = $("#myModal span");

  $("body").click(function(e) {
      if (e.target.id == modal.attr('id') && modal.is(":visible")) {
        modalContent.stop().animate({"top":"-300px"},400,function() {
          $(modal).find("iframe").removeAttr("src");
          modal.fadeOut(400);
        })
      }
  })

  span.click(function() {
    modalContent.stop().animate({"top":"-300px"},400,function() {
      $(modal).find("iframe").removeAttr("src");
      modal.fadeOut(400);
    })
  })

  $(".video-gallery .video-slider a.intro-link").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var iframe = $(this).attr("data-src");

    modalContent.removeAttr("style");

    modal.fadeIn(400,function() {
      $(modal).find("iframe").attr("src",iframe);
    });
  })

}