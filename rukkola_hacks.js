function cleanup() {
  $(".container").each(function(i, el) {
    rnh = $(el).find(".rukknhapp"); 

    if ((rnh.children().size() === 0) || (rnh.text().indexOf("happolná") > 0)) {
      $(el).parent().remove();
    }

    $(el).css('padding-left', '0');
    $(el).css('margin-right', '10px');

  });
}

function reorganize() {
  $("#books").prepend('<div class="grid-full book" id="hacks"></div>');
  var stuff = []

  $("#books").find(".book_box").each(function(i, el) {
    stuff.push(el);
    $(el).remove();
  });

  stuff.forEach(function(el, i) {
    $("#hacks").append(el);
  });
}

function add_next(url) {
  var cp = url === "" ? 1 : url.match(/[0-9]+/)[0];
  var np = parseInt(cp)+1;
  $("#hacksmore").remove();
  if (np <= pages) {
    $("#hacks").append('<a href="javascript:window.postMessage({ get_next: ' + np + '}, \'*\')" id="hacksmore">Tovább...</a>');
  }
}

function more(page) {
  url = window.location.origin + window.location.pathname + "?oldal=" + page;
  $.get(url, function(data) {
    $(data).find(".book_box").each(function(i, el) {
      $("#hacks").append(el);
    });
    cleanup();
    add_next(url);
  });
}

cleanup();
reorganize();
var pages = parseInt($(".last a").attr('href').match(/[0-9]+/)[0]);

if (pages > 1) {
  add_next("");
}


var port = chrome.extension.connect();
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
      return;
    if (event.data.get_next) {
      more(event.data.get_next);
    }
}, false);
