/*jslint browser: true, indent: 2 */
/*global jQuery, $, console */

(function () {
  "use strict";

  function messagebox(msg) {
    document.body.innerHTML = "<div id='outer' style='z-index: 100; position: fixed; top: 33%; height: 1px; left: 0px; right: 0px; overflow: visible;'>" + "<div id='inner' style='z-index: 100; position: absolute; width: 200px; height: 50px; left: 50%; margin-left: -100px; top: -50px; background-color: black; color: white; padding: 5px; text-align: left;'>" + msg + " (<a style=\"color: #f37900\" href='#' onclick='javascript:document.querySelector(\"#outer\").innerHTML=null;' style=\"color: #f37900\">bezár</a>)</div></div>" + document.body.innerHTML;
  }

  if (window.location.hostname.indexOf('rukkola.hu') < 0) {
    messagebox("Szia, ezt a bookmarkletet csak a rukkolan hasznalhatod. Kattints <a href='foo'>ide</a> tovabbi infoert. Kofi!");
    return false;
  }

  function add_happable_books_from(source) {
    $(source).find(".book_box:contains('elérhető')").each(function (i, el) {
      $("#all_books").append($(el).clone());
    });
    $('.container').css('padding-left', '0').css('margin-right', '10px');
  }

  function transform_grid() {
    $("#books").prepend('<div id="all_books" class="grid-full book"></div>');
    add_happable_books_from("#books");
    $("div.grid-full.book").not("#all_books").remove();
  }

  var page_count, initial_page, next_page, is_loading;

  if (window.location.pathname !== "/") {
    transform_grid();
    if ($('nav').length > 0) {
      initial_page = parseInt($('span.page.current').text(), 10);
      next_page = initial_page + 1;
      page_count = parseInt($(".last a").attr('href').match(/\?oldal=([\d]+)/)[1], 10);
      $("nav").hide();
    }
  } else {
    $(".book_box").not(':contains("elérhető")').remove();
    window.scrollTo.apply(window, [0, 0]); //window.scrollTo(0) doesn't work in firefox
    return false; //no more pages, we're done here
  }

  function is_window_scrollable() {
    return document.body.scrollHeight > (document.body.clientHeight + 300);
  }

  function load_more() {
    is_loading = true;
    var url = window.location.pathname + "?oldal=" + next_page, previous_document_height = $(document).height();
    $.ajax({
      url: url,
      type: "GET",
      beforeSend: function () {
        $("#all_books").append("<div id='is_loading'><b>Töltöm (" + next_page + "/" + page_count + ") </b></div>");
      }
    }).done(function (data) {
      add_happable_books_from(data);
      $("#is_loading").remove();
      is_loading = false;
      next_page = next_page < page_count ? next_page + 1 : null;
      if (!next_page) {
        $("#all_books").append("<div style='clear: both;'><b>Itt a vége, fuss el véle.</b></div>");
      }
      if ((previous_document_height === $(document).height() || !is_window_scrollable()) && next_page) {
        load_more(next_page);
      }
    });
  }

  if (!is_window_scrollable() && next_page) {
    load_more(next_page);
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
