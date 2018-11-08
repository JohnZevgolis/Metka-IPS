$(function() {

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