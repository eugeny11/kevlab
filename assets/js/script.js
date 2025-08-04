document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonials__slider__track");
  const slides = Array.from(track.children);

  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
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
  
});