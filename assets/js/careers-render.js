(function () {
  "use strict";
  if (!window.HanaokaJobs) return;

  var pageLang = (document.documentElement.lang || "pt-BR").slice(0, 2);
  var APPLY_EMAIL = "vagas@hanaoka.com.br";

  var list = document.getElementById("job-list");
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

  var jobs = window.HanaokaJobs.getAll(pageLang);

  if (!jobs.length) {
    var emailHref = "mailto:" + APPLY_EMAIL + "?subject=" + encodeURIComponent(
      pageLang === "en" ? "Spontaneous application" : "Candidatura espontânea"
    );
    list.outerHTML = pageLang === "en"
      ? '<div class="job-empty"><p>No open positions right now. Want to be considered for future openings? <a href="' + emailHref + '">Send us your resume</a>.</p></div>'
      : '<div class="job-empty"><p>Nenhuma vaga aberta no momento. Quer deixar seu currículo pra futuras oportunidades? <a href="' + emailHref + '">Envie pra gente</a>.</p></div>';
    return;
  }

  var labels = pageLang === "en"
    ? { desc: "Description", reqs: "Requirements", apply: "Apply for this position", subject: "Application: " }
    : { desc: "Descrição", reqs: "Requisitos", apply: "Candidatar-se a esta vaga", subject: "Candidatura: " };

  list.innerHTML = jobs.map(function (job) {
    var tags = [job.department, job.location, job.type].filter(Boolean)
      .map(function (t) { return '<span class="job-card__tag">' + escapeHtml(t) + "</span>"; }).join("");
    var applyHref = "mailto:" + APPLY_EMAIL + "?subject=" + encodeURIComponent(labels.subject + job.title);
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
      '<a class="btn btn--reagent" style="margin-top: var(--sp-6); display: inline-flex;" href="' + applyHref + '">' + labels.apply + "</a>" +
      "</div>" +
      "</details>"
    );
  }).join("");
})();
