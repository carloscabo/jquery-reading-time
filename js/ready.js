$(document).ready(function () {
  // La magia aquí

  // Pick random element from jQuery selector
  $.fn.random = function () {
    return this.eq(Math.floor(Math.random() * this.length));
  };


  // Create n random text blocks in the page
  for (var i = 0, len = parseInt(Math.random() * 10, 10) + 5; i < len; i++) {
    var
      num_sentences = parseInt(Math.random() * 4, 10) + 8;
    $('<div>')
      .addClass('text-content')
      .append(
        $('<p>').text(
          chance.paragraph({ sentences: num_sentences })
        )
      ).appendTo(
        $('#contents')
      );
  }

  // Update random paragrpah on click
  $('a.random-update').on('click', function(e) {
    var
      num_sentences = parseInt(Math.random() * 4, 10) + 1;
    $('.text-content').removeClass('updated').random().addClass('updated').html(
      $('<p>').text(
        chance.paragraph({ sentences: num_sentences })
      )
    );
  });


  // Calculate reading time
  function updateReadingTime() {
    var
      rt = $('.text-content').readingTime();
    $('#status-bar .hour-string').text('Reading time: ' + rt.minutes + 'min.' );
    console.log( rt );
  };
  updateReadingTime();


  // Mutator observer
  // Automatically recalculates reading time on text changes
  // For instance after an Ajax Update
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

  if (window.MutationObserver) { // If available
    var
      target = $('#contents')[0], // DOM Object

      observer_config = {
        attributes: false,
        childList: true,
        characterData: true,
        subtree: true
      },

      observer = new MutationObserver(function (mutations) {
        if( mutations.length ) {
          updateReadingTime();
        }
      });

    // pass in the target node, as well as the observer options
    observer.observe(target, observer_config);
  }

});