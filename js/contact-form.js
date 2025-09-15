/* ================================
   CONTACT FORM SUBMISSION
   (Currently shows a simple alert)
================================ */
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page refresh
    alert("✅ Thanks for your message! I’ll get back to you soon.");
    this.reset(); // clear the form
  });
