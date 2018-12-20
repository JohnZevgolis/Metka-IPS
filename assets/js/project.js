$(function() {

    var projectBg2 = new Swiper('.project-bg2', {
        loop: true,
        simulateTouch: false,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
    });
    var projectSlider = new Swiper('.project-img', {
        loop: true,
        simulateTouch: false,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
    });

    $(".project-controls .btn-next").click(function() {
    	projectSlider.slideNext();
    	projectBg2.slideNext();
    })

    $(".project-controls .btn-prev").click(function() {
    	projectSlider.slidePrev();
    	projectBg2.slidePrev();
    })
	
})