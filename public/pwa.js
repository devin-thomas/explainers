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
