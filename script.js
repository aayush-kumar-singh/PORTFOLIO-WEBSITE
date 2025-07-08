var typed = new Typed("#element", {
  strings: ["Java DSA Learner", "Web Developer"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
});

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
