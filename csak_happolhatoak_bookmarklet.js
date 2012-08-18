/*jslint browser: true, indent: 2 */
/*global jQuery, $ */

(function () {
  "use strict";

  function cleanup() {
    $(".book_box").not(':contains("elérhető")').remove();
    $('.container').css('padding-left', '0').css('margin-right', '10px');
  }

  function reorganize() {
    cleanup();
    $("#books").prepend('<div class="grid-full book" id="all_books"></div>');
    $("#books").find(".book_box").each(function (i, el) {
      $("#all_books").append($(el).clone());
      $(el).remove();
    });
  }

  reorganize();

  var page_count, current_page, next_page, is_loading;

  if (((window.location.pathname.indexOf('kollekciok') > -1) || (window.location.pathname.indexOf('konyvek') > -1)) && ($('nav').size() > 0)) {
    page_count = parseInt($(".last a").attr('href').match(/\?oldal=([\d]+)/)[1], 10);
  } else {
    page_count = 0;
    window.scrollTo.apply(window, [0, 0]); //window.scrollTo(0) doesn't work in firefox
  }

  function is_window_scrollable() {
    return document.body.scrollHeight > (document.body.clientHeight + 300);
  }

  function set_next(url) {
    current_page = url === null ? 1 : parseInt(url.match(/\?oldal=([\d]+)/)[1], 10);
    next_page = current_page === page_count ? null : current_page + 1;
    $("#is_loading").remove();
    if (next_page) {
      $("#all_books").append("<div id='is_loading' style='display: none;'><b>Töltöm (" + next_page + "/" + page_count + ") </b></div>");
    } else {
      $("#all_books").append("<div style='clear: both;'><b>Itt a vége, fuss el véle.</b></div>");
    }
  }

  function load_more(page) {
    is_loading = true;
    var url = window.location.pathname + "?oldal=" + page, previous_document_height = $(document).height();
    $.ajax({
      url: url,
      type: "GET",
      beforeSend: function () { $("#is_loading").show(); }
    }).done(function (data) {
      $(data).find(".book_box").each(function (i, el) {
        $("#all_books").append(el);
      });
      cleanup();
      set_next(url);
      is_loading = false;
      if ((previous_document_height === $(document).height() && next_page) || (!is_window_scrollable() && next_page)) {
        load_more(next_page);
      }
    });
  }

  if (page_count > 1) {
    $("nav").hide();
    set_next(null);
    if (!is_window_scrollable() && next_page) {
      load_more(next_page);
    }
  }

  $(window).scroll(function () {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height() - 250)) {
      if ((!next_page) || (is_loading)) {
        return false;
      }
      load_more(next_page);
    }
  });
}());
