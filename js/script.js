function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("active");
}

// Close menu when clicking on a link
document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("nav-menu").classList.remove("active");
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const sliderWrapper = document.querySelector(".mobile-slider");

const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;
let visibleCards = 3;

function updateVisibleCards() {
  if (window.innerWidth <= 700) visibleCards = 1;
  else visibleCards = 3;
}

function updateSlider() {
  const offset = -(currentIndex * (100 / visibleCards));
  sliderWrapper.style.transform = `translateX(${offset}%)`;

  const activeDotIndex = Math.floor(currentIndex / visibleCards);
  document.querySelectorAll(".dot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === activeDotIndex);
  });
}

function goToSlide(dotIndex) {
  currentIndex = dotIndex * visibleCards;
  updateSlider();
}

let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const maxCards = cards.length - visibleCards;
    if (currentIndex < maxCards) {
      currentIndex += visibleCards;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

window.addEventListener("resize", () => {
  updateVisibleCards();
  createDots();
  updateSlider();
});

updateVisibleCards();

updateSlider();
startAutoSlide();
