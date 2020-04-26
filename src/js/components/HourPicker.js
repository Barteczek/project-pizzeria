/* global rangeSlider */

import {select, settings} from '../settings.js';
import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';



class HourPicker extends BaseWidget {
  constructor(wrapper){
    super(wrapper, settings.hours.open);

    const thisWidget = this;
    
    thisWidget.dom.input = wrapper.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = wrapper.querySelector(select.widgets.hourPicker.output);

    thisWidget.initPlugin();
    thisWidget.setValue(thisWidget.dom.input.value);     
  }

  parseValue(value){
    return utils.numberToHour(value);
  }

  isValid(){
    return true;
  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.output.innerText = thisWidget.value;
  }

  renderSliderColor({red = [], yellow = []}){
    const thisWidget = this;

    const renderedSlider = thisWidget.availableHours.querySelector('.available-hours');
  
    renderedSlider.innerHTML = '';
    
    const range = Math.round(parseFloat(thisWidget.dom.input.max) - parseFloat(thisWidget.dom.input.min));
    const step = parseFloat(thisWidget.dom.input.step);
    const width = (100 / range * step);   
  
    for(let element of yellow) {
      renderedSlider.innerHTML += '<div class=available-hours__yellow style="width: '+ width +'%; left: ' + (element - parseFloat(thisWidget.dom.input.min))/step * width +'%"></div>';
      
    }

    for(let element of red) {
      renderedSlider.innerHTML += '<div class=available-hours__red style="width: '+ width +'%; left: ' + (element - parseFloat(thisWidget.dom.input.min))/step * width +'%"></div>';

    }
  }  

  initPlugin(){
    const thisWidget = this;
    rangeSlider.create(thisWidget.dom.input);

    thisWidget.availableHours = thisWidget.dom.wrapper.querySelector('.rangeSlider');
    const newSlider = document.createElement('div');
    newSlider.classList.add('available-hours');
    thisWidget.availableHours.appendChild(newSlider);

    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.setValue(thisWidget.dom.input.value);  
    });
  }
}

export default HourPicker;