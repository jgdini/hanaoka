(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var newsletterForm = document.querySelector("[data-newsletter-form]");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = newsletterForm.querySelector(".form-note");
      if (note) note.textContent = "Obrigado! Em breve você receberá nossas novidades.";
    });
  }

  /* ---- Generic contact/quote form submit (demo only, no backend) ---- */
  var contactForms = document.querySelectorAll("[data-contact-form]");
  contactForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) note.textContent = form.getAttribute("data-success-message") || "Mensagem enviada.";
    });
  });

  /* ---- Background media: reveal with a fade once actually ready,
     instead of a hard cut from the poster frame / blank background ---- */
  var bgMedia = document.querySelectorAll(".bg-video");
  bgMedia.forEach(function (el) {
    if (el.tagName === "IMG") {
      if (el.complete) { el.classList.add("is-ready"); return; }
      el.addEventListener("load", function () { el.classList.add("is-ready"); }, { once: true });
      return;
    }
    if (el.readyState >= 3) {
      el.classList.add("is-ready");
      return;
    }
    var reveal = function () {
      el.classList.add("is-ready");
      el.removeEventListener("playing", reveal);
      el.removeEventListener("canplay", reveal);
    };
    el.addEventListener("playing", reveal);
    el.addEventListener("canplay", reveal);
  });

  /* ---- Doc filter (FDS page): pills toggle visible rows by data-product, with a soft fade ---- */
  var docFilterBtns = document.querySelectorAll("[data-doc-filter]");
  if (docFilterBtns.length) {
    var docRows = document.querySelectorAll("[data-product]");
    docFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        docFilterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var target = btn.getAttribute("data-doc-filter");
        docRows.forEach(function (row) {
          var show = target === "todos" || row.getAttribute("data-product") === target;
          if (show) {
            row.style.display = "";
            void row.offsetWidth;
            row.classList.remove("doc-row--hidden");
          } else if (!row.classList.contains("doc-row--hidden")) {
            row.classList.add("doc-row--hidden");
            window.setTimeout(function () {
              if (row.classList.contains("doc-row--hidden")) row.style.display = "none";
            }, reduceMotion ? 0 : 200);
          }
        });
      });
    });
  }

  /* ---- Magnetic pull on primary CTAs ---- */
  if (!reduceMotion) {
    var magneticEls = document.querySelectorAll(".hero-split__actions .btn, .cta-strip .btn");
    magneticEls.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (x * 0.2).toFixed(1) + "px, " + (y * 0.32).toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }
})();
