/* Hanaoka blog — posts do LinkedIn em destaque (protótipo client-side).
   Igual ao blog-store.js: fica salvo no localStorage deste navegador.
   Cláudio (ou quem editar) cola o código/link de incorporação de um post
   público do LinkedIn pelo blog-admin.html, e ele passa a aparecer na
   seção "Também no LinkedIn" do blog. Nenhum post é inventado aqui —
   a lista começa vazia até alguém adicionar um post real. */
(function (global) {
  "use strict";

  var STORAGE_KEY = "hanaoka_linkedin_embeds_v1";

  function readStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function writeStore(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function getAll() {
    return readStore().slice().sort(function (a, b) { return new Date(b.addedDate) - new Date(a.addedDate); });
  }

  // Aceita tanto o snippet completo (<iframe src="..." height="...">) quanto só a URL.
  // O LinkedIn calcula a altura certa pra cada post individualmente — por isso
  // extraímos e guardamos essa altura junto, em vez de forçar um valor fixo
  // igual pra todo mundo (isso é o que causava a barra de rolagem interna).
  function extractEmbed(input) {
    if (!input) return null;
    var srcMatch = input.match(/src=["']([^"']+)["']/i);
    var url = srcMatch ? srcMatch[1] : input.trim();
    if (!/^https:\/\/www\.linkedin\.com\/embed\//i.test(url)) return null;
    var heightMatch = input.match(/height=["']?(\d+)["']?/i);
    var height = heightMatch ? parseInt(heightMatch[1], 10) : 700;
    return { url: url, height: height };
  }

  // Mantido por compatibilidade (retorna só a URL).
  function extractEmbedUrl(input) {
    var parsed = extractEmbed(input);
    return parsed ? parsed.url : null;
  }

  function add(input) {
    var parsed = extractEmbed(input);
    if (!parsed) return null;
    var items = readStore();
    var item = { id: Date.now().toString(36), embedUrl: parsed.url, embedHeight: parsed.height, addedDate: new Date().toISOString().slice(0, 10) };
    items.unshift(item);
    writeStore(items);
    return item;
  }

  function remove(id) {
    var items = readStore().filter(function (i) { return i.id !== id; });
    writeStore(items);
  }

  global.HanaokaLinkedIn = {
    getAll: getAll,
    add: add,
    remove: remove,
    extractEmbedUrl: extractEmbedUrl
  };
})(window);
