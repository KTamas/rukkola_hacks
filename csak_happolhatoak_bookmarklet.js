/*jslint browser: true, indent: 2 */
/*global jQuery, $, console */

(function () {
  "use strict";
  $("body").prepend(
    "<div id='outer' style='z-index: 100; position: fixed; top: 33%; height: 1px; left: 0px; right: 0px; overflow: visible;'>" + "<div id='inner' style='z-index: 100; position: absolute; width: 500px; height: 30px; left: 33%; margin-left: -100px; top: -30px; background-color: black; color: white; padding: 5px; text-align: left;'>" + "A bookmarklet funkcióinak túlnyomó többsége elérhető a rukkolán." + " (<a href='#' onclick='javascript:$(\"#outer\").remove();' style=\"color: #f37900\">bezár</a>)" + "<br/><a href='http://blog.ktamas.com/index.php/rukkola-bookmarklet/' style='color: #f37900'>kattints ide</a> további információkért.</div></div>"
  );
}());
