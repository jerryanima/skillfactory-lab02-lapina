let images = [{
    url: "image/flat.png",
    city: "Rostov-on-Don LCD admiral",
    area: "81 m2",
    time: "3.5 months",
    cost: "Upon request",
    link_name: "Rostov-on-Don, Admiral"
  }, {
    url: "image/flat2.png",
    city: "Sochi Thieves",
    area: "105 m2",
    time: "4 months",
    cost: "Upon request",
    link_name: "Sochi Thieves"
  }, {
    url: "image/flat3.png",
    city: "Rostov-on-Don Patriotic",
    area: "93 m2",
    time: "3 months",
    cost: "Upon request",
    link_name: "Rostov-on-Don Patriotic"
  }];

function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let citytext = document.querySelector(".citytext");
  let area = document.querySelector(".area");
  let time = document.querySelector(".time");
  let cost = document.querySelector(".cost");
  let servicesList = document.querySelector(".services-list");

  initImages();
  initArrows();
  initLink();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  function initLink() {
    images.forEach((image, index) => {
       let aDiv = `<a class="services-list-item-link n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].link_name}</a>`;
       servicesList.innerHTML += aDiv;
    });
    servicesList.querySelectorAll(".services-list-item-link").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    servicesList.querySelector(".active").classList.remove("active");
    servicesList.querySelector(".n" + num).classList.add("active");
    citytext.innerHTML = images[num].city;
    area.innerHTML = images[num].area;
    time.innerHTML = images[num].time;
    cost.innerHTML = images[num].cost;
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
      servicesList.querySelector(".active").classList.remove("active");
      servicesList.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }
  
  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }
  
  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }
  
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});