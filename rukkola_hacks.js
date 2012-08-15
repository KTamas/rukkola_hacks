/*jslint browser: true, indent: 2 */
/*global jQuery, $ */

(function () {
  "use strict";

  function cleanup() {
    $(".container .rukknhapp").each(function (i, el) {
      if ($(el).text().trim().indexOf('elérhető') === -1) {
        $(el).parent().parent().parent().remove();
      }
    });
    $('.container').css('padding-left', '0').css('margin-right', '10px');
  }

  function reorganize() {
    $("#books").prepend('<div class="grid-full book" id="all_books"></div>');
    $("#books").find(".book_box").each(function (i, el) {
      $("#all_books").append($(el).clone());
      $(el).remove();
    });
  }

  cleanup();
  reorganize();

  var page_count, current_page, next_page, loading, dh;

  if ((window.location.pathname.indexOf('kollekciok') > -1) && ($('nav').size() > 0)) {
    page_count = parseInt($(".last a").attr('href').match(/[0-9]+/)[0], 10);
  } else {
    page_count = 0;
    window.scrollTo.apply(window, [0, 0]); //window.scrollTo(0) doesn't work in firefox
  }

  function set_next(url) {
    current_page = url === null ? 1 : parseInt(url.match(/[0-9]+/)[0], 10);
    next_page = current_page === page_count ? null : current_page + 1;
    $("#loading").remove();
    if (next_page) {
      $("#all_books").append("<div id='loading' style='display: none;'><b>Töltöm (" + next_page + "/" + page_count + ") </b></div>");
    }
  }

  function more(page) {
    loading = true;
    var url = window.location.pathname + "?oldal=" + page;
    $.ajax({
      url: url,
      type: "GET",
      beforeSend: function () { $("#loading").show(); }
    }).done(function (data) {
      $(data).find(".book_box").each(function (i, el) {
        $("#all_books").append(el);
      });
      cleanup();
      set_next(url);
      loading = false;
      if (dh === $(document).height()) {
        more(next_page);
      }
    });
  }

  if (page_count > 1) {
    $("nav").hide();
    set_next(null);
  }

  $(window).scroll(function () {
    dh = $(document).height();
    if ($(window).scrollTop() >= ($(document).height() - $(window).height() - 250)) {
      if ((!next_page) || (loading)) {
        return false;
      }
      more(next_page);
    }
  });
}());
