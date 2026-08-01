(function () {
  "use strict";
  if (!window.HanaokaBlog) return;

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  var grid = document.getElementById("post-grid");
  if (grid) {
    var posts = window.HanaokaBlog.getAll();
    grid.innerHTML = posts.map(function (p) {
      var media = p.image
        ? '<img src="' + p.image + '" alt="" loading="lazy">'
        : "";
      return (
        '<article class="post-card">' +
        '<div class="post-card__media">' + media + "</div>" +
        '<div class="post-card__body">' +
        '<span class="post-card__cat">' + escapeHtml(p.category) + "</span>" +
        '<h3 class="post-card__title">' + escapeHtml(p.title) + "</h3>" +
        '<p class="post-card__excerpt">' + escapeHtml(p.excerpt) + "</p>" +
        '<span class="post-card__date">' + formatDate(p.date) + "</span>" +
        "</div>" +
        '<a class="post-card__link" href="post.html?slug=' + encodeURIComponent(p.slug) + '" aria-label="Ler: ' + escapeHtml(p.title) + '"></a>' +
        "</article>"
      );
    }).join("");
    var revealHost = grid.closest(".reveal-stagger");
    if (revealHost) revealHost.classList.add("is-visible");
  }

  var article = document.getElementById("post-article");
  if (article) {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    var post = slug ? window.HanaokaBlog.getBySlug(slug) : null;
    if (!post) {
      article.innerHTML = "<p>Post não encontrado. <a href=\"blog.html\">Voltar ao blog →</a></p>";
    } else {
      document.title = post.title + " | Blog Hanaoka";
      var titleEl = document.getElementById("post-title");
      if (titleEl) titleEl.textContent = post.title;
      var metaEl = document.getElementById("post-meta");
      if (metaEl) metaEl.innerHTML = '<span>' + escapeHtml(post.category) + '</span><span>·</span><span>' + formatDate(post.date) + '</span>';
      var coverEl = document.getElementById("post-cover");
      if (coverEl) {
        if (post.image) {
          coverEl.src = post.image;
          coverEl.style.display = "";
        } else {
          coverEl.style.display = "none";
        }
      }
      var bodyEl = document.getElementById("post-body");
      if (bodyEl) {
        bodyEl.innerHTML = (post.body || []).map(function (p) {
          return "<p>" + escapeHtml(p) + "</p>";
        }).join("");
      }
    }
  }
})();
