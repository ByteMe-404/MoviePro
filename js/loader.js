// Prevent multiple loaders
if (!document.getElementById("loader")) {
  const loaderDiv = document.createElement("div");
  loaderDiv.id = "loader";
  loaderDiv.innerHTML = `<div class="spinner"></div>`;
  document.body.prepend(loaderDiv);

  window.addEventListener("load", () => {
    loaderDiv.style.opacity = "0";
    setTimeout(() => loaderDiv.remove(), 500);
  });
}
