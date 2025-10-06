document.addEventListener('DOMContentLoaded', () => {

    // --- Анимация снега ---
    const snowContainer = document.getElementById('snow-container');
    const snowflakesCount = 100;

    for (let i = 0; i < snowflakesCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 4 + 1; // от 1 до 5px
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`; // от 5 до 15с
        snowflake.style.animationDelay = `${Math.random() * 5}s`;

        snowContainer.appendChild(snowflake);
    }

    // --- Модальное окно для изображений (Lightbox) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const imagesToPopup = document.querySelectorAll('.popup-image');

    imagesToPopup.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex'; // Используем flex для центрирования
            modalImg.src = img.src;
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Инициализация Swiper.js для карусели отзывов ---
    const swiper = new Swiper('.reviews-slider', {
        loop: true,
        slidesPerView: 1, // По умолчанию 1 слайд
        spaceBetween: 30,
        
        // Навигационные стрелки
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Адаптивность: больше слайдов на широких экранах
        breakpoints: {
            // когда ширина экрана >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // когда ширина экрана >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });
});
