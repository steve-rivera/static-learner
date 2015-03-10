
$( function () {

  $('.outline a').click( function() {
    sectionName = $(this).attr('rel');
    scrollTo = $('a.js-page-marker-top[rel="' + sectionName + '"]' );
    $('html, body').animate({
      scrollTop: scrollTo.offset().top - 119
    }, 850, 'easeInOutQuint');
  });

  $('.js-stick').waypoint( function(direction) {
    $('.js-stick').toggleClass('is-stuck');
  }, {
    offset: 120
  });

  $('.js-page-marker-top').waypoint( function(direction) {
    currentSection = $(this.element).attr('rel');
    currentLabel = $('.js-section-label span.current').html();
    
    if (currentSection != currentLabel) { 
      if (direction == 'down') {
        markOutline(currentSection);
        setUpLabel(currentSection);
      }
    }
  }, {
    offset: 120
  });

  $('.js-page-marker-bottom').waypoint( function(direction) {
    currentSection = $(this.element).attr('rel');
    currentLabel = $('.js-section-label span.current').html();

    if (currentSection != currentLabel) { 
      if (direction == 'up') {
        markOutline(currentSection);
        setDownLabel(currentSection);
      }
    }
  }, {
    offset: 120
  });

  $('.js-track-progress').waypoint( function(direction) {

    if ( direction == 'down') {
      section = $(this.element);
    } else {
      section = $(this.element).prev('.js-track-progress');
    }

    if ( section.height() != null ) {

      sectionTop = section.position().top;
      sectionHeight = section.height();

      $(window).scroll( function() {

        currentPoint = $(this).scrollTop();
        
        progress = 0;

        if ( currentPoint >= sectionTop ) {
          progress = (currentPoint - sectionTop) / sectionHeight * 100;
        } else {
          progress = 0;
        }

        $('.js-progress-bar').css('width', progress + '%');
      });
    }
  }, {
    offset: 120
  });



  $('.js-expand').click( function() {
    $(this).parent().toggleClass('is-expanded');
    $(this).parent().next('ul').slideToggle(500, 'easeInOutQuint');  
  });

  $('.js-expand').first().click();

  var time = 80;
  $('.outline__row').each( function(i) {

    setTimeout( function(){ 
      $('.outline__row').eq(i).addClass('visible');
    }, time);

    time += 80;
  });


});

var markOutline = function(section) {
  $('.outline__row').removeClass('is-active');
  $('.outline a[rel="' + section + '"]').parent('.outline__row').addClass('is-active');
}

var setUpLabel = function(section) {
  $('.js-section-label span.next').html(section);
  
  $('.js-section-label span.current').animate({
    opacity: 0,
    top: '-30px'
  }, 300, function() {
    $(this).remove();
  });

  $('.js-section-label span.next').animate({
    opacity: 1,
    top: '0px'
  }, 300, function() {
    $(this).removeClass('next').addClass('current').after('<span class="next"></span>');
  });

}

var setDownLabel = function(section) {
  $('.js-section-label span.previous').html(section);
  
  $('.js-section-label span.current').animate({
    opacity: 0,
    top: '40px'
  }, 300, function() {
    $(this).remove();
  });

  $('.js-section-label span.previous').animate({
    opacity: 1,
    top: '0px'
  }, 300, function() {
    $(this).removeClass('previous').addClass('current').before('<span class="previous"></span>');
  });
}
