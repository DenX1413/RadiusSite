// Слайдер "Наша техника"
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtns = document.querySelectorAll('.prev-btn'); // Все кнопки "назад"
    const nextBtns = document.querySelectorAll('.next-btn'); // Все кнопки "вперед"
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    let slideInterval;
    const autoplayDelay = 5000;
    
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === currentIndex) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                goToSlide(index);
                restartAutoplay();
            });
            
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    function startAutoplay() {
        stopAutoplay();
        slideInterval = setInterval(nextSlide, autoplayDelay);
        
        const indicator = document.querySelector('.autoplay-indicator i');
        if (indicator) {
            indicator.classList.remove('fa-pause');
            indicator.classList.add('fa-play');
        }
    }
    
    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
            
            const indicator = document.querySelector('.autoplay-indicator i');
            if (indicator) {
                indicator.classList.remove('fa-play');
                indicator.classList.add('fa-pause');
            }
        }
    }
    
    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    createDots();
    startAutoplay();
    
    // Добавляем обработчики для ВСЕХ кнопок "назад"
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            prevSlide();
            restartAutoplay();
        });
    });
    
    // Добавляем обработчики для ВСЕХ кнопок "вперед"
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            nextSlide();
            restartAutoplay();
        });
    });
    
    const sliderContainer = document.querySelector('.equipment-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }
    
    // Обработка свайпов для мобильных
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
            restartAutoplay();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
            restartAutoplay();
        }
    }
    
    window.addEventListener('resize', function() {
        goToSlide(currentIndex);
    });
});