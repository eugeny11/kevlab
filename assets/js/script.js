document.addEventListener("DOMContentLoaded", function () {
let track = document.querySelector('.testimonials__slider__track');
const slideGap = 24;
let slideWidth;

let isDesktopActive = false;
let isMobileActive = false;
let intervalId;

function initDesktopSlider() {
  if (isDesktopActive) return;
  isDesktopActive = true;
  isMobileActive = false;

  clearMobileSwipe(); 
  console.log("Автопрокрутка активирована");

  const slides = Array.from(track.children);
  slideWidth = slides[0].offsetWidth + slideGap;

  // Клонируем для бесконечности
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  // Автоматическая пошаговая прокрутка
  intervalId = setInterval(() => {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${slideWidth}px)`;

    track.addEventListener('transitionend', function onTransition() {
      track.appendChild(track.children[0]);
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      track.removeEventListener('transitionend', onTransition);
    });
  }, 3000); // каждые 3 секунды
}


function initMobileSwipe() {
  if (isMobileActive) return;
  isMobileActive = true;
  isDesktopActive = false;

  console.log("Мобильный свайп активирован");

  clearAutoscroll();

  const slides = Array.from(track.children);
  slideWidth = slides[0].offsetWidth;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let isDragging = false;

  track.style.transform = `translateX(0px)`;

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;

    deltaX = currentX - startX;
    deltaY = currentY - startY;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      isDragging = false;
      return;
    }

    e.preventDefault();
    track.style.transform = `translateX(${deltaX}px)`;
  }, { passive: false });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const delta = currentX - startX;

    if (Math.abs(delta) > slideWidth / 4) {
      if (delta < 0) {
        // Свайп влево
        track.style.transition = 'transform 0.3s ease';
        track.style.transform = `translateX(-${slideWidth}px)`;

        track.addEventListener('transitionend', function moveLeft() {
          track.appendChild(track.children[0]);
          track.style.transition = 'none';
          track.style.transform = `translateX(0px)`;
          track.removeEventListener('transitionend', moveLeft);
        });

      } else {
        // Свайп вправо
        track.style.transition = 'none';
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transform = `translateX(-${slideWidth}px)`;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            track.style.transition = 'transform 0.3s ease';
            track.style.transform = `translateX(0px)`;
          });
        });
      }
    } else {
      // короткий свайп — возврат
      track.style.transition = 'transform 0.3s ease';
      track.style.transform = `translateX(0px)`;
    }
  });
}

function clearAutoscroll() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  track.style.transition = 'none';
  track.style.transform = 'translateX(0)';
}

function clearMobileSwipe() {
  track.replaceWith(track.cloneNode(true)); 
  const newTrack = document.querySelector('.testimonials__slider__track');
  track = newTrack;
  track.parentNode.replaceChild(newTrack, track);
  
}

function checkScreenMode() {
  const width = window.innerWidth;

  if (width >= 450 && width <= 1920) {
    initDesktopSlider();
  } else if (width < 450) {
    initMobileSwipe();
  }
}

checkScreenMode();

window.addEventListener('resize', () => {
  checkScreenMode();
});

  

   if (window.innerWidth >= 1450 && window.innerWidth <= 1920) {
    const items = document.querySelectorAll('.services__list__item');

    items.forEach(item => {
      const arrowBlock = item.querySelector('.services__list-arrow-block');
      const textFlex = item.querySelector('.list__text-flex');

      arrowBlock.addEventListener('mouseenter', () => {
        textFlex.classList.add('show-image');
      });

      arrowBlock.addEventListener('mouseleave', () => {
        textFlex.classList.remove('show-image');
      });
    });
  }

   const toggle = document.querySelector('.header__menu-toggle');
  const menuList = document.querySelector('.header__menu-list');

  toggle.addEventListener('click', () => {
    menuList.classList.toggle('active');
  });

  const footerLogo = document.querySelector('.footer__logo__img');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footerLogo.classList.add('animate-in');
      } else {
        footerLogo.classList.remove('animate-in');
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(footerLogo);

   const watch = document.querySelector('.hero__watch');

  if (window.innerWidth >= 1440 && window.innerWidth <= 1920) {
    watch.classList.add('animate-watch-once');
  }
  
});