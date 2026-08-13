/* Hanaoka — vagas / Trabalhe Conosco (protótipo client-side).
   Igual ao blog-store.js e ao linkedin-store.js: fica salvo no localStorage
   deste navegador. A lista começa vazia — nenhuma vaga é inventada aqui. */
(function (global) {
  "use strict";

  var STORAGE_KEY = "hanaoka_jobs_v1";

  function readStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function writeStore(jobs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }

  function getAll(lang) {
    var jobs = readStore();
    if (lang) {
      jobs = jobs.filter(function (j) { return (j.lang || "pt") === lang; });
    }
    return jobs.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  }

  function getBySlug(slug) {
    return readStore().find(function (j) { return j.slug === slug; }) || null;
  }

  function slugify(title) {
    return title
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function upsert(job) {
    var jobs = readStore();
    if (!job.slug) job.slug = slugify(job.title) + "-" + Date.now().toString(36);
    if (!job.date) job.date = new Date().toISOString().slice(0, 10);
    if (!job.lang) job.lang = "pt";
    var idx = jobs.findIndex(function (j) { return j.slug === job.slug; });
    if (idx >= 0) jobs[idx] = job; else jobs.unshift(job);
    writeStore(jobs);
    return job;
  }

  function remove(slug) {
    var jobs = readStore().filter(function (j) { return j.slug !== slug; });
    writeStore(jobs);
  }

  global.HanaokaJobs = {
    getAll: getAll,
    getBySlug: getBySlug,
    upsert: upsert,
    remove: remove
  };
})(window);
