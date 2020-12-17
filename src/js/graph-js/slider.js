class GraphSlider{
    constructor(renderF,parentGraph){
        this.parent = parentGraph;
        this.renderF = renderF;
        this.val = 'cases';
        this.headWrapper = document.querySelector('#graph .slider-bg');
        this.head = document.querySelector('#graph .slider-bg .slider-head');
        this.btns  = document.querySelectorAll('#graph .slider-front div');
        this.vals = ['cases', 'deaths', 'recovered'];

        this.btns.forEach((v,i)=>{
            v.addEventListener('click',()=>{
                this.setVal(i)
            })
        })
    }
    setVal(i){
        this.vals.forEach(v=>{
            this.headWrapper.classList.remove(v);
        })
        this.val = this.vals[i];
        this.headWrapper.classList.add(this.vals[i]);
        this.renderF(this.vals[i]);
    }
}
export default GraphSlider