const debouncedScroll = debounce(handleScroll, 200);
function debounce(func, delay) {
    let timerId;
    return function() {
        clearTimeout(timerId);
        timerId = setTimeout(func, delay);
    };
}
window.addEventListener('scroll', debouncedScroll);
function isElementOnScreen(elementId) {
  var element = document.getElementById(elementId);
  if (!element) {
    return false; // елемент не знайдено
  }
  var trigger = element.getAttribute('data-animation-trigger');
  if (!trigger) {
    return false; // атрибут data-animation-trigger не встановлено
  }
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight && rect.bottom >= 0;
}
let earth = document.getElementById("sphereDesktop").animate(
    [
      { transform: "translate(0) scale(1)", opacity: 1 },
        { transform: "translate(200px,600px) scale(1.25)", opacity: 0.7 },
      { transform: "translate(-800px,800px) scale(0.75)", opacity: 0.5 },
    ],
    {
      fill: "forwards",
      duration: 2000,
        easing: "cubic-bezier(1 ,0.9, 0.8, 0.9)",
    }
);
earth.pause();
let rotation = document.getElementById("sphereDesktopImg").animate(
    [
        { transform: "rotate(0)"},
        { transform: "rotate(360deg)"},
        { transform: "rotate(720deg)"},
    ],
    {
        fill: "forwards",
        iterations: Infinity,
        duration: 5000,
    }
);
rotation.pause()
let onTop
function handleScroll() {
    let start = document.querySelector('[data-animation]').getAttribute('data-animation');
    let onScreen = isElementOnScreen("trigger");
    let earthOnScreen = isElementOnScreen('sphereDesktop');
    if (!onScreen && !earthOnScreen && onTop && start == 'false'){
        rotation.play()
        earth.play();
        onTop = false;
        document.querySelector('[data-animation]').setAttribute('data-animation', true);
    }else if (!onScreen && !earthOnScreen && onTop ){
        rotation.play()
        earth.reverse();
    onTop = false;
}else if(onScreen && !earthOnScreen && !onTop){
        rotation.play()
        earth.reverse();
    onTop =true;
}
}
window.onload = function (){
    document.getElementById('trigger').setAttribute('data-ontop', isElementOnScreen('trigger'));
     onTop = document.getElementById('trigger').getAttribute('data-ontop');
}
earth.addEventListener('finish', function (){
    rotation.pause();
})
