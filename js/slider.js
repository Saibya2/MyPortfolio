class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.track = this.slider.querySelector('.slider-track');
        this.slides = Array.from(this.track.children);
        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');
        this.dotsContainer = this.slider.parentElement.querySelector('.slider-dots');
        this.currentIndex = 0;
        this.dots = [];
        this.init();
    }

    init() {
        if (this.dotsContainer) {
            this.createDots();
        }

        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoSlide();
        this.addHoverEffect();
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * this.slider.offsetWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateDots();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex = this.currentIndex - 1;
        } else {
            this.currentIndex = this.slides.length - 1;
        }
        this.updateSlidePosition();
    }

    bindEvents() {
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
    }

    startAutoSlide() {

        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
    }


    addHoverEffect() {
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    createDots() {
        this.dotsContainer.innerHTML = '';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');

            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSlidePosition();
            });

            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider('.slider');
});