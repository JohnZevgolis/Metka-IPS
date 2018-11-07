window.headerHeight = $('header').outerHeight();

$(document).ready(function () {

    header();
    mobileMenu();
    submenu();
    search();

    lazyLoad();

    animations();

    Carousel();

    cookies();

    dropdown();

    FastClick.attach(document.body);
    setTimeout(function () {
        $(window).trigger('scroll');
    }, 100); //Set to Max throttle
});

$(window).resizeEnd(function () {

    spacer();

    if (Modernizr.mq('(min-width: 1026px)')) {
        $('#menu').removeClass('mobile-active');
    } else {
        $("a.has_submenu").off("mouseenter");
        $("a.has_submenu, div.sub-menu").off("mouseleave");
    }

    if ($('#homeSlider').length && Modernizr.mq('(min-width: 640px)')) {
        $('#preview')
            .width($('#homeSlider').outerWidth() / 1.5)
            .height($('#homeSlider').outerHeight() / 1.5);
    }

});

$(window).on('load', function () {

    magnificPopup();

    form();

});

function header() {

    //Check if Not Homepage
    //if (location.href.replace(location.search, '').replace(location.hash, '').replace('/#', '') !== location.origin + '/') {
    //    var spacer = document.getElementById("spacer");
    //    spacer.id = "spacer";
    //    spacer.style = "height:" + window.headerHeight + "px";
    //} else {
    //    $('html').addClass('home');
    //}

    spacer();

    //if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
    //    $('header').css('transition-duration', '0s').addClass('scrolled');
    //    setTimeout(function () {
    //        $('header').removeAttr('style');
    //    }, 450);

    //    $('header').addClass('no-transition').queue(function () {
    //        $(this).removeClass('no-transition');
    //    }, 450);
    //}

    var $header = $('header'),
        $page = $('html,body'),
        $menu = $('#menu'),
        headerThrottle = throttle(function () {

            if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
                $header.addClass('scrolled');
            } else {
                $header.removeClass('scrolled');
            }

        }, 10);

    var pTimeout;

    $(window).on('scroll', function () {
        headerThrottle();
    });

}

function mobileMenu() {
    var $trigger = $('#menuTriggerMobile'),
        $menu = $('#menu'),
        $dropdown = $('div.is-dropdown'),
        openTimeout;

    $trigger.click(function (e) {
        e.preventDefault();

        clearTimeout(openTimeout);

        $trigger.toggleClass('active');

        $('#searchMobile').removeClass('active');

        openTimeout = setTimeout(function () {

            $menu.toggleClass('mobile-active');

        }, 250);
    });

    $menu.click(function (e) { e.stopPropagation(); });

    $('html').click(function () {
        if ($menu.hasClass('mobile-active')) {
            $trigger.removeClass('active');

            openTimeout = setTimeout(function () {

                $menu.removeClass('mobile-active');

            }, 310);
        }
    });

    $dropdown.parent().on('click', function () {

        if ($menu.hasClass('mobile-active')) {

            $dropdown.parent()
                .not($(this))
                .find('div.is-dropdown').removeClass('active')
                .slideUp(350);

            $(this)
                .find('div.is-dropdown').toggleClass('active')
                .slideToggle(350);

        }
    });

}

function submenu() {
    var $header = $("header"),
        $menuLinks = $('#menu').find("a.has_submenu"),
        $subMenu = $("div.sub-menu"),
        $subMenuRows = $('#sub-menu-rows').children("div"),
        $active = $('#menu').find("li.active"),
        openTimeout,
        closeTimeout,
        id;

    $menuLinks.on("touchstart mouseenter", function (e) {
        e.preventDefault();

        clearTimeout(closeTimeout);
        clearTimeout(openTimeout);

        $menuLinks.removeClass("sub-menu-open");
        $active.removeClass("active");
        $(this).addClass("sub-menu-open");

        id = parseInt($(this).data('id'));

        if ($header.hasClass("sub-menu-active")) {
            openTimeout = setTimeout(function () {

                $subMenuRows.hide();
                $("#sub-menu-row-" + id).show();

            }, 250);
        } else {

            $subMenuRows.hide();
            $("#sub-menu-row-" + id).show();

        }


        $header.addClass("sub-menu-active");

        $subMenu.fadeIn(300);

    });

    $("a.has_submenu, div.sub-menu").on("mouseleave", function (e) {
        if (e.relatedTarget !== null) {

            if (
                $(e.relatedTarget.parentElement).is("div.sub-menu")
                || $(e.relatedTarget.parentElement.parentElement).is("div.sub-menu")
                || $(e.relatedTarget).is("a.has_submenu")

            ) {

                clearTimeout(closeTimeout);

            }
            else {
                closeTimeout = setTimeout(function () {

                    resetSubMenu();

                }, 250);

            }

        }
    });

    $header.on('mousedown touchstart click', function (e) {
        e.stopPropagation();
    });

    $('#menuTriggerMobile, #sub-menu-close').click(function (e) {
        e.preventDefault();
        resetSubMenu();
    });

    $subMenu.on("close", function () {
        resetSubMenu();
    });

    $('html').click(function () {
        resetSubMenu();
    });

    function resetSubMenu() {
        $active.addClass("active");
        $menuLinks.removeClass("sub-menu-open");

        $header.removeClass("sub-menu-active");
        $subMenu.fadeOut(250);
    }

    if (Modernizr.touchevents || Modernizr.mq('(max-width: 1025px)')) {
        $menuLinks.off("mouseenter");
        $("a.has_submenu, div.sub-menu").off("mouseleave");
    }

    if (typeof getUrlVars()["menu_open"] !== "undefined" && getUrlVars()["menu_open"].length > 0) {

        id = parseInt(getUrlVars()["menu_open"]);

        if ($("#sub-menu-row-" + id).length) {
            $subMenu.show();
            $('header').addClass("sub-menu-active");
            $("#sub-menu-row-" + id).show();
        }
    }
}

function spacer() {
    window.headerHeight = $('header').outerHeight();
    var spacer = document.getElementById("spacer");
    if (spacer !== null)
        spacer.style = "height:" + window.headerHeight + "px";
}

function search() {
    var $search = $('#searchTrigger'),
        $input = $search.find('input'),
        $searchMobile = $('#searchMobile');

    // Desktop Search
    $search.on('touchstart', function () {
        $(this).toggleClass('active');
        $input.focus();
    });

    $input.on({
        "focusin keydown": function (e) {
            $search.addClass('focused');

            if (e.which === 27) {
                $search.removeClass('focused');
            }
        },
        "focusout": function () {
            $search.removeClass('focused');
        }
    });

    // Mobile Search
    $searchMobile.find('button').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $searchMobile.toggleClass('active');

        if ($searchMobile.hasClass('active')) {
            setTimeout(function () {
                $searchMobile.find('input').focus();
            }, 100)
        }

    });

    $searchMobile.find('input').on('change', function () {
        if (!$(this).val().length > 0) {
            $searchMobile.removeClass("active");
        }
    });
}

function Carousel() {
    var $homeSlider = $('#homeSlider'),
        $jobsCarousel = $('#jobsCarousel'),
        $solutionsCarousel = $('#solutionsCarousel'),
        $benefitsCarousel = $("#benefitsCarousel");

    if ($homeSlider.length) {
        var options = sliderOptions(),
            initWidth = $(window).outerWidth();

        $homeSlider.masterslider(options);

        var slider_obj = $homeSlider.masterslider('slider'),
            $slides = $homeSlider.find("div.ms-slide"),
            $preview = $('#preview'),
            $previewBG = $preview.find('div.bg'),
            speed = 700;

        //Init Preview
        $preview.width($homeSlider.outerWidth() / 1.5);
        $preview.height($homeSlider.outerHeight() / 1.5);

        //On Slider Init
        slider_obj.api.addEventListener(MSSliderEvent.INIT, function () {
            $preview.fadeIn(800);
            $('#homeSliderCtrl').fadeIn(800);
            $('.home-slider').addClass('loaded');
        });

        //On Slide Change
        slider_obj.api.addEventListener(MSSliderEvent.CHANGE_START, function () {
            var index = slider_obj.api.index();

            $previewBG.removeClass('current');

            if (index + 1 === slider_obj.api.count()) {
                $($previewBG[0]).addClass('current');
            } else {
                $($previewBG[index + 1]).addClass('current');
            }

            $slides.removeClass('current');
            $slides.eq(index).addClass('current');

        });

        //Options Object Function
        function sliderOptions() {
            var o = {
                width: 1903,
                height: 865,
                autoplay: true,
                loop: true,
                speed: 20,
                preload: 2,
                view: "fade",
                overPause: true,
                instantStartLayers: true,
                keyboard: true,
                mouse: false,
                swipe: false,
                slideshowDelay: 15
            };

            if (Modernizr.mq('(min-width: 640px)')) { // Desktop
                o.layout = "fullwidth";
            } else { // Mobile
                o.layout = "fullscreen";
            }
            return o;
        }

        //On Preview Click
        $preview.click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            slider_obj.api.next();
        });

        //Controls
        var $btnNext = $('#homeSliderCtrl').find('button.btn-next'),
            $btnPrev = $('#homeSliderCtrl').find('button.btn-prev');

        $btnNext.click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            slider_obj.api.next();
        });

        $btnPrev.click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            slider_obj.api.previous();
        });

    }

    if ($jobsCarousel.length) {

        $jobsCarousel.owlCarousel({
            items: 1,
            pullDrag: true,
            touchDrag: true,
            mouseDrag: false,
            loop: false,
            autoPlay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            checkVisible: false,
            margin: 0,
            stagePadding: 0,
            slideBy: 1,
            responsive: {
                640: {
                    items: 2,
                    margin: 20,
                    slideBy: 2
                },
                1026: {
                    items: 3,
                    margin: 20,
                    slideBy: 3
                },
                1366: {
                    items: 3,
                    margin: 30,
                    slideBy: 3
                },
                1680: {
                    items: 3,
                    margin: 40,
                    slideBy: 3
                }
            }
        });

    }

    if ($solutionsCarousel.length) {

        $solutionsCarousel.owlCarousel({
            items: 1,
            pullDrag: true,
            touchDrag: true,
            mouseDrag: false,
            loop: false,
            autoPlay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            checkVisible: false,
            margin: 0,
            stagePadding: 0,
            slideBy: 3,
            responsive: {
                640: {
                    items: 2,
                    margin: 20,
                    slideBy: 2
                },
                1026: {
                    items: 3,
                    margin: 20,
                    slideBy: 3
                },
                1366: {
                    items: 3,
                    margin: 25,
                    slideBy: 3
                },
                1980: {
                    items: 3,
                    margin: 40,
                    slideBy: 3
                }
            }
        });

    }

    if ($benefitsCarousel.length) {

        $benefitsCarousel.owlCarousel({
            items: 1,
            pullDrag: true,
            touchDrag: true,
            mouseDrag: false,
            loop: false,
            dots: false,
            nav: false,
            checkVisible: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 3000,
            smartSpeed: 0.1,
            margin: 0,
            stagePadding: 0,
            slideBy: 1,
            onInitialized: rangeInit,
            onTranslate: rangeUpdate
        });

        function rangeInit(event) {
            var itemCount = event.item.count;
            var size = event.page.size;

            $("#benefitsRange").ionRangeSlider({
                type: "single",
                min: 1,
                max: itemCount - (size - 1),
                keyboard: true,
                hide_min_max: true,
                hide_from_to: true,
                step: 0.1,
                onChange: function (data) {
                    owlTo = Math.ceil((data.from) - 1);
                    $benefitsCarousel
                        .trigger('to.owl.carousel', [owlTo, 0, true])
                        .trigger('stop.owl.autoplay');
                },
                onFinish: function () {
                    $benefitsCarousel.trigger('play.owl.autoplay');
                }
            });

            $("div.range-container").fadeIn(100);

        }

        function rangeUpdate(e) {
            var instance = $("#benefitsRange").data("ionRangeSlider");

            instance.update({
                from: e.item.index + 1
            });
        }

    }
}

function lazyLoad() {
    var bLazy = new Blazy({
        selector: '.lazy',
        offset: 200
    });
}

function animations() {

    if (Modernizr.cssanimations) {

        var hasAnim = throttle(function () {

            if ($('[data-animation]').length !== $('[data-animation].animate').length) {
                $('[data-animation]').each(function () {

                    if ($(this).outerHeight() > $(window).outerHeight()) {
                        if ($(this).isOnScreen(0, 0) === true) {
                            $(this).addClass('animate');
                        }
                    } else {
                        if ($(this).isOnScreen(0.35, 0.35) === true) {
                            $(this).addClass('animate');
                        }
                    }


                });
            }

            if ($('.animate-this').length !== $('.animate-this.animate').length) {
                $('.animate-this').each(function () {

                    if ($(this).outerHeight() > $(window).outerHeight()) {
                        if ($(this).isOnScreen(0, 0) === true) {
                            $(this).addClass('animate');
                        }
                    } else {
                        if ($(this).isOnScreen(0.35, 0.35) === true) {
                            $(this).addClass('animate');
                        }
                    }


                });
            }

        }, 100);

        $(window).on('scroll', hasAnim);

    } else {
        $('[data-animation]').each(function () {
            $(this).removeAttr('data-animation');
        });

        $('.animate-this').each(function () {
            $(this).removeClass('animate-this');
        });
    }
}

function magnificPopup() {

    $homeVideo = $('#videoHome');

    if ($homeVideo.length) {
        $homeVideo.magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-home-video',
            removalDelay: 300,
            fixedContentPos: true,
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="fa fa-times"></i></button>',
            titleSrc: 'data-title',
            iframe: {
                markup: '' +
                '<div class="mfp-top"> ' +
                '<div class="mfp-title"></div>' +
                '<a href="#" class="external" target="_blank"><i class="fa fa-link"></i></a>' +
                '<div class="mfp-close"></div>' +
                '</div>' +
                '<div class="mfp-iframe-scaler">' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>'
            },
            callbacks: {
                open: function (item) {

                    var magnificPopup = $.magnificPopup.instance,
                        cur = magnificPopup.st.el;

                    $.magnificPopup.instance.content.find('a.external').attr('href', cur.attr('href'));
                },
                markupParse: function (template, values, item) {
                    values.title = item.el.data('title');
                }
            }
        });
    }

    $('body').on('click', 'button.mfp-close', function () {
        $.magnificPopup.instance.close();
    });
}

function share(network, href, title, source) {
    var social = network.toLowerCase().replace(/ /g, '').replace(/[^a-zA-Z0-9]/g, ''),
        url,
        close = false,
        width = 600, height = 600,
        left = (screen.width / 2) - (width / 2), top = (screen.height / 2) - (height / 2);

    href = (typeof href === 'undefined') ? encodeURIComponent(document.location.href) : encodeURIComponent(href);
    title = (typeof title === 'undefined') ? encodeURIComponent(document.title) : encodeURIComponent(title);
    source = (typeof source === 'undefined') ? encodeURIComponent(document.location.hostname) : encodeURIComponent(source);

    switch (social) {
        case 'fb':
        case 'facebook':
            url = 'https://www.facebook.com/sharer/sharer.php?app_id=172525162793917&sdk=joey&u=' + href + '&display=popup';
            break;
        case 'twitter':
            url = 'http://twitter.com/share?url=' + href + '&text=' + title;
            break;
        case 'mail':
        case 'email':
            url = 'mailto: ?subject=' + title + '&body=' + href;
            close = true;
            break;
        case 'linkedin':
            url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + href + '&title=' + title + '&source=' + source;
            break;
        case 'google':
        case 'googleplus':
            url = 'https://plus.google.com/share?url=' + href + '&text=' + title + '&hl=' + window.lang;
            break;
        case 'stumbleupon':
        case 'stumble':
            url = "http://www.stumbleupon.com/submit?url=" + href;
            break;
        case 'whatsapp':
        case 'whatsup':
            url = "whatsapp://send?text=" + href + " " + title;
            break;
        case 'reddit':
            url = "https://reddit.com/submit?url=" + href + "&title=" + title;
            break;
        default:
            console.log(network + ' is undefined!');
            return false;
    }

    if (url === typeof 'undefined')
        return false;

    var popWindow = window.open(url, 'popUpWindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + height + ',width=' + width + ',left=' + left + ',top=' + top + ',menubar=no,location=no');

    popWindow.focus();

    if (close) {
        setTimeout(function () {
            popWindow.close();
        }, 100);
    }

    return false;

}

function form() {
    var $placeholder = $('.js-placeholder');

    if ($placeholder.length) {

        $placeholder.find('input[type="text"]').on('change', function () {
            if ($(this).val().length) {
                $(this).addClass('has-text');
            } else {
                $(this).removeClass('has-text');
            }
        });

    }
}

function uaParser() {
    document.documentElement.setAttribute('data-browser', $.ua.browser.name);
    document.documentElement.setAttribute('data-OS', $.ua.os.name);
}

function cookies() {
    var cookie = Cookies.get('Accept_Cookies'),
        $div = $('#cookies');

    if (typeof cookie !== "undefined") {
        $div.remove();
    }
    else {
        $div.show();

        $('#acceptCookies').click(function (e) {
            e.preventDefault();

            Cookies.set('Accept_Cookies', 1, { expires: 365 });

            $div.delay(50).fadeOut(250);

        });
    }

}

function dropdown() {
    var $toggle = $('.js-toggle-dropdown');

    if ($toggle.length) {
        $toggle.click(function (e) {
            e.preventDefault();

            $toggle.toggleClass("toggled");

            $toggle.siblings(".js-dropdown").slideToggle(350);

        });
    }
}

var isMobile = function () {
    return Modernizr.mq('(max-width: 1025px)')
};
