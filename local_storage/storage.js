var content = [{title: "Testing"}, {title: "template"}, {title: "generation"}, {title: "w/Handlebars"}];

$(document).ready(function () {
  var currentIndex;
  var currentColour;
  var template;
  var storedText = localStorage.getItem('text_content');
  var $textarea = $('textarea');
  var $nav = $('nav');
  var $article = $('article');
  var $radio = $('input[type=radio]');
  var $content = $('.tabbed-content');
  var $eventColour;

  $textarea.val(storedText);
  currentIndex = parseInt(localStorage.getItem('nav_index'), 10) || 0;
  currentColour = localStorage.getItem('radio_colour') || "#ff0000";
  
  $('article:visible').toggle();
  $article.eq(currentIndex).toggle();
  $('nav li').eq(currentIndex).toggleClass('active');
  
  $content.css('background-color', currentColour);
  $(":radio[value=" + currentColour + "]").prop('checked', true);

  template = Handlebars.compile($('#title').html());
  $nav.after(template(content[currentIndex]));

  $nav.on('click', 'li', function(event) {
    event.preventDefault();
    $nav.find(".active").removeClass('active');
    $('article:visible').toggle();

    $(event.target).addClass('active');
    currentIndex = $('.active').closest('li').index()
    localStorage.setItem('nav_index', currentIndex.toString());
    $article.eq(currentIndex).toggle();
    $('nav + h2').replaceWith(template(content[currentIndex]));
  })

  $('input[type=radio]').on('change', function(event) {
    $eventColour = $(event.target).val()
    localStorage.setItem('radio_colour', $eventColour);
    $content.css('background-color', $eventColour);
  });

  $(window).on('unload', function() {
    localStorage.setItem('text_content', $textarea.val());
  });
});