require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from'./modules/tabs';
import modal from'./modules/modal';
import timer from'./modules/timer';
import cards from'./modules/cards';
import calc from'./modules/calc';
import form from'./modules/forms';
import slider from'./modules/slider';
import openModal from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
    
const modalTimerId = setTimeout(()=>openModal('.modal', modalTimerId), 300000);

tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
modal('[data-modal]', '.modal', modalTimerId);
timer('.timer', '2023-01-11');
cards();
calc();
form('form', modalTimerId);
slider({ 
    conteiner: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prewArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currrentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field:'.offer__slider-inner'
});


});