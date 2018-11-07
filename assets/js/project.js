$(function() {

	var projectInfo = new Swiper('.project-info', {
        loop: true,
        simulateTouch:false
    });
    var projectBg = new Swiper('.project-bg', {
        loop: true,
        simulateTouch:false
    });
    var projectBg2 = new Swiper('.project-bg2', {
        loop: true,
        simulateTouch:false
    });
    var projectSlider = new Swiper('.project-img', {
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        nested: true,
    });

    $(".project-controls .btn-next").click(function() {
    	projectInfo.slideNext();
    	projectBg.slideNext();
    	projectBg2.slideNext();
    })

    $(".project-controls .btn-prev").click(function() {
    	projectInfo.slidePrev();
    	projectBg.slidePrev();
    	projectBg2.slidePrev();
    })
	
})