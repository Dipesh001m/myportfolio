// Typing Animation
const element = document.getElementById("animated-heading");

const texts = [
  "Hi, I'm Dipesh Mandal",
  "Cloud & DevOps Engineer",
  "AWS & Automation Specialist",
  "Infrastructure & CI/CD Expert",
  "Linux System Administrator"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    element.innerText = currentText.slice(0, ++charIndex);
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500); // Pause before deleting
      return;
    }
  } else {
    element.innerText = currentText.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500); // Pause before next typing
      return;
    }
  }

  setTimeout(typeEffect, isDeleting ? 80 : 100);
}

typeEffect();

// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (event) => {
      event.stopPropagation();
      navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
      if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('active');
      }
    });

    navLinks.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
});





// Skills Section Animation
// Animate skill cards when they come into view
  document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("visible");
            }, index * 150); // delay each card
          });
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, {
      threshold: 0.2
    });

    const skillsSection = document.querySelector(".skills-section");
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  });

  

// Timeline Animation
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const item = entry.target;

      if (entry.isIntersecting) {
        // Reset animation
        item.classList.remove('visible');
        item.style.animation = 'none';
        void item.offsetWidth; // Trigger reflow
        item.style.animation = '';
        
        // Set delay and re-add class to animate
        const index = Array.from(items).indexOf(item);
        item.style.animationDelay = `${index * 0.3}s`;
        item.classList.add('visible');
      } else {
        // Optional: remove the animation class and hide
        item.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  items.forEach(item => observer.observe(item));
});






// Animation for Blurry Card and About Section Images
const animatedImages = document.querySelectorAll('.blurry-card img, .about-image img');

animatedImages.forEach(img => {
  img.style.opacity = '0';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reset animation
        img.style.animation = 'none';
        void img.offsetWidth; // Force reflow
        img.style.animation = ''; // Re-apply CSS animation
        img.style.opacity = '1';
      } else {
        // Hide and pause when out of view
        img.style.opacity = '0';
      }
    });
  }, { threshold: 0.3 });

  observer.observe(img);
});




// Contact Form Submission

  const form = document.querySelector('.contact-form');
  const statusMessage = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        statusMessage.style.color = 'green';
        statusMessage.textContent = 'Thank you! Your message has been sent.';
        statusMessage.style.display = 'block';
        form.reset();
      } else {
        statusMessage.style.color = 'red';
        statusMessage.textContent = 'Oops! There was a problem sending your message.';
        statusMessage.style.display = 'block';
      }

      // Auto-hide the message after 5 seconds
      setTimeout(() => {
        statusMessage.style.display = 'none';
      }, 5000);
    });
  });





// Project Carousel 
// Show 3 projects at a time, with left/right arrows to navigate
  document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelectorAll(".project-card");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const visibleCount = 3; // Number of projects visible at once
  let startIndex = 0;

  function updateVisibleProjects() {
    projects.forEach((project, i) => {
      if (i >= startIndex && i < startIndex + visibleCount) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });

    // Disable arrows at boundaries
    leftArrow.disabled = startIndex === 0;
    rightArrow.disabled = startIndex + visibleCount >= projects.length;
  }

  leftArrow.addEventListener("click", () => {
    if (startIndex > 0) {
      startIndex--;
      updateVisibleProjects();
    }
  });

  rightArrow.addEventListener("click", () => {
    if (startIndex + visibleCount < projects.length) {
      startIndex++;
      updateVisibleProjects();
    }
  });

  updateVisibleProjects();
});



// Project Grid Animation (replay on re-entry)
document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.querySelector(".project-grid");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Reset classes
          projectGrid.classList.remove("visible", "pulse");
          projectGrid.style.animation = 'none';
          void projectGrid.offsetWidth; // trigger reflow
          projectGrid.style.animation = '';

          // Add visible class
          projectGrid.classList.add("visible");

          // Add pulse effect after fade-in transition
          setTimeout(() => {
            projectGrid.classList.add("pulse");
          }, 700);
        } else {
          // Optional: remove classes when out of view
          projectGrid.classList.remove("visible", "pulse");
        }
      });
    },
    { threshold: 0.1 }
  );

  if (projectGrid) {
    observer.observe(projectGrid);
  }
});

