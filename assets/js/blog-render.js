(function () {
  "use strict";
  if (!window.HanaokaBlog) return;

  // The page's own <html lang="..."> decides which posts show here:
  // pt-BR pages (site root) list lang:"pt" posts, en/ pages list lang:"en" posts.
  var pageLang = (document.documentElement.lang || "pt-BR").slice(0, 2);

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return pageLang === "en"
      ? d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
      : d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  var grid = document.getElementById("post-grid");
  if (grid) {
    var posts = window.HanaokaBlog.getAll(pageLang);
    if (!posts.length) {
      grid.innerHTML = pageLang === "en"
        ? '<p style="color: var(--ink-500);">No English posts yet. <a href="../blog.html">See the Portuguese blog →</a></p>'
        : '<p style="color: var(--ink-500);">Nenhum post ainda.</p>';
    } else {
      grid.innerHTML = posts.map(function (p) {
        var media = p.image
          ? '<img src="' + p.image + '" alt="" loading="lazy">'
          : "";
        var readLabel = pageLang === "en" ? "Read: " : "Ler: ";
        return (
          '<article class="post-card">' +
          '<div class="post-card__media">' + media + "</div>" +
          '<div class="post-card__body">' +
          '<span class="post-card__cat">' + escapeHtml(p.category) + "</span>" +
          '<h3 class="post-card__title">' + escapeHtml(p.title) + "</h3>" +
          '<p class="post-card__excerpt">' + escapeHtml(p.excerpt) + "</p>" +
          '<span class="post-card__date">' + formatDate(p.date) + "</span>" +
          "</div>" +
          '<a class="post-card__link" href="post.html?slug=' + encodeURIComponent(p.slug) + '" aria-label="' + readLabel + escapeHtml(p.title) + '"></a>' +
          "</article>"
        );
      }).join("");
    }
    var revealHost = grid.closest(".reveal-stagger");
    if (revealHost) revealHost.classList.add("is-visible");
  }

  var article = document.getElementById("post-article");
  if (article) {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    var post = slug ? window.HanaokaBlog.getBySlug(slug) : null;
    if (!post) {
      article.innerHTML = pageLang === "en"
        ? "<p>Post not found. <a href=\"blog.html\">Back to the blog →</a></p>"
        : "<p>Post não encontrado. <a href=\"blog.html\">Voltar ao blog →</a></p>";
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
