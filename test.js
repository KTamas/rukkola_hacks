/*jslint browser: true, indent: 2 */
/*global jQuery, $ */

(function () {
  "use strict";
  $("body").prepend(
    "<div id='outer' style='z-index: 100; position: fixed; top: 33%; height: 1px; left: 0px; right: 0px; overflow: visible;'>" + "<div id='inner' style='z-index: 100; position: absolute; width: 200px; height: 30px; left: 50%; margin-left: -100px; top: -30px; background-color: black; color: white; padding: 5px; text-align: left;'>" + "Frissült a bookmarklet!" + ' (<a href=javascript:$("#outer").remove(); style="color: #f37900">bezár</a>)' + "<br/><a href='http://blog.ktamas.com/index.php/rukkola-bookmarklet/' style='color: #f37900'>Kattints ide</a> az új verzióért.</div></div>"
  );
  var bookmarklet = document.createElement('script');
  bookmarklet.setAttribute('src', 'http://ktamas.com/hacks/rukkola/csak_happolhatoak_bookmarklet.js');
  document.body.appendChild(bookmarklet);
}());
