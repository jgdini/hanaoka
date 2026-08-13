(function () {
  "use strict";
  if (!window.HanaokaJobs) return;

  var pageLang = (document.documentElement.lang || "pt-BR").slice(0, 2);

  var list = document.getElementById("job-list");
  var vagaSelect = document.getElementById("app-vaga");
  var appForm = document.getElementById("job-application-form");
  if (!list) return;

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return pageLang === "en"
      ? d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
      : d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  }

  function paragraphs(text) {
    return (text || "").split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean)
      .map(function (p) { return "<p>" + escapeHtml(p) + "</p>"; }).join("");
  }

  function bulletList(text) {
    var lines = (text || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    if (!lines.length) return "";
    return "<ul>" + lines.map(function (l) { return "<li>" + escapeHtml(l) + "</li>"; }).join("") + "</ul>";
  }

  function goToApplicationForm(jobTitle) {
    if (vagaSelect && jobTitle) vagaSelect.value = jobTitle;
    var target = document.getElementById("candidatura");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    var nameField = document.getElementById("app-nome");
    if (nameField) window.setTimeout(function () { nameField.focus(); }, 400);
  }

  var jobs = window.HanaokaJobs.getAll(pageLang);

  // Preenche o seletor "Vaga de interesse" do formulário com as vagas abertas.
  if (vagaSelect) {
    jobs.forEach(function (job) {
      var opt = document.createElement("option");
      opt.value = job.title;
      opt.textContent = job.title;
      vagaSelect.appendChild(opt);
    });
  }

  if (!jobs.length) {
    var emptyText = pageLang === "en"
      ? 'No open positions right now. Want to be considered for future openings? <a href="#candidatura">Send us your resume</a>.'
      : 'Nenhuma vaga aberta no momento. Quer deixar seu currículo pra futuras oportunidades? <a href="#candidatura">Envie pra gente</a>.';
    list.outerHTML = '<div class="job-empty"><p>' + emptyText + "</p></div>";
    return;
  }

  var labels = pageLang === "en"
    ? { desc: "Description", reqs: "Requirements", apply: "Apply for this position" }
    : { desc: "Descrição", reqs: "Requisitos", apply: "Candidatar-se a esta vaga" };

  list.innerHTML = jobs.map(function (job) {
    var tags = [job.department, job.location, job.type].filter(Boolean)
      .map(function (t) { return '<span class="job-card__tag">' + escapeHtml(t) + "</span>"; }).join("");
    return (
      '<details class="job-card">' +
      "<summary>" +
      "<div>" +
      '<div class="job-card__title">' + escapeHtml(job.title) + "</div>" +
      '<div class="job-card__meta">' + tags + "</div>" +
      "</div>" +
      '<svg class="job-card__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "</summary>" +
      '<div class="job-card__body">' +
      "<h4>" + labels.desc + "</h4>" +
      paragraphs(job.description) +
      (job.requirements ? "<h4>" + labels.reqs + "</h4>" + bulletList(job.requirements) : "") +
      '<button type="button" class="btn btn--reagent job-card__apply" style="margin-top: var(--sp-6);" data-job-title="' + escapeHtml(job.title) + '">' + labels.apply + "</button>" +
      "</div>" +
      "</details>"
    );
  }).join("");

  list.addEventListener("click", function (e) {
    var btn = e.target.closest(".job-card__apply");
    if (btn) goToApplicationForm(btn.getAttribute("data-job-title"));
  });
})();
