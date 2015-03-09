
$( function () {

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

  $('.js-expand').click( function() {
    $(this).toggleClass('is-active');
    $(this).next('ul').slideToggle(500, 'easeInOutQuint');  
  });

  $('.js-expand').first().click();

  var time = 40;
  $('.outline__row').each( function(i) {

    setTimeout( function(){ 
      $('.outline__row').eq(i).addClass('visible');
    }, time);

    time += 40;
  });

  $(window).scroll( function() {

    currentPoint = $(this).scrollTop();

    $('.js-track-progress').each( function(i) {
      sectionTop = $(this).position().top;
      sectionHeight = $(this).height();
      sectionBottom = sectionTop + sectionHeight;
      
      progress = 0;

      if ( currentPoint >= sectionTop ) {
        progress = (currentPoint - sectionTop) / sectionHeight * 100;
      } else {
        progress = 0;
      }

      $('.js-progress-bar').css('width', progress + '%');
    });

    currentSection = $('a[rel="' + section + '"]').closest('.js-track-progress');
    sectionHeight = currentSection.height();
    if ( sectionHeight != null) {
      sectionTop = currentSection.position().top;
      progress = (currentPoint - sectionTop) / sectionHeight * 100;
      alert(progress);
    }

  })


});

var markOutline = function(section) {
  $('.outline a.is-active').removeClass('is-active');
  $('.outline a[rel="' + section + '"]').addClass('is-active');
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
