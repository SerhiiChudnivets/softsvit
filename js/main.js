const sliderLoader = document.getElementById('preloader');
const sliderLoaderBody = document.querySelector('body');

function runSliderPreloader() {
  sliderLoader.classList.add("active");
  sliderLoaderBody.classList.add("loading");
}

function offSliderPreloader() {
  setTimeout(() => {
    sliderLoader.classList.remove("active");
    sliderLoaderBody.classList.remove("loading");
  }, "1500");
}

function initSlider(sliderElement, sliderOptions) {
  let swiper = new Swiper(sliderElement, sliderOptions);
  return swiper;
}

const feedbackSliderOptions = {
  effect: "coverflow",
  centeredSlides: true,
  slidesPerView: 3,
  longSwipesMs: 0,
  loopPreventsSlide: false,
  longSwipes: true,
  longSwipesRatio: 0,
  threshold: 0,
  slideToClickedSlide: false,
  slideShadows: false,
  speed: 400,
  loop: true,
  loopedSlides: 2,
  updateOnWindowResize:true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
  },

  breakpoints: {
    320: {
      effect: "slide",
      slidesPerView: 1.07,
      spaceBetween: 12,
      centeredSlides: false,
      slideShadows: false,
      loop: false,
      updateOnWindowResize:true,
    },
    575: {
      effect: "slide",
      slidesPerView: 2,
      spaceBetween: 24,
      centeredSlides: false,
      slideShadows: false,
      loop: false,
      updateOnWindowResize:true,
    },
    768: {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: "auto",
      longSwipesMs: 0,
      loopPreventsSlide: false,
      longSwipes: true,
      longSwipesRatio: 0,
      threshold: 0,
      slideToClickedSlide: false,
      slideShadows: false,
      speed: 400,
      loop: true,
      loopedSlides: 2,
      updateOnWindowResize:true,
    },
  },

  pagination: {
    el: ".feedback-slider .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".feedback-slider .slider-button-next",
    prevEl: ".feedback-slider .slider-button-prev",
  },
};


const whySoftsvitSliderOptions = {
  slidesPerView: 3,
  grid: {
    rows: 2,
    fill: "row",
  },
  spaceBetween: 24,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      grid: {
        rows: 1,
      },
      spaceBetween: 12,
    },
    575: {
      slidesPerView: 2,
      grid: {
        rows: 1,
      },
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 24,
    },
  },
  pagination: {
    el: ".why_softsvit_slider .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".why_softsvit_slider .slider-button-next",
    prevEl: ".why_softsvit_slider .slider-button-prev",
  },
};

const vacancySliderOptions = {
  slidesPerView: 3,
  grid: {
    rows: 2,
    fill: "row",
  },
  spaceBetween: 24,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      grid: {
        rows: 1,
      },
      spaceBetween: 12,
    },

    617: {
      slidesPerView: 1.8,
      grid: {
        rows: 1,
      },
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 2,
      grid: {
        rows: 1,
      },
      spaceBetween: 24,
    },

    1109: {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 24,
    },
  },
  pagination: {
    el: ".vacancy-slider .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".vacancy-slider .slider-button-next",
    prevEl: ".vacancy-slider .slider-button-prev",
  },
};

let feedback = initSlider(".feedback-slider", feedbackSliderOptions);
window.onresize = function() {
  if (feedback) {
    // reInit slider
    feedback.destroy();
    feedback = initSlider(".feedback-slider", feedbackSliderOptions);
  }
};


let vacancySlider = initSlider(".vacancy-slider", vacancySliderOptions);
initSlider(".why_softsvit_slider", whySoftsvitSliderOptions);

function reDrawVacancySlider(redrawId) {

  vacancySlider.find(item => {
    if(item.el.querySelector('.swiper-wrapper').getAttribute('id') === redrawId) {
      return item;
    }
  }).destroy();

  vacancySlider = initSlider(".vacancy-slider", vacancySliderOptions);
  let popupButtons = document.querySelectorAll(
    ".vacancy-slider .buttons-wrap .button"
  );

  popupButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showModal(button);
    });
  });
}



/** Switch Tabs logic*/

const tabsBlock = document.querySelectorAll(".switch_tabs");
tabsBlock.forEach((item) => {
  item.addEventListener("click", function (e) {
    // run preloader
    runSliderPreloader();
    let curentTabs = this.children;
    let activeTab = e.target;
    let tabIndex = e.target.getAttribute("data-tab");
    let tabId = e.target.getAttribute("data-tab-id");

    // http query
    const sliderCard = document.querySelector('.vacancy-slider .swiper-slide').cloneNode(true);
    fetch('./sliderData.json', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    })
    .then(resp => resp.text())
    .then(dataText => {
      const data = JSON.parse(dataText)
      let cardsHTML = '';

      // slider content
      data.forEach(cardItem => {
        sliderCard.querySelector('.title').innerHTML = cardItem.post_title;
        sliderCard.querySelector('.description').innerHTML = cardItem.acf.details;
        sliderCard.querySelector('.vacancy-badge span').innerHTML = cardItem.acf.level;
        cardsHTML += `<div class="swiper-slide">${sliderCard.innerHTML}</div>`
      })
      const swiperWrapper = document.querySelector(`[data-tab="${tabIndex}"] .vacancy-slider .swiper-wrapper`);
      swiperWrapper.innerHTML = cardsHTML;
      reDrawVacancySlider(swiperWrapper.getAttribute('id'));
      // off preloader
      offSliderPreloader();
    })

    // http query

    let tabContentBlocks = activeTab
      .closest(".tab-wrapper")
      .querySelectorAll(".tab_content");

    tabContentBlocks.forEach((contentBlock) => {
      if (contentBlock.getAttribute("data-tab") == tabIndex) {
        setActiveTab(activeTab, curentTabs, contentBlock, tabContentBlocks);
      }
    });
  });
});

function setActiveTab(
  activeTab,
  tabsElements,
  currentContentBlock,
  tabContentBlocks
) {
  for (let i = 0; i < tabsElements.length; i++) {
    tabsElements[i].classList.remove("active");
    tabContentBlocks[i].classList.remove("active");
  }
  activeTab.classList.add("active");
  currentContentBlock.classList.add("active");
}

//------- Modal logic

const pageBody = document.querySelector("body");
const popupOverlay = document.querySelector(".overlay");
const popupLoader = document.getElementById('preloader');

let closeButton = document.querySelectorAll(".close-modal");
let popupButtons = document.querySelectorAll(
  ".vacancy-slider .buttons-wrap .button"
);

closeButton.forEach(function (el) {
  el.addEventListener("click", function () {
    closePopup(this);
  });
});

function closePopup(button) {
  pageBody.classList.remove("modal_open");
  button.closest(".modal").classList.remove("active");
}

popupButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    showModal(button);
  });
});

function showModal(button) {
  let modal;
  if (button.getAttribute("data-popup") == "my-cv") {
    modal = document.getElementById("my-cv-popup");
  } else if (button.getAttribute("data-popup") == "friend-cv") {
    modal = document.getElementById("friend-cv-popup");
  }
  showOverlay();
  modal.classList.add("active");
    // run query
  const id = button.getAttribute("data-post-id");
  fetch(`./data.json`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
  })
  // fetch(`/wp-json/wp/v2/posts/${id}`)
    .then(response => response.text())
    .then(dataText => {
      const data = JSON.parse(dataText);
      const htmlTitle = data.title.rendered;
      const htmlDescription = data.content.rendered;
      modal.querySelector('.description_content').innerHTML = htmlDescription;
      modal.querySelector('.title').innerHTML = htmlTitle;
      modal.querySelector('.title-value').value = htmlTitle;
    })
    .catch(error => {
      console.log(error)
    });
}

function showOverlay() {
  pageBody.classList.add("modal_open");
  popupOverlay.classList.add("active");
}
