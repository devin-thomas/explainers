(() => {
  const escapeText = (value) => String(value ?? "");
  const formatDate = (value) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));

  async function start() {
    const searchInput = document.querySelector("#explainer-search");
    const sortSelect = document.querySelector("#explainer-sort");
    const clearButton = document.querySelector("#clear-search");
    const installButton = document.querySelector("#install-app");
    const grid = document.querySelector("#explainer-grid");
    const status = document.querySelector("#catalog-status");
    const emptyState = document.querySelector("#empty-state");
    const response = await fetch("/explainer-catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    const items = await response.json();
    const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });
    const normalize = (value) => value.trim().toLocaleLowerCase();

    function render() {
      const query = normalize(searchInput.value);
      const sortMode = sortSelect.value;
      const visible = items
        .filter((item) => normalize(item.title).includes(query))
        .sort((a, b) => sortMode === "title-asc" ? collator.compare(a.title, b.title)
          : sortMode === "title-desc" ? collator.compare(b.title, a.title)
          : sortMode === "oldest" ? Date.parse(a.published) - Date.parse(b.published)
          : Date.parse(b.published) - Date.parse(a.published));

      grid.replaceChildren(...visible.map((item) => {
        const article = document.createElement("article");
        article.className = "card";
        const h2 = document.createElement("h2"); h2.textContent = escapeText(item.title);
        const p = document.createElement("p"); p.textContent = escapeText(item.summary);
        const time = document.createElement("time"); time.className = "published"; time.dateTime = item.published.slice(0, 10); time.textContent = `Published ${formatDate(item.published)}`;
        const link = document.createElement("a"); link.className = "open"; link.href = `/${item.route}`; link.textContent = "Open explainer →";
        article.append(h2, p, time, link);
        return article;
      }));
      status.textContent = query ? `${visible.length} of ${items.length} explainers` : `${items.length} explainers`;
      emptyState.hidden = visible.length !== 0;
      clearButton.hidden = query.length === 0;
    }

    function syncInstall() { installButton.hidden = !(window.UppercutPWA && window.UppercutPWA.canInstall); }
    searchInput.addEventListener("input", render);
    sortSelect.addEventListener("change", render);
    clearButton.addEventListener("click", () => { searchInput.value = ""; searchInput.focus(); render(); });
    installButton.addEventListener("click", async () => { installButton.disabled = true; await window.UppercutPWA?.promptInstall(); installButton.disabled = false; syncInstall(); });
    window.addEventListener("uppercut-pwa-install-ready", syncInstall);
    window.addEventListener("uppercut-pwa-install-finished", syncInstall);
    window.addEventListener("uppercut-pwa-installed", syncInstall);
    render(); syncInstall();
  }

  start().catch((error) => {
    console.error(error);
    const status = document.querySelector("#catalog-status");
    const emptyState = document.querySelector("#empty-state");
    if (status) status.textContent = "Catalog unavailable";
    if (emptyState) { emptyState.hidden = false; emptyState.textContent = "The explainer catalog could not be loaded."; }
  });
})();
