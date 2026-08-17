document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
     ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));

      mobileNav.style.display = isOpen ? "none" : "block";

      const menuIcon = menuToggle.querySelector(".icon-menu");
      const closeIcon = menuToggle.querySelector(".icon-close");

      if (menuIcon && closeIcon) {
        menuIcon.style.display = isOpen ? "inline-flex" : "none";
        closeIcon.style.display = isOpen ? "none" : "inline-flex";
      }
    });

    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.style.display = "none";

        menuToggle.setAttribute("aria-expanded", "false");

        const menuIcon = menuToggle.querySelector(".icon-menu");
        const closeIcon = menuToggle.querySelector(".icon-close");

        if (menuIcon && closeIcon) {
          menuIcon.style.display = "inline-flex";
          closeIcon.style.display = "none";
        }
      });
    });
  }


  /* =========================
     DARK MODE
     ========================= */

  const themeToggle = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);

    if (themeToggle) {
      const darkMode = theme === "dark";

      themeToggle.setAttribute(
        "aria-pressed",
        String(darkMode)
      );

      themeToggle.setAttribute(
        "aria-label",
        darkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      );
    }
  }

  const savedTheme = localStorage.getItem("aih-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  } else {
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme =
        document.body.getAttribute("data-theme") || "light";

      const newTheme =
        currentTheme === "dark" ? "light" : "dark";

      applyTheme(newTheme);

      localStorage.setItem("aih-theme", newTheme);
    });
  }


  /* =========================
     CURRENT YEAR
     ========================= */

  const yearElements =
    document.querySelectorAll(".current-year");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /* =========================
     NEWSLETTER FORM
     ========================= */

  const newsletterForms =
    document.querySelectorAll(".newsletter-form");

  newsletterForms.forEach(function (form) {

    const emailInput =
      form.querySelector('input[type="email"]');

    const success =
      form.parentElement.querySelector(".form-success");

    const error =
      form.parentElement.querySelector(".form-error");

    form.addEventListener("submit", function (event) {

      event.preventDefault();

      if (success) success.textContent = "";
      if (error) error.textContent = "";

      if (!emailInput || !emailInput.value.trim()) {

        if (error) {
          error.textContent =
            "Please enter your email address.";
        }

        return;
      }

      if (!emailInput.checkValidity()) {

        if (error) {
          error.textContent =
            "Please enter a valid email address.";
        }

        return;
      }

      /*
       * This currently shows a local confirmation only.
       * A real email service will need to be connected later.
       */

      if (success) {
        success.textContent =
          "You're subscribed! We'll be in touch soon.";
      }

      form.reset();
    });

  });

});
