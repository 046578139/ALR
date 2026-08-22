/* Aiden's Lawn Repair — site behaviour. No dependencies. */
(function () {
  "use strict";

  /* ---------------------------------------------------- mobile nav --- */

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close after tapping a link, and on Escape.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ------------------------------------------------- footer year --- */

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ----------------------------------------------- quote form --- */

  var form = document.getElementById("quoteForm");
  var note = document.getElementById("formNote");
  if (!form) return;

  var DEFAULT_NOTE = note ? note.textContent : "";

  function setNote(text, state) {
    if (!note) return;
    note.textContent = text;
    note.className = "form-note" + (state ? " is-" + state : "");
  }

  function clearError(field) {
    field.removeAttribute("aria-invalid");
    var msg = field.parentNode.querySelector(".field-error");
    if (msg) msg.remove();
  }

  function showError(field, text) {
    clearError(field);
    field.setAttribute("aria-invalid", "true");
    var msg = document.createElement("span");
    msg.className = "field-error";
    msg.textContent = text;
    field.parentNode.appendChild(msg);
  }

  function validate() {
    var ok = true;
    var first = null;

    Array.prototype.forEach.call(form.querySelectorAll("[required]"), function (field) {
      clearError(field);
      var value = field.value.trim();

      if (!value) {
        showError(field, "This field is required.");
        ok = false;
      } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        showError(field, "Please enter a valid email address.");
        ok = false;
      } else if (field.type === "tel" && value.replace(/\D/g, "").length < 10) {
        showError(field, "Please enter a 10-digit phone number.");
        ok = false;
      }

      if (!ok && !first) first = field;
    });

    if (first) first.focus();
    return ok;
  }

  // Clear a field's error as soon as the visitor starts fixing it.
  form.addEventListener("input", function (e) {
    if (e.target.hasAttribute("aria-invalid")) clearError(e.target);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) {
      setNote("Please fix the highlighted fields and try again.", "error");
      return;
    }

    var action = form.getAttribute("action") || "";

    // The form endpoint hasn't been connected yet — don't pretend it sent.
    if (!action || action.indexOf("your-form-id") !== -1) {
      setNote(
        "Form endpoint isn't connected yet. Please call (555) 010-2345 or " +
        "email hello@aidenslawnrepair.com in the meantime.",
        "error"
      );
      return;
    }

    var button = form.querySelector("button[type=submit]");
    var label = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    setNote("Sending your request...");

    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed: " + res.status);
        form.reset();
        setNote("Thanks! We've got your request and will reply within one business day.", "success");
      })
      .catch(function () {
        setNote(
          "Something went wrong sending that. Please call (555) 010-2345 or " +
          "email hello@aidenslawnrepair.com.",
          "error"
        );
      })
      .then(function () {
        if (button) {
          button.disabled = false;
          button.textContent = label;
        }
        // Restore the default helper text after a success message has been read.
        window.setTimeout(function () {
          if (note && note.classList.contains("is-success")) setNote(DEFAULT_NOTE);
        }, 8000);
      });
  });
})();
