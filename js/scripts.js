(function($){

"use strict";

$(document).ready(function() {


	var win_h = $(window).height(),
		accent_color = $("footer .copyrights a").css('color');


	//Back-to-top Button
	$(window).scroll(function(e) {
	    
        if($(window).scrollTop() > 150){
	        $(".back-to-top").addClass('active');
	    }
	    else {
	    	$(".back-to-top").removeClass('active');
	    }
	});
	$(".back-to-top").click(function(event) {
		event.preventDefault();

		$(window).scrollTo(0, 1500, {easing:'easeOutExpo'});
	});


	// Flickr Widget
	$(".widget-flickr ul").jflickrfeed({
		limit: 6,
		qstrings: {
			id: '52617155@N08'
		},
		itemTemplate: 
		'<li>' +
			'<a href="{{image_b}}">' +
				'<img src="{{image_s}}" alt="{{title}}" />' +
				'<span class="overlay"></span>' +
			'</a>' +
		'</li>'
	});
	$(".widget-flickr a").fancybox({
	 
	    padding     : 0,
	    margin      : 100,
	    openEffect  : 'elastic',
	    closeEffect : 'elastic',
	    openSpeed   : 400,
	    closeSpeed  : 400,
	 
	    helpers : {
	        overlay : {
	            css : {
	                'background' : 'rgba(0, 0, 0, 0.75)'
	            }
	        }
	    }
	});


	//Videos
	$("body").fitVids();


	//Contact form
	$(".contact-form input[type=submit]").click(function(event) {
		event.preventDefault();

		var current_form = $(this).parent(),
			form_action  = current_form.attr('action');


		if(current_form.find("input:not([type=submit])").val() == "" || current_form.find("textarea").val() == "" ){
			

			current_form.find("input:not([type=submit]), textarea").each(function(index, el) {
				
				if ($(this).val() == "") {
					$(this).addClass('error');
				}
				else {
					$(this).removeClass('error');
				}
			});
		}
		else{

			current_form.find("input:not([type=submit]), textarea").each(function(index, el) {
				
				$(this).removeClass('error');
			});

			$.post(form_action, current_form.serialize(), function(data) {
				if(data == 'success'){

					current_form.find('.message-info').addClass('success').text('Message sent successfully.');
					current_form.find('.message-info').slideDown(400, 'easeOutExpo');

					current_form.find("input:not([type=submit])").val('');
					current_form.find("textarea").val('');
				}
				else{
					current_form.find('.message-info').addClass('fail').text('Message failed to send.');
					current_form.find('.message-info').slideDown(400, 'easeOutExpo');
				}

				setTimeout(function(){
					current_form.find('.message-info').slideUp(400, 'easeOutExpo');
				}, 3000);
			});
		}
	});


	//Twitter Widget
	$('.widget-twitter .tweets').tweetable({
	    username: 'envato',
	    rotate: false,
	    limit: 2,
	    replies: false,
	    position: 'append',
	    failed: "Sorry, twitter is currently unavailable.",
	    loading: "Loading tweets...",
	    html5: true,
	    time: true,
	 
	    onComplete:function($ul){
	        $('time.timeago').timeago();
	    }
	});


	//Price-Filter Widget
	$(".widget-pricefilter .price-slider").slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 20, 300 ],
		slide: function( event, ui ) {

			var slider_class = String(event.target.className),
				slider_new_class = slider_class.replace(/\s+/g, ".").replace("price-slider", ".price-slider"),
				slider_parent = $(slider_new_class).parent();

			slider_parent.find('.min-price').text(ui.values[0]);
			slider_parent.find('.max-price').text(ui.values[1]);
		}
    });
    $(".widget-pricefilter").each(function(index, el) {
    	
    	var price_slider = $(this).find('.price-slider');

    	$(this).find('.min-price').text(price_slider.slider( "values", 0 ));
		$(this).find('.max-price').text(price_slider.slider( "values", 1 ));
    });


    //Shop Product Detail & Shop Cart -> "Product Quantity"
    $(".product-single .cart .minus, .shop-cart .product-quantity .minus").click(function(event) {
    	
    	var quantity = parseInt($(this).next().val());

    	if(isNaN(quantity) || quantity < 1) {
    		quantity = 1;
    	}
    	quantity--;
    	$(this).next().val(quantity);
    });
    $(".product-single .cart .plus, .shop-cart .product-quantity .plus").click(function(event) {
    	
    	var quantity = parseInt($(this).prev().val());

    	if(isNaN(quantity) || quantity < 0) {
    		quantity = 0;
    	}
    	quantity++;
    	$(this).prev().val(quantity);
    });


    //Fancybox images
    $(".fancybox-image").fancybox({
	 
	    padding     : 0,
	    margin      : 100,
	    openEffect  : 'elastic',
	    closeEffect : 'elastic',
	    openSpeed   : 400,
	    closeSpeed  : 400,
	 
	    helpers : {
	        overlay : {
	            css : {
	                'background' : 'rgba(0, 0, 0, 0.75)'
	            }
	        }
	    }
	});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Color Switcher
============================================================================================================================================
============================================================================================================================================*/

	$(".color-switcher .panel-handle").click(function(event) {
	    event.preventDefault();

	    $(this).parent().toggleClass('visible');
	});

	$(".color-switcher .color-pallets a").click(function(event) {
	    event.preventDefault();

	    var style_color = $(this).attr('data-color');
	    var wanted_color = "style-" + style_color;

	    $(".color-switcher .color-pallets a").removeClass('current');
	    $(this).addClass('current');

	    $("#"+wanted_color).remove();
	    $("#main-style").before('<link id="'+wanted_color+'" type="text/css" rel="stylesheet" href="css/color-'+style_color+'.css">');
	});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Animation
============================================================================================================================================
============================================================================================================================================*/

	$("body").imagesLoaded(function(){

		$('.animated').each(function(index, el) {
			
			var current = $(this);

			current.appear();

			current.on('appear', function() {
			 
			    var animation = current.attr('data-animation');
			    if ( !current.hasClass('visible') ) {

			        var animationDelay = current.attr('data-animation-delay');
			        if ( animationDelay ) {

			            setTimeout(function(){
			                current.addClass( animation + " visible" );
			            }, animationDelay);

			        } 
			        else {
			            current.addClass( animation + " visible" );
			        }
			    }
			});

			if(current.is(':appeared') && !current.hasClass('visible')) {
			    
			    var animation = current.attr('data-animation');
		        var animationDelay = current.attr('data-animation-delay');

		        if ( animationDelay ) {

		            setTimeout(function(){
		                current.addClass( animation + " visible" );
		            }, animationDelay);

		        } 
		        else {
		            current.addClass( animation + " visible" );
		        }
			}
		});
	});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Menu
============================================================================================================================================
============================================================================================================================================*/

	//Dropdown effect
	$("header nav li").hover(function() {
	 
	    if ( $(this).children('ul').length > 0 && !$(this).parent().parent().hasClass('mega-menu') && !$(".mobile-navigation").is(':visible') ) {
	        $(this).find('> ul').fadeIn(300);
	    }
	 
		}, function() {
	 
	    if ( $(this).children('ul').length > 0 && !$(this).parent().parent().hasClass('mega-menu') && !$(".mobile-navigation").is(':visible') ) {
	        $(this).find('> ul').stop().fadeOut(300);
	    }
	});

	// Enabling Sticky Menu.
	$(window).scroll(function(e) {
	    var window_top_offset = $(window).scrollTop();
	    
        if($("header .header-container").offset().top <= 150){
	        $("header").removeClass('sticky');
	    }
	    else {
	        $("header").addClass('sticky');
	    }
	});

	//Unfolding sub-menus in responsive mode.
	$("header nav li a .arrow-down").click(function(event) {
	 	
	 	event.preventDefault();

	 	var anchor = $(this).parent();

		anchor.unbind('click');

	    //Check if it has sub menus
	    if ( anchor.parent().children('ul').length > 0 && $(".mobile-navigation").is(':visible') ) {
	 
	        anchor.parent().find('> ul').slideToggle(300);
	    }
	});

	//Mobile navigation
	$(".mobile-navigation").click(function(event) {
	     
	    event.preventDefault();
	 
	    $("header nav").slideToggle(100);
	});
	 
	//Search button
	$(".top-bar .header-search").click(function(event) {
	    event.preventDefault();
	 
	    $(".top-bar .header-search-form").stop().fadeToggle(300);
	    $(".header-search-form form input").focus();
	});

	//Search Close
	$(".top-bar .header-search-form .close").click(function(event) {
	    event.preventDefault();
	 
	    $(".top-bar .header-search-form").stop().fadeToggle(300);
	});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Sliders
============================================================================================================================================
============================================================================================================================================*/
	

	//Home layout 1,2,3,5,7 Slider
	$('.slideshow-container.style-1 .slideshow-inner').revolution({

		delay:8000,
		startwidth:1170,
		startheight:460,
		keyboardNavigation:"on",
		onHoverStop:"off",
		hideTimerBar:"on",
		fullWidth:"on",
		autoHeight:"off",
		forceFullWidth:"off",
		shadow:0,
		hideThumbs:100,

		navigationType:"none",
		navigationArrows:"solo",

		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"center",
		soloArrowLeftHOffset:20,
		soloArrowRightHalign:"right",
		soloArrowRightValign:"center",
		soloArrowRightHOffset:20,
	});

	//Home layout 8 Slider
	$('.slideshow-container.style-2 .slideshow-inner').revolution({

		delay:8000,
		startwidth:1170,
		startheight:460,
		keyboardNavigation:"on",
		onHoverStop:"off",
		hideTimerBar:"on",
		fullWidth:"off",
		autoHeight:"off",
		forceFullWidth:"off",
		shadow:0,
		hideThumbs:100,

		navigationType:"none",
		navigationArrows:"solo",

		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"center",
		soloArrowLeftHOffset:20,
		soloArrowRightHalign:"right",
		soloArrowRightValign:"center",
		soloArrowRightHOffset:20,
	});

	//Home layout 6,12 Slider
	var slideshow3 = $('.slideshow-container.style-3 .slideshow-inner').revolution({

		delay:8000,
		startwidth:1170,
		startheight:700,
		keyboardNavigation:"on",
		onHoverStop:"off",
		hideTimerBar:"on",
		fullWidth:"on",
		autoHeight:"off",
		forceFullWidth:"off",
		shadow:0,
		hideThumbs:100,

		navigationType:"none",
		navigationArrows:"solo",

		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"center",
		soloArrowLeftHOffset:20,
		soloArrowRightHalign:"right",
		soloArrowRightValign:"center",
		soloArrowRightHOffset:20,
	});

	//Home layout 6,12 Slider "Video Button"
	$("#slideshow3-video").click(function(event) {

		event.preventDefault();

		slideshow3.revpause();

		$.fancybox({
	    	openEffect	: 'elastic',
	    	closeEffect	: 'elastic',
	    	padding 	: 0,
			type 		: 'iframe',
			href 		: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),

	    	helpers : {
		        overlay : {
		            css : {
		                'background' : 'rgba(0, 0, 0, 0.9)'
		            }
		        }
		    },

		    afterClose: function() {
		    	slideshow3.revresume();
		    }
		});
	});

	//Home layout 4 Slider "Backgrounds Slider"
	$('.slideshow-container-2 .basic-slider').flexslider({
	 
	    animation: "fade",
		directionNav: false,
		controlNav: false,
		slideshow: true,
		slideshowSpeed: 5000,
	    animationSpeed: 800, 
		initDelay: 0,
		touch: true,
		video: true,

		start: function(slider) {

	      	$('.slideshow-container-2 .text-slider .flexslider .flex-control-nav a').click(function(event) {
			
				var wanted_slide = parseInt($(this).text()) - 1;

				slider.flexAnimate(wanted_slide, true);
			});
	    }
	});

	//Home layout 4 Slider "Text Slider"
	$('.slideshow-container-2 .text-slider .flexslider').flexslider({
	 
	    animation: "fade",
		directionNav: false,
		controlNav: true,
		slideshow: true,
		slideshowSpeed: 5000,
	    animationSpeed: 800, 
		initDelay: 0,
		touch: true,
	});



	//Shop Home Slider
	$('.slideshow-container.style-4 .slideshow-inner').revolution({

		delay:8000,
		startwidth:1170,
		startheight:552,
		keyboardNavigation:"on",
		onHoverStop:"off",
		hideTimerBar:"on",
		fullWidth:"on",
		autoHeight:"off",
		forceFullWidth:"off",
		shadow:0,
		hideThumbs:100,

		navigationType:"none",
		navigationArrows:"solo",

		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"center",
		soloArrowLeftHOffset:20,
		soloArrowRightHalign:"right",
		soloArrowRightValign:"center",
		soloArrowRightHOffset:20,
	});

	//Shop Product Detail Slider
	$(".product-single .product-media #product-img-nav").flexslider({
	  
		animation: "slide",
		directionNav: false,
		controlNav: false,
		animationLoop: true,
		slideshow: false,
		itemWidth: 70,
		itemMargin: 30,
		asNavFor: '#product-img-slider'
	});
	$(".product-single .product-media #product-img-slider").flexslider({
	  	
	  	prevText: "",
	  	nextText: "",
		animation: "slide",
		controlNav: false,
		smoothHeight: true,
		animationLoop: true,
		slideshow: false,
		sync: "#product-img-nav",
	});



	//Testimonials Slider
	$(".testimonials-slider .owl-carousel").owlCarousel({
	  
	    navigation: false,
	    singleItem: true,
	    scrollPerPage: 1
	});

	//Testimonials Slider 2
	$('.testimonials-slider-2 .flexslider').flexslider({
	 
	    controlNav: "thumbnails",
	    directionNav: false,
	    animation: "slide",
	});

	//Testimonials Slider 3
	$('.testimonials-slider-3 .flexslider').flexslider({
	 
	    controlNav: "thumbnails",
	    directionNav: false,
	    animation: "slide",
	});
	$('.testimonials-slider-3').each(function(index, el) {
		
		var slider = $(this);

		slider.imagesLoaded(function(){

			var padding_top = slider.find('.flex-control-thumbs').height() + 30;

			slider.find('.flexslider').css('padding-top', padding_top+'px');
		});
	});
	$(window).resize(function(event) {
		
		$('.testimonials-slider-3').each(function(index, el) {
			
			var slider = $(this);

			slider.imagesLoaded(function(){

				var padding_top = slider.find('.flex-control-thumbs').height() + 30;

				slider.find('.flexslider').css('padding-top', padding_top+'px');
			});
		});
	});



	//Blog Posts Slider
	$(".posts-slider .owl-carousel").owlCarousel({
	  
	    items : 4,
	    navigation: false,
	    scrollPerPage: 1,
	    slideSpeed: 500,
		itemsDesktop : [1230,2],
	    itemsDesktopSmall : false,
	    itemsTablet: [690,1],
	    itemsMobile: false
	});

	//Blog Gallery Post
	$(".posts-container-mini .post-media .flexslider, .post-single .flexslider").flexslider({
	  
	    prevText: "",
	    nextText: "",
	    slideshow: true,
	    slideshowSpeed: 4000,
	    animationSpeed: 600,
	    controlNav: false,
	    directionNav: true,
	});

	

	
	//Projects Slider 1 "Full Width - One project per slide"
	$('.projects-slider-1 .flexslider').flexslider({
	 
	    animation: "slide",
		directionNav: false,
		controlNav: false,
		slideshow: false,
	    animationSpeed: 800, 
		initDelay: 0,
		touch: true,
		video: true,

		start: function(slider) {


	      	$('.projects-slider-1 .arrow-left').click(function(event) {

	      		event.preventDefault();
			
				slider.flexAnimate(slider.getTarget("prev"), true);
			});
	      	$('.projects-slider-1 .arrow-right').click(function(event) {
			
	      		event.preventDefault();

				slider.flexAnimate(slider.getTarget("next"), true);
			});
	    }
	});

	//Projects Slider 2 "Carousel & Masonry Slider"
	function codesymbol_projectsSlider2Init(window_width, category_filter) {

		var is_project_selected = null,
			selected_project = null,
			projects_container = $(".projects-slider-2 .projects-container"),
			projects_count = $(".projects-slider-2 .projects .project").length,
			visible_projects = 0,
			visible_projects_width = 0,
			project_container_left = 0,
			project_width = $(".projects-slider-2 .projects .project").width(),
			window_width,
			category_filter,
			project_sliding = "no";

		$(".projects-slider-2 .arrow_left, .projects-slider-2 .arrow_right").removeClass('useless');
		$(".projects-slider-2 .projects .project").attr('data-current', null);
		$(".projects-slider-2 .projects .project.current").removeClass('current');
		if(!category_filter) {
			category_filter = "";
		}
		visible_projects = $(".projects-slider-2 .projects .project"+category_filter+"").length;

		$(".projects-slider-2 .projects-container").width(projects_count * project_width);
		

		if($(".projects-slider-2 .projects .project.selected").is(':visible')) {
			is_project_selected = "yes";
			selected_project = $(".projects-slider-2 .projects .project.selected").index() + 0.5;
			project_container_left = (window_width/2) - (selected_project * project_width);
			projects_container.css('left', project_container_left+'px');
			var project_position = $(".projects-slider-2 .projects .project.selected").index();
			$(".projects-slider-2 .projects .project.selected").attr('data-current', project_position);
		}
		else {
			project_container_left = (window_width/2) - (0.5 * project_width);
			projects_container.css('left', project_container_left+'px');
			$(".projects-slider-2 .projects .project"+category_filter+":eq(0)").addClass('selected').attr('data-current', 0);
			$(".projects-slider-2 .arrow_left").addClass('useless');
		}


		if(visible_projects == 0 || visible_projects == 1) {
			$(".projects-slider-2 .arrow_right, .projects-slider-2 .arrow_left").addClass('useless');
		}
		else if(visible_projects == 2 && $(".projects-slider-2 .projects .project"+category_filter+":eq(0)").hasClass('selected')) {
			$(".projects-slider-2 .arrow_left").addClass('useless');
		}
		else if(visible_projects == 2 && $(".projects-slider-2 .projects .project"+category_filter+":eq(1)").hasClass('selected')) {
			$(".projects-slider-2 .arrow_right").addClass('useless');
		}
		else if($(".projects-slider-2 .projects .project"+category_filter+":eq("+(visible_projects-1)+")").hasClass('selected')) {
			$(".projects-slider-2 .arrow_right").addClass('useless');
		}

		
		$(".projects-slider-2 .arrow_left, .projects-slider-2 .arrow_right").unbind('click');


		$(".projects-slider-2 .arrow_left, .projects-slider-2 .arrow_right").click(function(event) {
			event.preventDefault();

			if(project_sliding == "no" && !$(this).hasClass('useless')) {

				project_sliding = "yes";
				var sliding_direction,
					wanted_project = null,
					project_track = null;

				if($(this).hasClass('arrow_left')) {

					sliding_direction = 1;
					project_track = parseInt($(".projects-slider-2 .projects .project.selected").attr('data-current')) - 1;
					wanted_project = $(".projects-slider-2 .projects .project"+category_filter+":eq("+project_track+")");
					$(".projects-slider-2 .projects .project.selected").removeClass('selected');
					wanted_project.addClass('selected').attr('data-current', project_track);
					if($(".projects-slider-2 .projects .project"+category_filter+":eq(0)").hasClass('selected')) {
						$(".projects-slider-2 .arrow_left").addClass('useless');
					}
					$(".projects-slider-2 .arrow_right").removeClass('useless');
				}
				else if($(this).hasClass('arrow_right')) {

					sliding_direction = -1;
					project_track = parseInt($(".projects-slider-2 .projects .project.selected").attr('data-current')) + 1;
					wanted_project = $(".projects-slider-2 .projects .project"+category_filter+":eq("+project_track+")");
					$(".projects-slider-2 .projects .project.selected").removeClass('selected');
					wanted_project.addClass('selected').attr('data-current', project_track);
					if($(".projects-slider-2 .projects .project"+category_filter+":eq("+(visible_projects-1)+")").hasClass('selected')) {
						$(".projects-slider-2 .arrow_right").addClass('useless');
					}
					$(".projects-slider-2 .arrow_left").removeClass('useless');
				}

				
				projects_container.css('left', "+="+(sliding_direction * project_width)+'px');
				

				setTimeout(function() {
					project_sliding = "no";
				},300);
			}
		});
	}
	if($(".projects-slider-2").is(':visible')) {

		$('body').imagesLoaded(function() {

			codesymbol_projectsSlider2Init($(window).width(), false);

			if($(".projects-slider-2 .categories").is(':visible')) {
				$(".projects-slider-2 .projects-container").isotope({ layoutMode:'fitRows' });
			}

			$(".projects-slider-2 .categories a").click(function(e) {
		        e.preventDefault();
				
				$(".projects-slider-2 .projects .project.selected").removeClass('selected');
				$(".projects-slider-2 .categories a.selected").removeClass('selected');
				$(this).addClass('selected');
				var selector = $(this).attr('data-filter');
				$(".projects-slider-2 .projects-container").isotope({ filter: selector,layoutMode:'fitRows' });
				codesymbol_projectsSlider2Init($(window).width(), selector);
		    });
		});

		$(window).resize(function(event) {

			if($(".projects-slider-2").is(':visible')) {

				var active_filter = $(".projects-slider-2 .categories a.selected").attr('data-filter');
				codesymbol_projectsSlider2Init($(window).width(), active_filter);

				//just in case
				setTimeout(function() {

					$(".projects-slider-2 .projects-container").isotope({ layoutMode:'fitRows' });
					codesymbol_projectsSlider2Init($(window).width(), active_filter);
				}, 310);
			}
		});
	}

	//Projects Slider 3
	if($(".projects-slider-3").is(':visible')) {

		$(".projects-slider-3 .filter-links a").click(function(event) {
		    event.preventDefault();
		  	
		  	$(this).parent().find('.active').removeClass('active');
		  	$(this).addClass('active');
		    var selector = $(this).attr('data-filter');
		    $(this).parent().next().isotope({ filter: selector });
		});

		$('body').imagesLoaded(function() {

			$(".projects-slider-3 .projects-container").isotope();

			if($(".projects-slider-3").hasClass('style-3')) {

				portfolio_reLayout();
				$(window).resize(function(event) {
					
					portfolio_reLayout();
				});
			}
		});
	}
	function portfolio_reLayout() {

		var colWidth,
			containerWidth = $(".content-inner").width();

		if(containerWidth > 570) {
			colWidth = 6;
		}
		else if(containerWidth > 300) {
			colWidth = 2;
		}
		else {
			colWidth = 1;
		}

		colWidth = containerWidth / parseInt(colWidth);

		//sizing for large items
		var tallColHeight = $('.projects-slider-3 article[class*="regular"]:first img').height();
		var multipler = (containerWidth > 300) ? 2 : 1 ;
		$('.projects-slider-3 article[class*="tall"] img').css('height',(tallColHeight*multipler + 2));

		$(".projects-slider-3 .projects-container").isotope({
		   masonry: { columnWidth: colWidth }
		});
	}



/*==========================================================================================================================================
/*==========================================================================================================================================
	Shortcodes
============================================================================================================================================
============================================================================================================================================*/
	
	//Font Icons
	$(".fonticons-set a").each(function(index, el) {
	         
	    $(this).attr('title', $(this).attr('class'));
	});
	$(".fonticons-set a").tooltipster({
	 
	    fixedWidth: 120
	});


	//Tabs "Horizontal"
	$(".tabs-1 .tabs-container").tabs({
	    hide: 200,
	    show: 500
	});

	//Tabs Vertical
	$( ".tabs-2 .tabs-container" ).tabs({
	    hide: 200,
	    show: 500
	}).addClass( "ui-tabs-vertical ui-helper-clearfix" );
	$( ".tabs-2 .tabs-container li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );


	//Accordions
	$(".accordion-1 .accordion-container").accordion({
	    heightStyle: "content",
	    icons: { "header": "icon2-plus", "activeHeader": "icon2-minus" },
	    animate: 200,
	    header: "h3",
		autoHeight: true
	});


	//Toggles
	$(".toggle-1 .accordion-container").accordion({
	    heightStyle: "content",
	    icons: { "header": "icon2-plus", "activeHeader": "icon2-minus" },
	    animate: 200,
	    header: "> div > h3",
		autoHeight: true,
		collapsible: true,

		beforeActivate: function(event, ui) {

	        if (ui.newHeader[0]) {
	            var currHeader  = ui.newHeader;
	            var currContent = currHeader.next('.ui-accordion-content');
	        } 
	        else {
	            var currHeader  = ui.oldHeader;
	            var currContent = currHeader.next('.ui-accordion-content');
	        }

	        var isPanelSelected = currHeader.attr('aria-selected') == 'true';
	 

	        currHeader.toggleClass('ui-corner-all',isPanelSelected)
	        		  .toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
	 

	        currHeader.children('.ui-icon').toggleClass('icon2-plus',isPanelSelected).toggleClass('icon2-minus',!isPanelSelected);
	 

	        currContent.toggleClass('accordion-content-active',!isPanelSelected)   
	        if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
	 
	        return false;
	    }
	});


	//Charts Counter
	$('.counter-chart .counter').easyPieChart({
	  
	    lineWidth   : 12,
	    rotate      : 180,
	    size        : 180,
	    animate     : 4000,
	    scaleColor  : false,
	    lineCap     : 'square',
	    trackColor  : '#d5d5d5',
	    easing      : 'easeOutExpo',
	    barColor    : accent_color,
	  
	    onStep: function(from, to, percent) {
	        $(this.el).find('span').text(Math.round(percent));
	    }
	});
	$('.counter-chart .counter').each(function(index, el) {
	      
	    $(this).appear();

	    var counter = $(this);

	    $('body').imagesLoaded(function() {

			if(counter.is(':appeared') && !counter.hasClass('done')) {
		          
		        var wanted_percent = parseInt(counter.attr('data-animate-percent'));
		        counter.data('easyPieChart').update(wanted_percent);
		  
		        counter.addClass('done');
		    }
		  
		    counter.on('appear', function() {
		  
		        if(!counter.hasClass('done')) {
		              
		            var wanted_percent = parseInt(counter.attr('data-animate-percent'));
		            counter.data('easyPieChart').update(wanted_percent);
		  
		            counter.addClass('done');
		        }
		    });
		});
	});


	//Bars Counter
	$(".counter-bar").each(function(index, el) {

		$(this).appear();

		if($(this).is(':appeared') && !$(this).hasClass('done')) {

			var wanted_perc = $(this).find(".bar").attr('data-percentage');
			$(this).find(".bar span").animate({width: (wanted_perc+'%')}, 2800, 'easeOutExpo');
	  
	        $(this).addClass('done');
		}

		$(this).on('appear', function() {
	  
	        if(!$(this).hasClass('done')) {
		  
		        $(this).each(function(){ 

					var wanted_perc = $(this).find(".bar").attr('data-percentage');
					$(this).find(".bar span").animate({width: (wanted_perc+'%')}, 2800, 'easeOutExpo');
				});
	  
	            $(this).addClass('done');
	        }
	    });
	});


	//Numbers Counter
	$(".counter-number").each(function(index, el) {
		
		var wanted_number = parseInt($(this).text()),
			counter = $(this);

		counter.find('.number').text(' ');
		counter.appear();
		
		$('body').imagesLoaded(function() {

			counter.on('appear', function(event, $all_appeared_elements) {
			  
			    if(!counter.hasClass('done')) {
			  
			        counter.addClass('done');
			        counter.find('.number').countTo({

			        	from: 0,
					    to: wanted_number,
					    speed: 2500,
					    refreshInterval: 50,
			        });
			    }
			});
			   
			if(counter.is(':appeared')) {
			  
			    if(!counter.hasClass('done')) {
			  
			        counter.addClass('done');
			        counter.find('.number').countTo({

			        	from: 0,
					    to: wanted_number,
					    speed: 2500,
					    refreshInterval: 50,
			        });
			    }
			}
		});
	});
	

	//Maps
	$("#map-1").gMap({
	   
	    address: "London, UK",
	    zoom: 15,
	    scrollwheel: true,
	    maptype: 'ROADMAP', //'HYBRID', 'SATELLITE', 'ROADMAP' or 'TERRAIN'
	   
	    controls: {
	           panControl: true,
	           zoomControl: true,
	           mapTypeControl: false,
	           scaleControl: false,
	           streetViewControl: true,
	           overviewMapControl: false
	    },
	    markers: [
	        {
	            address: "London, UK"
	        }
	    ]
	});


	//Videos "Fancybox video"
	$(".video-promo").click(function(event) {

		event.preventDefault();


		$.fancybox({
	    	openEffect	: 'elastic',
	    	closeEffect	: 'elastic',
	    	padding 	: 0,
			type 		: 'iframe',
			href 		: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),

	    	helpers : {
		        overlay : {
		            css : {
		                'background' : 'rgba(0, 0, 0, 0.9)'
		            }
		        }
		    }
		});
	});


	//Count-Down Counter
	$('.countdown-counter').each(function(index, el) {

		var countdownInstance 	= $(this),
			year 				= ($(this).attr('data-year'))? parseInt($(this).attr('data-year')) : 0,
			month 				= ($(this).attr('data-month'))? parseInt($(this).attr('data-month')) - 1 : 0,
			day 				= ($(this).attr('data-day'))? parseInt($(this).attr('data-day')) : 0,
			hour 				= ($(this).attr('data-hour'))? parseInt($(this).attr('data-hour')) : 0,
			minute 				= ($(this).attr('data-minute'))? parseInt($(this).attr('data-minute')) : 0,
			second 				= ($(this).attr('data-second'))? parseInt($(this).attr('data-second')) : 0,
			date 				= new Date(year, month, day, hour, minute, second);

		$(this).countdown({

			until: date,
			format: 'odHMS',
			onExpiry: function() {
				setTimeout(function() {
					countdownInstance.fadeOut(500);						
				}, 1000);
			}
		});
	});



});


})(jQuery);