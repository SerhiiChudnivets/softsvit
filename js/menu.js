const menuButton = document.getElementById("toggle_menu");
const siteBody = document.querySelector("body");
const menu = document.getElementById("menu");
const mobileMenu = document.getElementById("burger_toggle");

menuButton.addEventListener("click", () => {
  showMenu(menuButton);
});

mobileMenu.addEventListener("click", () => {
  showMenu(mobileMenu);
});

function showMenu(el) {
  siteBody.classList.toggle("menu_open");
  menu.classList.toggle("active");
  el.classList.toggle("active");
}

// Menu scroll
const smoothScroll = function (targetEl, duration) {
  const headerElHeight =
    document.querySelector(".main_header").clientHeight + 24;
  let target = document.querySelector(targetEl);
  let targetPosition = target.getBoundingClientRect().top - headerElHeight;
  let startPosition = window.pageYOffset;
  let startTime = null;

  const ease = function (time, start, target, duration) {
    time /= duration / 2;
    if (time < 1) return (target / 2) * time * time + start;
    time--;
    return (-target / 2) * (time * (time - 2) - 1) + start;
  };

  const animation = function (currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };
  requestAnimationFrame(animation);
};

const scrollTo = function () {
  const links = document.querySelectorAll(".scroll-to");
  links.forEach((item) => {
    item.addEventListener("click", function () {
      siteBody.classList.remove("menu_open");
      menu.classList.remove("active");
      menuButton.classList.remove("active");
      mobileMenu.classList.remove("active");
      const currentTarget = this.getAttribute("href");
      smoothScroll(currentTarget, 800);
    });
  });
};

scrollTo();