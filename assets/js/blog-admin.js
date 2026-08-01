(function () {
  "use strict";
  if (!window.HanaokaBlog) return;

  if (!window.HanaokaBlog.isLoggedIn()) {
    window.location.href = "blog-login.html";
    return;
  }

  var listEl = document.getElementById("admin-post-list");
  var form = document.getElementById("admin-form");
  var slugField = document.getElementById("f-slug");
  var titleField = document.getElementById("f-title");
  var categoryField = document.getElementById("f-category");
  var dateField = document.getElementById("f-date");
  var imageField = document.getElementById("f-image");
  var excerptField = document.getElementById("f-excerpt");
  var bodyField = document.getElementById("f-body");
  var formTitle = document.getElementById("admin-form-title");
  var newBtn = document.getElementById("admin-new-btn");
  var logoutBtn = document.getElementById("admin-logout-btn");

  function render() {
    var posts = window.HanaokaBlog.getAll();
    listEl.innerHTML = posts.map(function (p) {
      return (
        '<div class="admin-post-row">' +
        '<div><div class="admin-post-row__title">' + p.title + "</div>" +
        '<div class="admin-post-row__meta">' + p.category + " · " + p.date + "</div></div>" +
        '<div class="admin-post-row__actions">' +
        '<button type="button" data-edit="' + p.slug + '">Editar</button>' +
        '<button type="button" class="is-danger" data-delete="' + p.slug + '">Excluir</button>' +
        "</div></div>"
      );
    }).join("") || '<p style="color: var(--ink-500); font-size: 0.9rem;">Nenhum post ainda.</p>';
  }

  function resetForm() {
    form.reset();
    slugField.value = "";
    formTitle.textContent = "Novo post";
    dateField.value = new Date().toISOString().slice(0, 10);
  }

  render();
  resetForm();

  listEl.addEventListener("click", function (e) {
    var editSlug = e.target.getAttribute("data-edit");
    var deleteSlug = e.target.getAttribute("data-delete");
    if (editSlug) {
      var post = window.HanaokaBlog.getBySlug(editSlug);
      if (!post) return;
      formTitle.textContent = "Editando: " + post.title;
      slugField.value = post.slug;
      titleField.value = post.title;
      categoryField.value = post.category;
      dateField.value = post.date;
      imageField.value = post.image || "";
      excerptField.value = post.excerpt;
      bodyField.value = (post.body || []).join("\n\n");
      window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
    }
    if (deleteSlug) {
      if (window.confirm("Excluir este post? Esta ação não pode ser desfeita.")) {
        window.HanaokaBlog.remove(deleteSlug);
        render();
        if (slugField.value === deleteSlug) resetForm();
      }
    }
  });

  newBtn.addEventListener("click", resetForm);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var body = bodyField.value.split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
    window.HanaokaBlog.upsert({
      slug: slugField.value || undefined,
      title: titleField.value.trim(),
      category: categoryField.value.trim() || "Geral",
      date: dateField.value,
      image: imageField.value.trim(),
      excerpt: excerptField.value.trim(),
      body: body
    });
    render();
    resetForm();
  });

  logoutBtn.addEventListener("click", function () {
    window.HanaokaBlog.logout();
    window.location.href = "blog.html";
  });
})();
