let deferredPrompt2;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt2 = e;
  // Show the custom install banner
  showInstallBanner();
});

function showInstallBanner() {
  // Show your custom install banner here
  // For example:
  const installBanner = document.querySelector("#install-banner");
  installBanner.style.display = "block";

  const installButton = document.querySelector("#install-button");
  installButton.addEventListener("click", (e) => {
    // Hide the install banner
    installBanner.style.display = "none";
    // Show the install prompt
    deferredPrompt2.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt2.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User installed the app");
      } else {
        console.log("User dismissed the app installation prompt");
      }
      deferredPrompt2 = null;
    });
  });
}
