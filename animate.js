var startingRange = -14;

$(document).ready(function() {
  var filters = $('.filters'),
      defs = $('.filters defs').first(),
      blur = $('#blur'),
      blurFilter = $('#blur feGaussianBlur').first();
  var text = $('.text');
  text.lettering();
  
  $('.svgBlur span').each(function(i) {
    var blurClone = blur.clone();
    var blurId="blur"+ (i + 1);
    blurClone.attr("id", blurId);
    defs.append(blurClone);
    
    var filter = "url(#" + blurId + ")";
    var move = "translateY(" + startingRange * Math.random() + "px)";
    var styles = {
      transform: move,
      webkitFilter: filter,
      filter: filter
    };
    $(this).css(styles).data("blur",blurClone);
  });
  
  $('body').click(function() {
    $(".text").toggleClass("expandLetterSpacing");
    
    $('.svgBlur span').each(function(i) {
      var blurFilterX = "#blur" + (i + 1) + " feGaussianBlur";
      randomDelay = Math.floor(1000*Math.random());
      animateWithDelay($(this), randomDelay, $(blurFilterX));  
    });
  });
});

function animateBlur(element,filter) {
  var initalPos = parseFloat(element.css("transform").split(',')[5]);
  var prevPos = initalPos;
  
  function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }
  
  function setBlur(x,y) {
      filter.attr("stdDeviation",x+","+y);  
  }
  
  (function updateMotionBlur() {
      var currentPos = parseFloat(element.css('transform').split(',')[5]);
      var blurStrength = map_range(currentPos, initalPos, 0, 8, 0);
      setBlur(0,blurStrength);
      lastPos = currentPos; 
    
      if (blurStrength > 0) {
        requestAnimationFrame(updateMotionBlur);
      }
  })();
}

function animateWithDelay(target, delay, blurTarget) {
  setTimeout(function() {
    $(target).toggleClass("animateIn");
    animateBlur(target, blurTarget.first());
  }, delay);
}

function animateSection(section) {
  var sectionText = $(section).find(".text");
  sectionText.toggleClass("expandLetterSpacing");
  
  sectionText.find("span").each(function(i) {
    var blurFilterX = "#blur" + (i + 1) + " feGaussianBlur";
    randomDelay = Math.floor(1000*Math.random());
    animateWithDelay($(this), randomDelay, $(blurFilterX));  
  });
}