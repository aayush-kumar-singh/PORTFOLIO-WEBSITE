// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const body = document.body
const themeIcon = themeToggle.querySelector("i")

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark"
body.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }
}

// Mobile Navigation
const hamburger = document.getElementById("hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Typing Animation
const typingText = document.getElementById("typingText")
const phrases = ["Full Stack Developer", "Java Enthusiast", "Problem Solver", "Tech Innovator"]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

function typeEffect() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 100
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true
    typingSpeed = 2000 // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typingSpeed = 500 // Pause before typing next phrase
  }

  setTimeout(typeEffect, typingSpeed)
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});


// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active Navigation Link
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    // OffsetTop adjusted to account for fixed navbar height
    const sectionTop = section.offsetTop - 70 
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    // Ensure we are comparing '#sectionID' to the full href, or just 'sectionID' to current
    if (link.getAttribute("href").includes(`#${current}`) && current !== "") {
      link.classList.add("active")
    }
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.")
      return
    }

    alert("Thank you for your message! I'll get back to you soon.")
    this.reset()
  })
}

// Scroll to Top Functionality (CSS is injected for this, keep JS part)
const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className = "scroll-to-top"
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`

document.body.appendChild(scrollToTopBtn)

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.opacity = "1"
    scrollToTopBtn.style.visibility = "visible"
  } else {
    scrollToTopBtn.style.opacity = "0"
    scrollToTopBtn.style.visibility = "hidden"
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Add hover effects for project cards (Already handled in CSS, keeping simple JS interaction for completeness)
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.03) translateY(-5px)";
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  })
})

// START: MODIFIED ANIMATION LOGIC

// 1. Observer for the generic fade-in-up animation for sections
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Only modify if not already set to visible by a previous scroll (or initial view)
        if (entry.target.style.opacity === "0") {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
        }
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
)

// Apply initial styles and observe all sections for the standard fade-in
document.querySelectorAll("section").forEach((section) => {
  // Exclude 'about' since it's typically one of the first things seen
  if (section.id !== 'about' && section.id !== 'home') {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    fadeInObserver.observe(section)
  } else if (section.id === 'about') {
    // For the 'about' section itself (which contains .about-text.fade-in)
    fadeInObserver.observe(section) 
  }
});


// 2. Observer for individual elements that slide/fade in and for skill bars + % text
const elementObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        
        // Skill card animation: progress bar + percentage count-up
        if (entry.target.classList.contains("skill-card")) {
          const progressBar = entry.target.querySelector(".progress-bar")
          const percentageEl = entry.target.querySelector(".skill-percentage")

          if (progressBar) {
            const progress = progressBar.getAttribute("data-progress")
            // Use setTimeout to ensure the CSS transition for the skill card itself starts first
            setTimeout(() => {
              progressBar.style.width = progress + "%"
            }, 200)
          }

          // Animate number only once
          if (percentageEl && !percentageEl.dataset.animated) {
            const targetValue = parseInt(
              percentageEl.textContent.replace("%", "").trim()
            )
            let startValue = 0
            const duration = 1500 // ms
            const startTime = performance.now()
            percentageEl.dataset.animated = "true"

            function animateNumber(currentTime) {
              const elapsed = currentTime - startTime
              const fraction = Math.min(elapsed / duration, 1)
              const currentValue = Math.floor(startValue + fraction * targetValue)
              percentageEl.textContent = currentValue + "%"

              if (fraction < 1) {
                requestAnimationFrame(animateNumber)
              }
            }

            requestAnimationFrame(animateNumber)
          }
        }
        
        // Stop observing once visible to prevent re-triggering animations on scroll back up
        observer.unobserve(entry.target);
      }
    })
  },
  {
    threshold: 0.2,
  }
)

// Observe all elements with 'fade-in' (including skill cards)
document.querySelectorAll(".fade-in").forEach((el) => {
  elementObserver.observe(el)
})

// END: MODIFIED ANIMATION LOGIC