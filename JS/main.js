document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".carousel-viewport");
  const cards = document.querySelectorAll(".card");
  const dots = document.querySelectorAll(".dot");

  const visibleCount = 3;
  const totalCards = cards.length;
  let currentIndex = 0;

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 20; // width + margin
    viewport.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === Math.floor(currentIndex / 1));
    });
  }

  // Auto-slide every 4 seconds
  let interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    if (currentIndex > totalCards - visibleCount) {
      currentIndex = 0;
    }
    updateCarousel();
  }, 4000);

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
      clearInterval(interval);
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        if (currentIndex > totalCards - visibleCount) {
          currentIndex = 0;
        }
        updateCarousel();
      }, 4000);
    });
  });

  updateCarousel();

  const wrapper = document.querySelector(".carousel-wrapper");

  wrapper.addEventListener("mouseenter", () => clearInterval(interval));
  wrapper.addEventListener("mouseleave", () => {
    interval = setInterval(/*…*/);
  });
});



// window.addEventListener("DOMContentLoaded", () => {
//   const video = document.getElementById("main-video");
//   const videoContainer = document.querySelector(".container-video");
//   const logo = document.querySelector(".logo-overlay");

//   // Ensure autoplay works
//   video.play().catch(err => console.warn("Autoplay blocked:", err));

//   window.addEventListener("scroll", () => {
//     const scrollY = window.scrollY;
//     const heroHeight = window.innerHeight;

//     // Zoom from scale(1) up to scale(1.4)
//     const zoomFactor = 1 + Math.min(scrollY / heroHeight, 1) * 0.4;
//     videoContainer.style.transform = `scale(${zoomFactor})`;

//     // Logo fades out on scroll
//     logo.style.opacity = `${1 - Math.min(scrollY / heroHeight, 1)}`;
//   });
// });


window.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("main-video");
  const videoContainer = document.querySelector(".container-video");
  const logo = document.querySelector(".logo-overlay");

  video.play().catch(err => console.warn("Autoplay blocked:", err));

  const baseWidth = 100;
  const baseHeight = 100;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;
  const maxScale = Math.max(scaleX, scaleY); // to cover entire screen

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    const progress = Math.min(scrollY / heroHeight, 1);

    const scale = 1 + progress * (maxScale - 1);
    const top = 53.3 - progress * (53.3 - 53);
    const left = 55.4 - progress * (55.4 - 55 + 5);

    videoContainer.style.top = `${top}%`;
    videoContainer.style.left = `${left}%`;
    videoContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;

    logo.style.opacity = `${1 - progress}`;
  });
});