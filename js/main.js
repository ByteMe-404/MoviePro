function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;
  script.defer = true;
  document.body.appendChild(script);
}


document.addEventListener("DOMContentLoaded", () => {

  loadScript("../js/eye-on-off.js");

});

