(function () {
  "use strict";
  if (!window.HanaokaJobs || !window.HanaokaBlog) return;

  if (!window.HanaokaBlog.isLoggedIn()) {
    window.location.href = "vagas-login.html";
    return;
  }

  var listEl = document.getElementById("admin-job-list");
  var form = document.getElementById("admin-form");
  var slugField = document.getElementById("f-slug");
  var langField = document.getElementById("f-lang");
  var titleField = document.getElementById("f-title");
  var departmentField = document.getElementById("f-department");
  var locationField = document.getElementById("f-location");
  var typeField = document.getElementById("f-type");
  var descriptionField = document.getElementById("f-description");
  var requirementsField = document.getElementById("f-requirements");
  var formTitle = document.getElementById("admin-form-title");
  var newBtn = document.getElementById("admin-new-btn");
  var logoutBtn = document.getElementById("admin-logout-btn");

  function render() {
    var jobs = window.HanaokaJobs.getAll();
    listEl.innerHTML = jobs.map(function (j) {
      var langTag = (j.lang || "pt") === "en" ? "EN" : "PT";
      return (
        '<div class="admin-post-row">' +
        '<div><div class="admin-post-row__title">' +
        '<span style="display:inline-block; font-size:0.7rem; font-weight:700; letter-spacing:0.04em; padding:1px 6px; border-radius:4px; background:var(--aqua-100,#e3f2fa); color:var(--petrol-900); margin-right:6px; vertical-align:middle;">' + langTag + '</span>' +
        j.title + "</div>" +
        '<div class="admin-post-row__meta">' + [j.department, j.location].filter(Boolean).join(" · ") + "</div></div>" +
        '<div class="admin-post-row__actions">' +
        '<button type="button" data-edit="' + j.slug + '">Editar</button>' +
        '<button type="button" class="is-danger" data-delete="' + j.slug + '">Excluir</button>' +
        "</div></div>"
      );
    }).join("") || '<p style="color: var(--ink-500); font-size: 0.9rem;">Nenhuma vaga ainda.</p>';
  }

  function resetForm() {
    form.reset();
    slugField.value = "";
    langField.value = "pt";
    formTitle.textContent = "Nova vaga";
  }

  render();
  resetForm();

  listEl.addEventListener("click", function (e) {
    var editSlug = e.target.getAttribute("data-edit");
    var deleteSlug = e.target.getAttribute("data-delete");
    if (editSlug) {
      var job = window.HanaokaJobs.getBySlug(editSlug);
      if (!job) return;
      formTitle.textContent = "Editando: " + job.title;
      slugField.value = job.slug;
      langField.value = job.lang || "pt";
      titleField.value = job.title;
      departmentField.value = job.department || "";
      locationField.value = job.location || "";
      typeField.value = job.type || "";
      descriptionField.value = job.description || "";
      requirementsField.value = job.requirements || "";
      window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
    }
    if (deleteSlug) {
      if (window.confirm("Excluir esta vaga? Esta ação não pode ser desfeita.")) {
        window.HanaokaJobs.remove(deleteSlug);
        render();
        if (slugField.value === deleteSlug) resetForm();
      }
    }
  });

  newBtn.addEventListener("click", resetForm);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    window.HanaokaJobs.upsert({
      slug: slugField.value || undefined,
      lang: langField.value || "pt",
      title: titleField.value.trim(),
      department: departmentField.value.trim(),
      location: locationField.value.trim(),
      type: typeField.value.trim(),
      description: descriptionField.value.trim(),
      requirements: requirementsField.value.trim()
    });
    render();
    resetForm();
  });

  logoutBtn.addEventListener("click", function () {
    window.HanaokaBlog.logout();
    window.location.href = "trabalhe-conosco.html";
  });
})();
