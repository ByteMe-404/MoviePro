function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;
  script.defer = true;
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {

  loadScript("../js/eye-on-off.js");

});







(function addGlobalLoader() {
  // Add loader CSS link dynamically
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = "../css/loader.css";
  document.head.appendChild(cssLink);

  // Add loader HTML dynamically
  const loaderHTML = `
    <div id="loader">
      <div class="spinner"></div>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", loaderHTML);

  // Fade out on load
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 100);
  });
})();
