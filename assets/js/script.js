$(function() {

	SetUpGridCols();
	SetUpGridCols2();
	availableModels();
	validateForm();
	file();

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

function animateForm() {
	var headerHeight = $("header").height();
	$("html,body").animate({scrollTop: $(".personal-data-heading").offset().top - (headerHeight+30)},500);
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

function validateForm() {
	var formSubmit;
	var fileRequired;
	var validate;

	$(".cv-form input[type='file']").change(function() {
		if($(this).val() != "") {
			$(".cv-form input[type='file']").parent().children("span").remove();
		}
	})

	$(".cv-form button[type='submit']").click(function(e) {
		e.preventDefault();

		$(".cv-form input[data-required='true']").each(function() {
			if($(this).val() == "") {
				$(this).addClass("error");
				$(this).prev("label").addClass("error");			
				animateForm();
				formSubmit = false;
			} else {
				$(this).removeClass("error");
				$(this).prev("label").removeClass("error");	
				formSubmit = true;
			}
		})

		$(".cv-form input[email-required='true']").each(function() {
			if($(this).val() == "" || !validateEmail($(this).val())) {
				$(this).addClass("error");
				$(this).prev("label").addClass("error");
				animateForm();
				validate = false;
			} else {
				$(this).removeClass("error");
				$(this).prev("label").removeClass("error");	
				validate = true;
			}
		})

		$(".cv-form input[file-required='true']").each(function() {
			if($(this).val() == "") {
				$(this).parent().children("span").remove();
				$(this).parent().append("<span class='no-file'>Δεν επιλέχθηκε κανένα αρχείο.</span>");
				animateForm();
				fileRequired = false;
			} else {
				fileRequired = true;
			}
		})

		if(formSubmit == true && fileRequired == true && validate == true) {
			$(".cv-form").submit();
		}
	})
}

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

function file() {
	var inputs = document.querySelectorAll( '#cv' );
	Array.prototype.forEach.call( inputs, function( input )
	{
	    var label    = document.getElementById("labelfile"),
	        labelVal = label.innerHTML;

	    input.addEventListener( 'change', function( e )
	    {
	        var fileName = '';
	        if( this.files && this.files.length > 1 )
	            fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
	        else
	            fileName = e.target.value.split( '\\' ).pop();

	        if( fileName )
	            label.querySelector( 'span' ).innerHTML = fileName;
	        else
	            label.innerHTML = labelVal;
	    });
	});
}   