document.addEventListener("DOMContentLoaded", () => {

  // These are the things I want to highlight in the opening section.
  const words = [
    "user research and testing",
    "product and UX design",
    "front-end development",
    "data analysis and classification",
    "marketing and communication",
    "accessible design"
  ];

  // These colors match each of the words above.
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

  // This types each phrase, lets it sit for a second, then deletes it before moving to the next one.
  function type() {
    if (!el) return;

    const word = words[i];

    if (!deleting) {
      el.textContent = word.substring(0, j);
      j++;

      el.style.color = colors[i % colors.length];

      if (j > word.length) {
        deleting = true;
        setTimeout(type, 1500);
        return;
      }

      setTimeout(type, 65);
    } else {
      el.textContent = word.substring(0, j);
      j--;

      el.style.color = colors[i % colors.length];

      if (j < 0) {
        j = 0;
        deleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 300);
        return;
      }

      setTimeout(type, 40);
    }
  }

  type();

  // This makes my sections fade in as I scroll down the page.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  // These are the parts of the page that get the fade-in effect.
  document.querySelectorAll("section, .project").forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // This makes the navigation scroll smoothly to each section.
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