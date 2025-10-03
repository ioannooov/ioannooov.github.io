document.addEventListener("DOMContentLoaded", () => {
    // Обновление года в футере
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Анимация снежинок
    const canvas = document.getElementById('snow');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        const mp = 100;
        const particles = [];
        for (let i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 4 + 1,
                d: Math.random() * mp
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            for (let i = 0; i < mp; i++) {
                const p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();
        }

        let angle = 0;
        function update() {
            angle += 0.01;
            for (let i = 0; i < mp; i++) {
                const p = particles[i];
                p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle) * 2;
                if (p.x > W + 5 || p.x < -5 || p.y > H) {
                    if (i % 3 > 0) {
                        particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
                    } else {
                        if (Math.sin(angle) > 0) {
                            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
                        } else {
                            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
                        }
                    }
                }
            }
        }

        setInterval(draw, 33);
        window.addEventListener('resize', () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        });
    }

    // --- Карусель отзывов ---
    const track = document.querySelector(".carousel-track");
    const slides = track ? Array.from(track.children) : [];
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    let slideWidth = slides.length ? slides[0].getBoundingClientRect().width : 0;
    let currentIndex = 0;

    const setSlidePosition = () => {
        if (!slides.length) return;
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + "px";
        });
        moveToSlide(currentIndex, false);
    };

    const moveToSlide = (index, animate = true) => {
        if (!slides.length) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;

        if (!animate) {
            track.style.transition = "none";
        } else {
            track.style.transition = "transform 0.5s ease";
        }
        track.style.transform = "translateX(-" + slides[currentIndex].style.left + ")";

        if (!animate) {
            void track.offsetWidth;
            track.style.transition = "transform 0.5s ease";
        }
    };

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            moveToSlide(currentIndex + 1);
        });
    }
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            moveToSlide(currentIndex - 1);
        });
    }

    window.addEventListener("resize", setSlidePosition);
    setSlidePosition();

    // --- Модальное окно для изображений ---
    const images = document.querySelectorAll('.gallery-item img, .service-card img');
    if (images.length > 0) {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
          <span class="modal-close">&times;</span>
          <img class="modal-content" id="modal-img">
        `;
        document.body.appendChild(modal);

        const modalImg = document.getElementById('modal-img');
        const modalClose = modal.querySelector('.modal-close');

        images.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
            });
        });

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
