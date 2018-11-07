$(function() {
	SetUpGridCols();
	SetUpGridCols2();
	availableModels();

	$(window).resize(function() {
		availableModels();
	})

	$("a.table-btn").click(function(e) {
		e.preventDefault();
		var text;
		$(this).closest(".row").find(".gradient-table").slideToggle();
		if($(this).closest(".row").find(".social.share-pdf.blue").hasClass("d-none")) {
			$(this).closest(".row").find(".social.share-pdf.blue").slideDown().removeClass("d-none");
		} else {
			$(this).closest(".row").find(".social.share-pdf.blue").slideUp().addClass("d-none");
		}
		if(!$(this).find("em,i").last().is(":visible")) {
			$(this).find("em,i").last().show();
			$(this).find("em,i").first().hide();
			text = strLess;
		} else {
			$(this).find("em,i").last().hide();
			$(this).find("em,i").first().show();
			text = strMore;
		}
		$(this).find("span").text(text);
	})

})

function SetUpGridCols() {
    $('.grid_col').matchHeight
    ({
        byRow: false,
        property: 'height',
        target: null,
        remove: false
    });
}

function SetUpGridCols2() {
    $('.grid_col2').matchHeight
    ({
        byRow: false,
        property: 'height',
        target: $('.swiper-slide'),
        remove: false
    });
}

function availableModels() {
	var width = $(window).width()+getScrollbarWidth();

	$(".available_models > div.model").click(function(e) {
		e.stopImmediatePropagation();
		if($(this).find(".popover").hasClass("opacity-1")) {
			$(this).find(".popover").removeClass("opacity-1");
		} else {
			$(this).find(".popover").addClass("opacity-1");
		}			
	})
}

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}