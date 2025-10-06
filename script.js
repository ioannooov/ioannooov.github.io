document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. АНИМАЦИЯ СНЕГА ---
    const snowContainer = document.getElementById('snow-container');
    const snowCount = 60; 

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 3 + 1; 
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * -15; 
        
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        snowContainer.appendChild(snowflake);

        snowflake.addEventListener('animationiteration', () => {
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 15 + 10}s`;
            snowflake.style.animationDelay = `${Math.random() * -5}s`;
        });
    }

    for (let i = 0; i < snowCount; i++) {
        createSnowflake();
    }


    // --- 2. 3D-ЭФФЕКТ (PARALLAX/TILT) НА HERO (Только для ПК) ---
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Расчет смещения от центра (от -1 до 1)
            const offsetX = (mouseX - centerX) / centerX;
            const offsetY = (mouseY - centerY) / centerY;

            // Применяем небольшой наклон (max 3 градуса)
            const tiltY = offsetX * 3;
            const tiltX = offsetY * -3;

            // Применяем transform
            heroSection.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }


    // --- 3. МОДАЛЬНОЕ ОКНО (Увеличение фото) ---
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const closeBtn = document.getElementsByClassName("close-btn")[0];
    const images = document.querySelectorAll('.zoomable-image');

    images.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            document.body.classList.add('modal-open');
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    }

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = ".modal-open { overflow: hidden; }";
    document.head.appendChild(styleSheet);


    // --- 4. SWIPER (КАРУСЕЛЬ ОТЗЫВОВ) ---
    const swiper = new Swiper('.reviews-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        }
    });


    // --- 5. МОБИЛЬНОЕ МЕНЮ ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.navigation a');

    menuToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
        document.body.classList.toggle('modal-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navigation.classList.contains('active')) {
                navigation.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    });
});