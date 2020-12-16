import '../css/style.css';
import Slider from './views/slider';
import table from './table-js/table';
import setupGraph from './graph-js/graph';


window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.slides-wrapper', '.slide', '.arrow-left', '.arrow-right', '.current', '.total');
    slider.render();
});
setupGraph()