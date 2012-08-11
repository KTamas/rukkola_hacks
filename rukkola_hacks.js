function cleanup() {
  $(".container .rukknhapp").each(function(i, el) {
    if ($(el).text().trim().indexOf('elérhető') === -1) {
      $(el).parent().parent().parent().remove();
    }
  });
  $('.container').css('padding-left', '0').css('margin-right', '10px');
}

function reorganize() {
  $("#books").prepend('<div class="grid-full book" id="all_books"></div>');
  $("#books").find(".book_box").each(function(i, el) {
    $("#all_books").append($(el).clone());
    $(el).remove();
  });
}

cleanup();
reorganize();

function add_next(url) {
  var current_page = url === null ? 1 : parseInt(url.match(/[0-9]+/)[0]);
  var next_page = current_page+1;
  $("#more_books").remove();
  if (next_page <= pages) {
    $("#all_books").append('<a href="javascript:more(' + next_page + ')" id="more_books">Tovább (' + next_page + '/' + pages + ')</a>');
  }
}

function more(page) {
  // note to self: firefox doesn't support window.location.origin, but fortunatelly we don't need it
  var url = window.location.pathname + "?oldal=" + page;
  $.ajax({
    url: url,
    type: "GET",
    beforeSend: function() { $("#more_books").html("Töltöm..."); }
  }).done(function(data) {
    $(data).find(".book_box").each(function(i, el) {
      $("#all_books").append(el);
    });
    cleanup();
    add_next(url);
  });
}

if (window.location.pathname.indexOf('kollekciok') > -1) {
  if ($('nav').size() > 0) {
    var pages = parseInt($(".last a").attr('href').match(/[0-9]+/)[0]);
    if (pages > 1) {
      $("nav").hide();
      add_next(null);
    }
  }
}
