window.onload = function () {
  initSparticles();
};

// shape of particles (any of; circle, square, triangle, diamond, line, image) or "random"
function initSparticles() {
  let sparticles = document.querySelector(".sparticles_box");

  window.mySparticles = new Sparticles(sparticles, {
    composition: "soft-light",
    count: 100,
    speed: 0,
    parallax: 31.2,
    direction: 220,
    xVariance: 10.2,
    yVariance: 2.7,
    rotate: true,
    rotation: 1.8,
    alphaSpeed: 10,
    alphaVariance: 1,
    minAlpha: 0,
    maxAlpha: 1,
    minSize: 1,
    maxSize: 10,
    style: "both",
    bounce: false,
    drift: 24.2,
    glow: 5,
    twinkle: false,
    color: ["#ffffff"],
    shape: "diamond",
    imageUrl: "",
  });
}
