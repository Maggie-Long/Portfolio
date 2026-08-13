document.addEventListener("DOMContentLoaded", () => {

  // Words that rotate in the opening sentence after "I do this through."
  const words = [
    "user research and testing",
    "product and UX design",
    "front-end development",
    "data analysis and classification",
    "marketing and communication",
    "accessible design"
  ];

  // Color for each rotating word, matched by position in the words list.
  const colors = [
    "#6c63ff",
    "#00bfa6",
    "#4dabf7",
    "#f59f00",
    "#20c997",
    "#e599f7"
  ];

  let i = 0;
  let j = 0;
  let deleting = false;

  const el = document.getElementById("typed-text");

  // Types each word, pauses briefly, deletes it, then moves to the next word.
  function type() {
    if (!el) return;

    const word = words[i];

    el.textContent = deleting
      ? word.substring(0, j--)
      : word.substring(0, j++);

    el.style.color = colors[i % colors.length];

    let speed = deleting ? 40 : 65;

    if (!deleting && j === word.length) {
      deleting = true;
      speed = 1200;
    } else if (deleting && j === 0) {
      deleting = false;
      i = (i + 1) % words.length;
    }

    setTimeout(type, speed);
  }

  type();

  // Adds the fade-in effect when sections and projects scroll into view.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll("section, .project").forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Smoothly scrolls to each section when a top navigation link is clicked.
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});
