// Select all toggle icons on the page
const toggleIcons = document.querySelectorAll(".toggle-icon");

toggleIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;

    if (input.type === "password") {
      input.type = "text";
      icon.src = "../assets/icons/eye-on.png";
    } else {
      input.type = "password";
      icon.src = "../assets/icons/eye-off.png";
    }
  });
});
