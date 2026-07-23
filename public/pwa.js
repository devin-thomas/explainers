(() => {
  let deferredInstallPrompt = null;

  const dispatch = (name) => window.dispatchEvent(new CustomEvent(name));

  window.UppercutPWA = {
    get canInstall() {
      return deferredInstallPrompt !== null;
    },

    async promptInstall() {
      if (!deferredInstallPrompt) return { outcome: "unavailable" };

      const promptEvent = deferredInstallPrompt;
      deferredInstallPrompt = null;
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      dispatch("uppercut-pwa-install-finished");
      return choice;
    }
  };

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    dispatch("uppercut-pwa-install-ready");
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    dispatch("uppercut-pwa-installed");
  });

  // The publishing explainer stores its comparison records in a compact array.
  // Normalize the three deployment columns after its inline renderer runs.
  const normalizePublishingExplainer = () => {
    if (
      location.pathname.replace(/\/+$/, "") !== "/publish-a-website" ||
      typeof A === "undefined"
    ) return;

    document.querySelectorAll("#grid .card .facts").forEach((facts, index) => {
      const values = [A[index]?.[12], A[index]?.[13], A[index]?.[14]];
      facts.querySelectorAll("b").forEach((value, valueIndex) => {
        if (values[valueIndex] !== undefined) value.textContent = values[valueIndex];
      });
    });

    document.querySelectorAll("#rows tr").forEach((row, index) => {
      const cells = row.querySelectorAll("td");
      if (cells.length >= 4 && A[index]) {
        cells[1].textContent = A[index][12];
        cells[2].textContent = A[index][13];
        cells[3].textContent = A[index][14];
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", normalizePublishingExplainer, { once: true });
  } else {
    normalizePublishingExplainer();
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none"
      }).catch(() => {
        // PWA metadata and icons still work even if service-worker registration fails.
      });
    }, { once: true });
  }
})();
