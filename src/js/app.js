import '../css/style.css';
import Slider from './views/slider';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.slides-wrapper', '.slide', '.arrow-left', '.arrow-right', '.current', '.total');
    slider.render();
});