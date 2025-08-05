document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonials__slider__track");
  
  if (window.innerWidth >= 450 && window.innerWidth <= 1920) {
    const slides = Array.from(track.children);
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });
  }

  if  (window.innerWidth < 450){
  console.log("Мобильный свайп активирован");
  
  track.scrollLeft = 0;
  const slides = Array.from(track.children);
  const slideWidth = slides[0].offsetWidth + 24; // 24 — твой margin-right

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.style.transform = `translateX(0px)`;

  track.addEventListener('touchstart', (e) => {
    document.body.classList.add("no-scroll");
    isDragging = true;
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', (e) => {
    e.preventDefault();
    document.body.classList.remove("no-scroll");
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const delta = currentX - startX;
    track.style.transform = `translateX(${delta}px)`;
  },{ passive: false });

  track.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  const delta = currentX - startX;

  if (Math.abs(delta) > slideWidth / 4) {
    if (delta < 0) {
      // ➡️ Свайп влево
      track.style.transition = 'transform 0.3s ease';
      track.style.transform = `translateX(-${slideWidth}px)`;

      track.addEventListener('transitionend', function moveLeft() {
        track.appendChild(track.children[0]);
        track.style.transition = 'none';
        track.style.transform = `translateX(0px)`;
        track.removeEventListener('transitionend', moveLeft);
      });

    } else {
      // ⬅️ Свайп вправо (исправлено)
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