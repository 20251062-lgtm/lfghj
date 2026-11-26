// script.js
// 圖片輪播功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有輪播（首頁與產品頁各一個）
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const slide = container.querySelector('.carousel-slide');
        const images = slide.querySelectorAll('.carousel-img');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const dotsContainer = container.querySelector('.carousel-dots');

        if (!slide || images.length === 0) return;

        let currentIndex = 0;
        const totalSlides = images.length;

        // 創建指示點
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        const dots = dotsContainer.querySelectorAll('.dot');

        // 更新輪播位置
        function updateCarousel() {
            slide.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            updateCarousel();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        // 按鈕事件
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // 自動輪播（每5秒）
        let autoInterval = setInterval(nextSlide, 5000);

        // 滑鼠懸停暫停自動輪播
        container.addEventListener('mouseenter', () => {
            clearInterval(autoInterval);
        });
        container.addEventListener('mouseleave', () => {
            autoInterval = setInterval(nextSlide, 5000);
        });

        // 觸控滑動支援（簡單版）
        let touchStartX = 0;
        let touchEndX = 0;
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }, { passive: true });

        // 初始更新
        updateCarousel();
    });

    // 聯絡表單提交回饋（僅前端模擬）
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const feedback = document.getElementById('formFeedback');
            const name = document.getElementById('name').value.trim();

            if (name) {
                feedback.textContent = `謝謝你，${name}！我們已收到你的訊息，將盡快回覆。`;
                feedback.style.color = '#ffb300';
            } else {
                feedback.textContent = '請填寫姓名與訊息後再送出。';
                feedback.style.color = '#ff5722';
            }
        });
    }
});