/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function ($) {

    "use strict";

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */
    $(window).load(function () {

        // will first fade out the loading animation
        $("#loader").fadeOut("slow", function () {

            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        });

    })


    /*---------------------------------------------------- */
    /* FitText Settings
    ------------------------------------------------------ */
    setTimeout(function () {

        $('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

    }, 100);


    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */
    $(".fluid-video-wrapper").fitVids();


    /*---------------------------------------------------- */
    /* Owl Carousel
    ------------------------------------------------------ */
    $("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom: [
            [0, 1],
            [700, 2],
            [960, 3]
        ],
        navigationText: false
    });


    /*----------------------------------------------------- */
    /* Alert Boxes
        ------------------------------------------------------- */
    $('.alert-box').on('click', '.close', function () {
        $(this).parent().fadeOut(500);
    });


    /*----------------------------------------------------- */
    /* Stat Counter
        ------------------------------------------------------- */
    var statSection = $("#stats"),
        stats = $(".stat-count");

    statSection.waypoint({

        handler: function (direction) {

            if (direction === "down") {

                stats.each(function () {
                    var $this = $(this);

                    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });

            }

            // trigger once only
            this.destroy();

        },

        offset: "90%"

    });


    /*---------------------------------------------------- */
    /*	Masonry
    ------------------------------------------------------ */
    var containerProjects = $('#folio-wrapper');

    containerProjects.imagesLoaded(function () {

        containerProjects.masonry({
            itemSelector: '.folio-item',
            resize: true
        });

    });


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 300,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*-----------------------------------------------------*/
    /* Navigation Menu
------------------------------------------------------ */
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation'),
        topBar = $('.top-bar');

    // toggle button
    toggleButton.on('click', function () {
        const duration = 200;

        if (topBar.hasClass('expanded')) {
            nav.slideToggle(duration, function () {
                topBar.removeClass('expanded');
            });
        } else {
            topBar.addClass('expanded');
            nav.delay(duration).slideToggle(duration);
        }

        return false;
    });

    // nav items
    nav.find('li a').on("click", function () {
        nav.slideToggle({
            complete: function () {
                topBar.removeClass('expanded');
            }
        });
    });


    /*---------------------------------------------------- */
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------ */
    var sections = $("section"),
        navigation_links = $("#main-nav-wrap li a");

    sections.waypoint({

        handler: function (direction) {

            var active_section;

            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },

        offset: '25%'
    });



    /*----------------------------------------------------- */
    /* Back to top
------------------------------------------------------- */
    var pxShow = 300; // height on which the button will show
    var fadeInTime = 400; // how slow/fast you want the button to show
    var fadeOutTime = 400; // how slow/fast you want the button to hide
    var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    jQuery(window).scroll(function () {

        if (!($("#header-search").hasClass('is-visible'))) {

            if (jQuery(window).scrollTop() >= pxShow) {
                jQuery("#go-top").fadeIn(fadeInTime);
            } else {
                jQuery("#go-top").fadeOut(fadeOutTime);
            }

        }

    });

    $('.reveal').click(function() {
        const $self = $(this);
        const text = $self.text();
        const $hidden = $self.siblings('.hidden');
        const display = $self.data('display') || 'block';

        if ($self.hasClass('active')) {
            $self.removeClass('active');
            $self.text(text.replace('Less', 'More'));
            $hidden.slideUp();
        } else {
            $self.addClass('active');
            $self.text(text.replace('More', 'Less'));
            $hidden.slideDown({
                start: function() {
                  $(this).css('display', display);
                }
            });
        }

        return false;
    });
})(jQuery);
