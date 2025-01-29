(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
    console.log('hii');
    $("body").toggleClass("nav-toggled");
    $(".nav").toggleClass("toggled");
    if ($(".nav").hasClass("toggled")) {
      $(".nav .collapse").collapse("hide");
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $(".sidebar .collapse").collapse("hide");
    }
  });
});
