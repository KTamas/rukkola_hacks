function cleanup() {
  $(".container").each(function(i, el) {
    rnh = $(el).find(".rukknhapp"); 

    if ((rnh.children().size() === 0) || (rnh.text().indexOf("happolná") > 0)) {
      $(el).parent().remove();
    }

    $(el).css('padding-left', '0').css('margin-right', '10px');
  });
}

function reorganize() {
  $("#books").prepend('<div class="grid-full book" id="all_books"></div>');
  var stuff = []

  $("#books").find(".book_box").each(function(i, el) {
    stuff.push(el);
    $(el).remove();
  });

  stuff.forEach(function(el, i) {
    $("#all_books").append(el);
  });
}

function add_next(url) {
  var current_page = url === "" ? 1 : url.match(/[0-9]+/)[0];
  var next_page = parseInt(current_page)+1;
  $("#more_books").remove();
  if (next_page <= pages) {
    $("#all_books").append('<a href="javascript:more(' + next_page + ')" id="more_books">Tovább...</a>');
  }
}

function more(page) {
  url = window.location.origin + window.location.pathname + "?oldal=" + page;
  $.ajax({
    url: url,
    type: "GET",
    beforeSend: function() { $("#more_books").html("<b>Töltöm...</b>"); }
  }).done(function(data) {
    $(data).find(".book_box").each(function(i, el) {
      $("#all_books").append(el);
    });
    cleanup();
    add_next(url);
  });
}

cleanup();
reorganize();

var pages = parseInt($(".last a").attr('href').match(/[0-9]+/)[0]);

if (pages > 1) {
  $("nav").hide();
  add_next("");
}
