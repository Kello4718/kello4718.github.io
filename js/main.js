"use strict";

// Переменные
const preloader = document.querySelector('.preloader');
const courses = document.querySelector('.courses');
const coursesMainSlide = document.querySelector('.courses__main-slide');
const coursesMainSlideSource = coursesMainSlide.querySelector('source');
const coursesMainSlideImage = coursesMainSlide.querySelector('img');
const coursesSlidesContainer = courses.querySelector('.courses__slides');
const coursesSlides = coursesSlidesContainer.querySelectorAll('figure');
const hobbyItemsDescription$1 = document.querySelectorAll('.hobby__item-description');
const hobbySvgFrontend$1 = document.querySelector('.hobby__svg-frontend');
const hobbyButton$1 = document.querySelector('.hobby__button');
const slider = document.querySelector('.photo-gallery__slider');
const slides$1 = document.querySelectorAll('.photo-gallery__slide');
const sliderButtons$1 = document.querySelectorAll('.photo-gallery__button');

const changeMainSlide = slide => {
  slide.addEventListener('mouseover', () => {
    if (slide === coursesSlides[0]) {
      coursesMainSlideSource.srcset = './img/html-css.webp';
      coursesMainSlideImage.src = './img/html-css.png';
      coursesMainSlide.classList.add('courses__main-slide--current');
    } else if (slide === coursesSlides[1]) {
      coursesMainSlideSource.srcset = './img/html-css-adaptiv.webp';
      coursesMainSlideImage.src = './img/html-css-adaptiv.png';
      coursesMainSlide.classList.add('courses__main-slide--current');
    } else if (slide === coursesSlides[2]) {
      coursesMainSlideSource.srcset = './img/js.webp';
      coursesMainSlideImage.src = './img/js.png';
      coursesMainSlide.classList.add('courses__main-slide--current');
    } else if (slide === coursesSlides[3]) {
      coursesMainSlideSource.srcset = './img/frontend.webp';
      coursesMainSlideImage.src = './img/frontend.png';
      coursesMainSlide.classList.add('courses__main-slide--current');
    }
  });
  slide.addEventListener('mouseout', () => {
    coursesMainSlide.classList.remove('courses__main-slide--current');
    coursesMainSlideSource.srcset = './img/frontend.webp';
    coursesMainSlideImage.src = './img/frontend.png';
  });
};

for (let i = 0; i < coursesSlides.length; i++) {
  changeMainSlide(coursesSlides[i]);
}

console.log(coursesMainSlideImage); // Переменные
//const preloader = document.querySelector('.preloader');

const hobbyItemsDescription = document.querySelectorAll('.hobby__item-description');
const hobbySvgFrontend = document.querySelector('.hobby__svg-frontend');
const hobbyButton = document.querySelector('.hobby__button'); //const slider = document.querySelector('.photo-gallery__slider');

const slides = document.querySelectorAll('.photo-gallery__slide');
const sliderButtons = document.querySelectorAll('.photo-gallery__button');
let currentOrder = 0; // Прелоэдер

window.addEventListener('load', () => {
  preloader.remove();
}); // Кнопка в разделе хобби

hobbyButton.addEventListener('click', () => {
  hobbyButton.remove();
  hobbyItemsDescription[7].textContent = 'Фронтенд-разработка';
  hobbySvgFrontend.classList.remove('hide');
}); // Функция определяющая положение каждого слайда

const toSetPositionOfSlide = () => {
  const {
    width,
    height
  } = slider.getBoundingClientRect();
  const a = width / 2;
  const b = height / 2;
  const delta = Math.PI / slides.length / 4;

  for (let i = 0; i < slides.length; i++) {
    const leftSlide = document.querySelector(`.photo-gallery__slide[data-order='${currentOrder - i}']`);

    if (leftSlide) {
      leftSlide.style.zIndex = slides.length - i;
      leftSlide.style.opacity = 1 - 1.5 * i / slides.length;
      leftSlide.style.left = `${width / 2 + a * Math.cos(Math.PI * 3 / 2 - delta * i * 2)}px`;
      leftSlide.style.top = `${-b * Math.sin(Math.PI * 3 / 2 - delta * i * 2)}px`;
    }

    const rightSlide = document.querySelector(`.photo-gallery__slide[data-order='${currentOrder + i}']`);

    if (rightSlide) {
      rightSlide.style.zIndex = slides.length - i;
      rightSlide.style.opacity = 1 - 1.5 * i / slides.length;
      rightSlide.style.left = `${width / 2 + a * Math.cos(Math.PI * 3 / 2 + delta * i * 2)}px`;
      rightSlide.style.top = `${-b * Math.sin(Math.PI * 3 / 2 + delta * i * 2)}px`;
    }
  }
}; // Функция переключения слайда по самому слайду


function slideHandler() {
  const order = parseInt(this.dataset.order, 10);
  currentOrder = order;
  toSetPositionOfSlide();
} // Функция переключения слайда по кнопке


function buttonHandler() {
  const {
    dir
  } = this.dataset;

  if (dir === 'prev') {
    currentOrder = Math.max(0, currentOrder - 1);
  } else if (dir === 'next') {
    currentOrder = Math.min(slides.length - 1, currentOrder + 1);
  }

  toSetPositionOfSlide();
} // Функция, запускающая слайдер


const activateSlider = () => {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.dataset.order = i;
    slide.style.transform = 'translate(-50%, -50%)';
    slide.addEventListener('click', slideHandler);
  }

  for (const sliderButton of sliderButtons) {
    sliderButton.addEventListener('click', buttonHandler);
  }

  currentOrder = Math.floor(slides.length / 2);
  toSetPositionOfSlide();
};

activateSlider();