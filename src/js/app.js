import '../css/style.css';
import Slider from './views/slider';
import table from './table-js/set-table-data';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.slides-wrapper', '.slide', '.arrow-left', '.arrow-right', '.current', '.total');
    slider.render();
});

table.promiceRender()