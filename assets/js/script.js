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
	$("html,body").stop().animate({scrollTop: $(".personal-data-heading").offset().top - (headerHeight+30)},500);
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

function validateForm() {
	var formSubmit, fileRequired, validate, grecaptchaValidate;

	$(".cv-form input[type='file']").change(function() {

		$(this).parent().children("span").remove();
		var fileExtension = ['doc', 'docx', 'pdf'];
		var f = this.files[0];

		if($(this).val() != "" && $.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
			 $(this).parent().append("<span class='file-error'>Επιτρεπόμενες μορφές: doc, docx, pdf</span>");
		} else if($(this).val() != "" && f.size>2000000) {
			$(this).parent().append("<span class='file-error'>Μέγιστο επιτρεπόμενο μέγεθος: 2ΜΒ</span>");
		} else if($(this).val() == "") {
			$(this).parent().append("<span class='file-error'>Δεν επιλέχθηκε κανένα αρχείο.</span>");
		}
	}) 

	$(".cv-form a.cv-submit-btn").click(function(e) {
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

			$(this).parent().children("span").remove();
			var fileExtension = ['doc', 'docx', 'pdf'];			
			var f = this.files[0];

			if($(this).val() == "") {	
				$(this).parent().append("<span class='file-error'>Δεν επιλέχθηκε κανένα αρχείο.</span>");
				animateForm();
				fileRequired = false;
			} else if($(this).val() != "" && f.size>2000000) {
				$(this).parent().append("<span class='file-error'>Μέγιστο επιτρεπόμενο μέγεθος: 2ΜΒ</span>");
				animateForm();
				fileRequired = false;
			} else if($(this).val() != "" && $.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
			 	$(this).parent().append("<span class='file-error'>Επιτρεπόμενες μορφές: doc, docx, pdf</span>");
			 	animateForm();
				fileRequired = false;
			} else {
				fileRequired = true;
			}
		})

		if(grecaptcha.getResponse() == "") {
			$(".g-recaptcha").addClass("error");
		    grecaptchaValidate = false;
		} else {
			$(".g-recaptcha").removeClass("error");
			grecaptchaValidate = true;
		} 

		if(formSubmit == true && fileRequired == true && validate == true && grecaptchaValidate == true) {
			console.log("form submit");
            SendCV();
   			//$(".cv-form").submit();
		}
	})

	$("#ed-level-1-btn").click(function(e) {

		e.preventDefault();

		$(this).parent().addClass("d-none");
		$("#ed-level-1").removeClass("d-none");

	})

	$("#ed-level-2-btn").click(function(e) {

		e.preventDefault();

		$(this).parent().addClass("d-none");
		$("#ed-level-2").removeClass("d-none");
		
	})

	$("#master-1-btn").click(function(e) {

		e.preventDefault();

		$(this).parent().addClass("d-none");
		$("#master-1").removeClass("d-none");
		
	})

	$("#job-1-btn").click(function(e) {

		e.preventDefault();

		$(this).parent().addClass("d-none");
		$("#job-1").removeClass("d-none");
		
	})

	$("#job-2-btn").click(function(e) {

		e.preventDefault();

		$(this).parent().addClass("d-none");
		$("#job-2").removeClass("d-none");
		
	})

	$("#birthday").datepicker({
		changeMonth: true,
    	changeYear: true,
    	yearRange: "-100:+0",
		maxDate: "0",
    	dateFormat: "dd/mm/yy", 
	});

    $( "#edlevdatefrom0" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy", 	
    });

    $( "#edlevdateto0").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#edlevdatefrom0').datepicker('getDate');
            $('#edlevdateto0').datepicker('option', 'minDate', date2);
        }
    });

    $( "#edlevdatefrom1" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    });

    $( "#edlevdateto1").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#edlevdatefrom1').datepicker('getDate');
            $('#edlevdateto1').datepicker('option', 'minDate', date2);
        }
    });

    $( "#edlevdatefrom2" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    });

    $( "#edlevdateto2").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#edlevdatefrom2').datepicker('getDate');
            $('#edlevdateto2').datepicker('option', 'minDate', date2);
        }
    });

    $( "#masterdatefrom0" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",	
    });

    $( "#masterdateuntil0").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#masterdatefrom0').datepicker('getDate');
            $('#masterdateuntil0').datepicker('option', 'minDate', date2);
        }
    });

    $( "#masterdatefrom1" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",	
    });

    $( "#masterdateuntil1").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#masterdatefrom1').datepicker('getDate');
            $('#masterdateuntil1').datepicker('option', 'minDate', date2);
        }
    });

    $( "#jobdatefrom0" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",	
    });

    $( "#jobdateto0").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#jobdatefrom').datepicker('getDate');
            $('#jobdateto').datepicker('option', 'minDate', date2);
        }
    });

    $( "#jobdatefrom1" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",	
    });

    $( "#jobdateto1").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#jobdatefrom1').datepicker('getDate');
            $('#jobdateto1').datepicker('option', 'minDate', date2);
        }
    });

    $( "#jobdatefrom2" ).datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    });

    $( "#jobdateto2").datepicker({
    	maxDate: "0",
    	dateFormat: "dd/mm/yy",
    	beforeShow: function (date) {
            var date2 = $('#jobdatefrom2').datepicker('getDate');
            $('#jobdateto2').datepicker('option', 'minDate', date2);
        }
    });
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