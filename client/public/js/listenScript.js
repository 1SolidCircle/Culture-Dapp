(function($) {
    "use strict";

    // Site navigation setup

    var header = $('.header'),
        pos = header.offset(),
        blockTop = $('.block-top');

    $(window).scroll(function() {
        if ($(this).scrollTop() > pos.top + 500 && header.hasClass('default')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('default').addClass('switched-header').fadeIn(200);
                blockTop.addClass('active');
            });
        } else if ($(this).scrollTop() <= pos.top + 500 && header.hasClass('switched-header')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('switched-header').addClass('default').fadeIn(100);
                blockTop.removeClass('active');
            });
        }
    });


    // Mobile menu

    var mobileBtn = $('.mobile-but');
    var nav = $('.main-nav ul.main-menu');
    var navHeight = nav.height();

    $(mobileBtn).on("click", function() {
        $(".toggle-mobile-but").toggleClass("active");
        nav.slideToggle();
        $('.main-nav li a').addClass('mobile');
        return false;


    });



    $(window).resize(function() {
        var w = $(window).width();
        if (w > 320 && nav.is(':hidden')) {
            nav.removeAttr('style');
            $('.main-nav li a').removeClass('mobile');
        }

    });


    //Search form setup

    var btn = $('.main-nav li span.search-ico');
    var searchForm = {

        container: $('.block-search-form'),


        config: {
            effect: 'slideToggle',
            speed: '300'
        },

        init: function(config) {

            $.extend(this.config, config);
            btn.on('click', this.show);

        },

        show: function() {


            var sf = searchForm,
                container = sf.container,
                config = sf.config;

            if (container.is(':hidden')) {

                searchForm.close.call(container);
                searchForm.container[config.effect](config.speed);

            }
        },

        close: function() {

            var $this = $(this);

            if ($this.find('span.search-close').length) return;

            document.onkeydown = function(e) {
                e = e || window.event;
                if (e.keyCode == 27) {

                    $this[searchForm.config.effect](searchForm.config.effect.speed);
                }
            };

            $('<span class=close-search></span>')
                .prependTo($this)
                .on('click', function() {
                    $this[searchForm.config.effect](searchForm.config.effect.speed);
                })
        }
    };

    searchForm.init({
        effect: 'fadeToggle',
        speed: '300'
    });


})(jQuery);