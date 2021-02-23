// dependencies
require("jquery");
require("tooltipster");
require("magnific-popup");

let ClipboardJs = require("clipboard");
let hljs = require("highlight.js");

// Add ClipboardJs to enable copy button functionality
new ClipboardJs(".copy-button", {
  target: function(trigger) {
    return trigger.previousElementSibling;
  }
}).on("success", function(e) {
  e.clearSelection();
});

$(document).ready(function() {
  // Add copy button and tooltip to each code-block
  $("pre").each(function() {
    $(this).append(
      '<button class="copy-button tooltip" title="Copied!"><i class="far fa-fw fa-copy"></i></button>'
    );
  });

  $(".tooltip").tooltipster({
    animationDuration: 1,
    theme: "tooltipster-light",
    side: "bottom",
    delay: [200, 0],
    distance: 0,
    trigger: "custom",
    triggerOpen: {
      click: true,
      tap: true
    },
    triggerClose: {
      click: true,
      tap: true,
      mouseleave: true
    }
  });

  // Nav-Toggle
  $(".toggler").click(function() {
    $("nav").slideToggle();
    $("#search").autocomplete("val", "");
  });

  // Commento support to block search focus when hitting the S key
  blockSearchFocus = false;

  $("#commento").focusin(function() {
    blockSearchFocus = true;
  });

  $("#commento").focusout(function() {
    blockSearchFocus = false;
  });

  // Keyboard-Support
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      if (!$("nav").hasClass("permanentTopNav")) $("nav").slideUp();
      $("#search").autocomplete("val", "");
    } else if (e.keyCode === 83 && !blockSearchFocus) {
      if (!$("nav").hasClass("permanentTopNav")) $("nav").slideDown();
      $("#search").focus();
    }
  });

  // Magnific Popup for images within articles to zoom them
  // Rendered with Markdown
  $("p img").magnificPopup({
    type: "image",
    image: {
      verticalFit: true,
      titleSrc: "alt"
    },
    zoom: {
      enabled: true
    },
    callbacks: {
      // Get the src directly from the img-tag instead of an additional tag
      elementParse: function(item) {
        // Function will fire for each target element
        // "item.el" is a target DOM element (if present)
        // "item.src" is a source that you may modify

        item.src = item.el.attr("src");
      }
    },
    // https://github.com/dimsemenov/Magnific-Popup/pull/1017
    // Enabled popup only when image size is greater than content area
    disableOn: function(e) {
      let img = e.target;
      return img.naturalWidth > img.clientWidth;
    }
  });

  // Magnific Popup for images within articles to zoom them
  // Rendered with Asciidoc
  $(".image-block>img").magnificPopup({
    type: "image",
    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el
          .parent()
          .find("figcaption")
          .text();
      }
    },
    zoom: {
      enabled: true
    },
    callbacks: {
      elementParse: function(item) {
        item.src = item.el.attr("src");
      }
    },
    // https://github.com/dimsemenov/Magnific-Popup/pull/1017
    // Enabled popup only when image size is greater than content area
    disableOn: function(e) {
      let img = e.target;
      return img.naturalWidth > img.clientWidth;
    }
  });

  // Magnific Popup for images within articles to zoom them
  // Rendered with Asciidoc
  $(".image-block").magnificPopup({
    type: "image",
    delegate: "a",
    image: {
      titleSrc: function(item) {
        return item.el
          .parent()
          .find("figcaption")
          .text();
      },
      verticalFit: true
    },
    zoom: {
      enabled: true
    }
  });
});

hljs.initHighlightingOnLoad();
