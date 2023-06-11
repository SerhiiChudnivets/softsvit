let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector(".drag-slider");

const end = () => {
  isDown = false;
  slider.classList.remove("drag-active");
};

const start = (e) => {
  isDown = true;
  slider.classList.add("drag-active");
  startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

const moveSlider = (e) => {
  if (!isDown) return;

  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
  const dist = x - startX;
  slider.scrollLeft = scrollLeft - dist;
};

slider.addEventListener("mousedown", start);
slider.addEventListener("touchstart", start);

slider.addEventListener("mousemove", moveSlider);
slider.addEventListener("touchmove", moveSlider);

slider.addEventListener("mouseleave", end);
slider.addEventListener("mouseup", end);
slider.addEventListener("touchend", end);
