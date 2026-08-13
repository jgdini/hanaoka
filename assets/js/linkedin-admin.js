(function () {
  "use strict";
  if (!window.HanaokaLinkedIn) return;

  var listEl = document.getElementById("li-admin-list");
  var form = document.getElementById("li-admin-form");
  var input = document.getElementById("li-input");
  var errorEl = document.getElementById("li-admin-error");
  if (!listEl || !form || !input) return;

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function render() {
    var items = window.HanaokaLinkedIn.getAll();
    listEl.innerHTML = items.map(function (item) {
      return (
        '<div class="admin-post-row">' +
        '<div><div class="admin-post-row__title">' + item.embedUrl.replace(/^https:\/\/www\.linkedin\.com\/embed\//, "…/") + "</div>" +
        '<div class="admin-post-row__meta">Adicionado em ' + formatDate(item.addedDate) + "</div></div>" +
        '<div class="admin-post-row__actions">' +
        '<button type="button" class="is-danger" data-li-delete="' + item.id + '">Excluir</button>' +
        "</div></div>"
      );
    }).join("") || '<p style="color: var(--ink-500); font-size: 0.9rem;">Nenhum post do LinkedIn cadastrado ainda.</p>';
  }

  render();

  listEl.addEventListener("click", function (e) {
    var deleteId = e.target.getAttribute("data-li-delete");
    if (deleteId) {
      if (window.confirm("Remover este post do LinkedIn do blog?")) {
        window.HanaokaLinkedIn.remove(deleteId);
        render();
      }
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var result = window.HanaokaLinkedIn.add(input.value);
    if (!result) {
      errorEl.style.display = "block";
      return;
    }
    errorEl.style.display = "none";
    input.value = "";
    render();
  });
})();
