document.addEventListener('DOMContentLoaded', () => {
  const w = window.innerWidth;
  if (w >= 1440 && w <= 1920) {
    const watch = document.querySelector('.hero__watch');
    if (!watch) return;

    watch.animate([
      {
        opacity: 0,
        transform: 'translate(-50%, -60%) scale(0.92)'
      },
      {
        opacity: 1,
        transform: 'translate(-50%, -52%) scale(1.03)'
      },
      {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)'
      }
    ], {
      duration: 1800,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // натуральное "втекание"
      fill: 'forwards'
    });
  }
});
