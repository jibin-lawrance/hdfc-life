const knowtab = document.querySelectorAll('.know-tab');
const knowtabCont = document.querySelectorAll('.know-tab-content');

const arrKnowtab = Array.from(knowtab);
const arrKnowtabCont = Array.from(knowtabCont);

// Passive listner fix
jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
};

// lazy load
// const el = document.querySelector('img');
// const observer = lozad(el); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
// observer.observe();


/* Lozad START*/
const observer = lozad(); // lazy loads elements with default selector as ".lozad"
observer.observe();
/* Lozad END*/

// Search bar
$('#search-icon').click(function(){
    $('#search-input').animate({width: 'toggle'}).focus()
});

$('.know-tab').click(function(e) {
    knowtab.forEach(e => {
        e.className = e.className.replace("active","")
    })
    e.currentTarget.classList.add('active');

    knowtabCont.forEach(e => {
        e.className = e.className.replace("active","")
    })

    arrKnowtabCont[arrKnowtab.indexOf(e.currentTarget)].classList.add('active');

});


$('.calc-card__desc--icon').click(function(){
    $(this).toggleClass('active')
    $(this).next().find('p').slideToggle();
})

$('.know-more').click(function(){
    $(this).prev().toggle();
    $(this).text($(this).text() == 'Know More' ? 'Know Less':'Know More');
})

$(document).ready(function(){
    $('.slider-wrap').slick({
        arrows: false,
        dots: true
    });

    $('.plans-slides-wrap').slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
      });

    $('.about-card-slide-cont-1').slick({
        arrows: false,
        dots: true,
        autoplay: true
    });
    $('.about-card-slide-cont-2').slick({
        arrows: false,
        dots: true,
        autoplay: true
    });
    $('.about-card-slide-cont-3').slick({
        arrows: false,
        dots: true,
        autoplay: true
    });

    let $slickElement = $('.plans-btn-find');

    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        if(i == 1){
            $('.plans-show-more').find('span').text(2)
        } else if(i == 2){
            $('.plans-show-more').find('span').text(1)
        } else {
            $('.plans-show-more').find('span').text(0)
        } ;
    });

    // $('.plan-navigation-wrap').slick({
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     mobileFirst: true, 
    //     responsive: [
    //        {
    //           breakpoint: 480,
    //           settings: "unslick"
    //        }
    //     ]
    // });

    // $('.calc-card-wrap').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     mobileFirst: true, 
    //     responsive: [
    //        {
    //           breakpoint: 480,
    //           settings: "unslick"
    //        }
    //     ]
    // });

    // $('.about-card-slider-wrap').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: false,
    //     mobileFirst: true, 
    //     responsive: [
    //        {
    //           breakpoint: 480,
    //           settings: "unslick"
    //        }
    //     ]
    // });
});

$('.show-more-btn').click(function(){
    
    // Toggle content
    $(this).parent().prev().slideToggle('3000'); 

    // Rotate the icon
    $(this).find('img').toggleClass('up');

    // Toggle the text
    $(this).next().text( $(this).next().text() == 'Show more' ? 'Hide':'Show more' );
})

// nav hamburger
$('.menu-btn').click(function(){
    $(this).children().toggleClass('open');

    $('.top-nav').slideToggle();
    $('.bottom-nav').slideToggle();
});

// navigator share
function shareNav(){
    const share = document.querySelectorAll('.share-wrap');

    if(window.matchMedia("(max-width: 768px)").matches){
        // The viewport is less than 768 pixels wide
        
        share.forEach(element => {
            element.addEventListener('click', e => {
                $(e.target).prop('checked',false);
                // share navigator 
                if (navigator.share) {
                    navigator.share({

                        // Title that occurs over
                        // web share dialog
                        title: $(e.target).parent().parent().prev().find('h3').text(),

                        // URL to share
                        url: 'https://www.hdfc.com/blog/'
                    }).catch(err => {

                        // Handle errors, if occured
                        console.log(
                        "Error while using Web share API:");
                        console.log(err);
                    });
                } else {

                    // Alerts user if API not available 
                    console.log("Browser doesn't support this API !");
                }
            });
        }); 

    } else{
        // The viewport is at least 768 pixels wide
        
    }    
}

function slickMedia(){

    if(window.matchMedia("(max-width: 415px)").matches) {
        validateAdd('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false
        });
    } else {
        validateRemove('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick('unslick');        
    }

    if(window.matchMedia("(max-width: 480px)").matches) {
        
        validateAdd('.calc-card-wrap') && $('.calc-card-wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false
        });    

        validateAdd('.about-card-slider-wrap') && $('.about-card-slider-wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            adaptiveHeight: false
        });
        
        validateAdd('.insurance-slider-wrap') && $('.insurance-slider-wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false
        }); 
    
    } else {
        validateRemove('.calc-card-wrap') && $('.calc-card-wrap').slick('unslick');
        validateRemove('.about-card-slider-wrap') && $('.about-card-slider-wrap').slick('unslick');
        validateRemove('.insurance-slider-wrap') && $('.insurance-slider-wrap').slick('unslick');
    } 

    if(window.matchMedia("(max-width: 568px)").matches) {
        validateAdd('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false
        });
        validateAdd('.calc-card-wrap') && $('.calc-card-wrap').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false
        }); 
    } else {
        validateRemove('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick('unslick');
        validateRemove('.calc-card-wrap') && $('.calc-card-wrap').slick('unslick');
    }     

    if(window.matchMedia("(max-width: 668px)").matches) {
        $('.plans-slides-wrap').slick('unslick');
        $('.plans-slides-wrap').slick({
            dots: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
          });  
          
        validateAdd('.about-card-slider-wrap') && $('.about-card-slider-wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            adaptiveHeight: false
        }); 
        
        validateAdd('.insurance-slider-wrap') && $('.insurance-slider-wrap').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false
        });

    } else {
        validateRemove('.about-card-slider-wrap') && $('.about-card-slider-wrap').slick('unslick'); 
        validateRemove('.insurance-slider-wrap') && $('.insurance-slider-wrap').slick('unslick');
    } 

    if(window.matchMedia("(max-width: 736px)").matches) {
        validateAdd('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false
            });
    } else {
        validateRemove('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick('unslick');
    } 

    if(window.matchMedia("(max-width: 768px)").matches){
        validateAdd('.calc-card-wrap') && $('.calc-card-wrap').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false
        });  
        validateAdd('.insurance-slider-wrap') && $('.insurance-slider-wrap').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false
        }); 
    } else {
        validateRemove('.calc-card-wrap') && $('.calc-card-wrap').slick('unslick');
        validateRemove('.insurance-slider-wrap') && $('.insurance-slider-wrap').slick('unslick');
    }

    if(window.matchMedia("(max-width: 812px)").matches) {
        validateAdd('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: false
            });
    } else {
        validateRemove('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick('unslick');
    }    

    if(window.matchMedia("(max-width: 940px)").matches) {
        validateAdd('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: false
            });
    } else {
        validateRemove('.plan-navigation-wrap') && $('.plan-navigation-wrap').slick('unslick');
    }

    if(window.matchMedia("(max-width: 1024px)").matches) {
        validateAdd('.about-card-slider-wrap') && $('.about-card-slider-wrap').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            adaptiveHeight: false
        });        
    } else {
        validateRemove('.about-card-slider-wrap') && $('.about-card-slider-wrap').slick('unslick');        
    }
}

function validateAdd(element){
    return !$(element).hasClass('slick-slider');     
}

function validateRemove(element){
    return $(element).hasClass('slick-slider');     
}

$(document).ready(function(){
    shareNav();
    slickMedia();
});

$(window).resize(function(){
    shareNav();
    slickMedia();
});

$('#hero-img-carousel').slick({
    arrows: true,
    dots: false,
    infinite: true,
    cssEase: 'linear',
    autoplay: true
  });