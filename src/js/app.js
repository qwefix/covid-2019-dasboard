import '../css/style.css';
import Slider from './views/slider';
import setupTable from './table-js/main';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.slides-wrapper', '.slide', '.arrow-left', '.arrow-right', '.current', '.total');
    slider.render();
});
setupTable();
