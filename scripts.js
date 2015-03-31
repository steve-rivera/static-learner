
$( function () {

  $('.checkbox').click( function() {

    checkbox1 = null;
    checkbox2 = null;

    if ( $(this).parent().hasClass('outline__row') ) {
      checkbox1 = $(this);
      sectionLabel = $(this).next('a').attr('rel');
      section = $('a.js-page-marker-top[rel="' + sectionLabel + '"]').parent('.js-track-progress');
      checkbox2 = section.find('.checkbox');
    } else {
      checkbox1 = $(this);
      sectionLabel = $(this).parent().prev('.js-page-marker-bottom').attr('rel');
      outlineRow = $('.outline a[rel="' + sectionLabel + '"]');
      checkbox2 = outlineRow.parent().find('.checkbox');
    }

    if ( checkbox1 != null ) {
      checkbox1.toggleClass('is-checked');
      checkbox2.toggleClass('is-checked');
    }

  });

  $('.outline a').click( function() {
    sectionName = $(this).attr('rel');
    scrollTo = $('a.js-page-marker-top[rel="' + sectionName + '"]' );
    $('html, body').animate({
      scrollTop: scrollTo.offset().top - 118
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
      sectionHeight = section.height() - 350;

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


  $('.js-checkbox').waypoint( function(direction) {

    var checkbox = $(this.element);

    if (direction == 'down') {
      if (checkbox.hasClass('is-checked')) {
        
      } else {
        var section = checkbox.attr('rel');
        checkbox.addClass('skipped');
        $('.outline a[rel="' + section + '"]').parent('.outline__row').find('.checkbox').addClass('skipped');
      }
    } else {
        var section = checkbox.attr('rel');
        checkbox.removeClass('skipped');
        $('.outline a[rel="' + section + '"]').parent('.outline__row').find('.checkbox').removeClass('skipped');      
    }


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
