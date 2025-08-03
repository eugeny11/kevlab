/* (function(){
    const img = document.querySelector('.hero__background__image');
    // Дефолтная и крайние ширины (в px)
    const MIN_W = 440;
    const MAX_W = 1920;
    // Насколько процентов в сумме хотим сместить от центра
    const MAX_SHIFT = 30; 
    
    function updateHeroPos(){
      const w = window.innerWidth;
      // t = 0 при >=MAX_W, t = 1 при <=MIN_W
      let t = (MAX_W - w) / (MAX_W - MIN_W);
      t = Math.max(0, Math.min(1, t));
      // итоговая позиция: 50% + t * MAX_SHIFT
      const pos = 50 + t * MAX_SHIFT;
      img.style.setProperty('--hero-pos', pos + '%');
    }

    window.addEventListener('resize', updateHeroPos);
    updateHeroPos();
  })(); */