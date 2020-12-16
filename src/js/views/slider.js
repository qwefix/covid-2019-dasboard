export default class Slider {
    constructor(page, slide, arrowLeft, arrowRight, current, total) {
        this.page = document.querySelector(page);
        this.slides = document.querySelectorAll(slide);
        this.arrowLeft = document.querySelector(arrowLeft);
        this.arrowRight = document.querySelector(arrowRight);
        this.current = document.querySelector(current);
        this.total = document.querySelector(total);
        this.slideIndex = 1;
        this.totalNum =  this.slides.length;
        this.currentNum = this.slideIndex;
    }

    showSlides(n) {
        this.total.textContent = this.totalNum;
        this.currentNum = this.slideIndex;
        if (n > this.slides.length) {
            this.slideIndex = 1;
            this.currentNum = 1;
        } 
        if (n < 1) {
            this.slideIndex = this.slides.length;
            this.currentNum = this.slides.length;
        }
        this.current.textContent = this.currentNum;
        this.slides.forEach(slide => slide.style.display = 'none');
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    presSlide(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        this.arrowLeft.addEventListener('click', () => {
            this.presSlide(1)
        });
        this.arrowRight.addEventListener('click', () => {
            this.presSlide(-1)
        })
        this.showSlides(this.slideIndex);
    }

}