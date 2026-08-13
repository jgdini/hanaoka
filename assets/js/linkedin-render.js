(function () {
  "use strict";
  if (!window.HanaokaLinkedIn) return;

  var grid = document.getElementById("linkedin-grid");
  var section = document.getElementById("linkedin-section");
  if (!grid || !section) return;

  var items = window.HanaokaLinkedIn.getAll();

  if (!items.length) {
    // Sem posts cadastrados ainda — não mostra a seção vazia/quebrada no site.
    section.hidden = true;
    return;
  }

  section.hidden = false;
  grid.innerHTML = items.map(function (item) {
    return (
      '<div class="linkedin-embed-card">' +
      '<iframe src="' + item.embedUrl + '" height="527" frameborder="0" allowfullscreen loading="lazy" title="Post do LinkedIn da Hanaoka"></iframe>' +
      "</div>"
    );
  }).join("");
})();
