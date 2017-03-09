# jquery-reading-time
Simple **reading time plugin** in JQuery, you pass a jQuery selector and it returns an object with information. Includes a sample using **Mutation Obervers** to automatically update reading time on text changes.

Take a look to the [demo](https://htmlpreview.github.io/?https://github.com/carloscabo/jquery-reading-time/blob/master/index.html).

# usage

````javascript
var rt = $('.text-containers').readingTime();

/*
Returns following object:
{
  minutes: 1,   // Reading time in minutes (rounded)
  seconds: 49,  // Reading time in seconds
  str: "00:49", // Reading time string "minutes:seconds"
  words: 208    // Word count (integer)
}
*/
````

# options

````javascript
var rt = $('.text-containers').readingTime({
  WPM: 250,      // Words Per Minute
  round: 'floor' // Minutes roundind function: "ceil" (default) / "floor" / null -> don't round
});
````

By default the function sums **all the texts in the selector items**.

If you wish to get the reading time **of the first element in the selector** you can do something like:

````javascript
var rt = $('.text-containers').first().readingTime();
````

# updating reading time on text changes

In the `ready.js` you can find an example of automatically updating the reading time information using a [**Mutation Observer**](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) ( IE11+ ). This objects is called **when there are changes inside a DOM element**.
Usage is very simple:

````javascript
// Mutator observer
// Automatically recalculates reading time on text changes
// For instance after an Ajax Update of text contents...
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

if (window.MutationObserver) { // If available

  var
    target = $('#contents')[0], // DOM Object to be observed

    // Available options at:
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    observer_config = {
      attributes: false,
      childList: true,
      characterData: true,
      subtree: true
    },

    observer = new MutationObserver(function (mutations) {
      if( mutations.length ) {
        // This is executed on text / DOM changes
        updateReadingTime();
      }
    });

  // pass in the target node, as well as the observer options
  observer.observe(target, observer_config);

  // Destroy observer with:
  // observer.disconnect();

}
`````

