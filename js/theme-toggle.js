/* ================================
   THEME TOGGLE (Dark / Light mode)
================================ */
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Apply saved theme on load
if (currentTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "☀️"; // sun icon
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});
