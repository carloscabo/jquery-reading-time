// jQuery Reading Time
// version 1.01, May 3th, 2017
// by Carlos Cabo
// https://github.com/carloscabo/jquery-reading-time

;(function ($, window, document, undefined) {

    $.fn.readingTime = function ( options ) {

      var
        defaults = {
          WPM: 250,
          round: 'ceil'
        },
        data = {
          words: 0,
          seconds: 0,
          minutes: 0,
          str: '', // 00:00:00
        }
        settings = $.extend({}, defaults, options);

      this.each(function() {
        data.words += parseInt($(this).text().replace(/\s\s+/g, ' ').trim().split(' ').length, 10 );
      });

      data.minutes = data.words / settings.WPM;
      data.seconds = parseInt( data.minutes * 60, 10);

      if ( typeof settings.round === 'string' ) {
        data.minutes = Math[settings.round](data.minutes);
      }

      var
        date = new Date(null);
      date.setSeconds( data.seconds ); // specify value for SECONDS here
      // data.str = date.toISOString().substr(11, 8); // "00:00:00"
      data.str = date.toISOString().substr(14, 5); // "00:00"

      return data;
  };

})(jQuery, window, document);
