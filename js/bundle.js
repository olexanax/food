/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
     //calc

     const result = document.querySelector('.calculating__result span');
     let sex,
         height, weight, age,
         ratio;
     startValueRatio(ratio, "ratio", 1.725);

     function startValueRatio(inputt, key, value){
         if(localStorage.getItem(key)){
             ratio = localStorage.getItem(key);
             document.querySelectorAll('.calculating__choose-item').forEach(item=>{
                 if(item.getAttribute('data-ratio') == localStorage.getItem(key)){
                     item.classList.add('calculating__choose-item_active');
                 }
             });
         } else{
             ratio = value;
             localStorage.setItem(key, value);
             document.querySelectorAll('.calculating__choose-item').forEach(item=>{                    
                 if(item.getAttribute('data-ratio') == localStorage.getItem(key)){
                     item.classList.add('calculating__choose-item_active');
                 }
             });
         }
     }
     startValueSex(sex, 'sex', 'male');

     function startValueSex(inputt, key, value){
         if(localStorage.getItem(key)){
             sex = localStorage.getItem(key);
             document.querySelectorAll('.calculating__choose-item').forEach(item=>{
                 if(item.id == localStorage.getItem(key)){
                     item.classList.add('calculating__choose-item_active');
                 }
             });
         } else{
             sex = value;
             localStorage.setItem(key, value);
             document.querySelectorAll('.calculating__choose-item').forEach(item=>{
                 if(item.id == localStorage.getItem(key)){
                     item.classList.add('calculating__choose-item_active');
                 }
             });
         }
     }
     console.log(sex, ratio);
 
     function calcTotal() {
         if (!sex || !height || !weight || !age || !ratio) {
             result.textContent = '____'; 
             return;
         }
         if (sex === 'female') {
             result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else {
             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
         }
     }
 
     calcTotal();
 
     function getStaticInformation(parentSelector, activeClass) {
         const elements = document.querySelectorAll(`${parentSelector} div`);
 
         elements.forEach(elem => {
             elem.addEventListener('click', (e) => {
                 if (e.target.getAttribute('data-ratio')) {
                     ratio = +e.target.getAttribute('data-ratio');
                     localStorage.setItem('ratio', ratio);
                 } else {
                     sex = e.target.getAttribute('id');
                     localStorage.setItem('sex',sex);
                 }
     
                 elements.forEach(elem => {
                     elem.classList.remove(activeClass);
                 });
     
                 e.target.classList.add(activeClass);
     
                 calcTotal();
             });
         });
     }
 
     getStaticInformation('#gender', 'calculating__choose-item_active');
     getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
 
     function getDynamicInformation(selector) {
         const input = document.querySelector(selector);
         input.addEventListener('input', () => {
             isValueNumber(input);
             switch(input.getAttribute('id')) {
                 case "height":
                     height = +input.value;
                     break;
                 case "weight":
                     weight = +input.value;
                     break;
                 case "age":
                     age = +input.value;
                     break;
             }
 
             calcTotal();
         });
     }
     function isValueNumber(item){
         if(item.value.match(/\D/g)){
             item.style.border = '1px solid red';
         }else{
             item.style.border = '';
         }
     }
 
     getDynamicInformation('#height');
     getDynamicInformation('#weight');
     getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
 // cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });
    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });
}
module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms(){
// Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}


function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
    
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}
}
module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
 // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
    });

    function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

    function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal();
    }
    });

    document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) { 
        closeModal();
    }
    });

    const modalTimerId = setTimeout(openModal, 300000);

    function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
    }
    window.addEventListener('scroll', showModalByScroll);

}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    //slider 
    const arrowNext = document.querySelector('.offer__slider-next'),
    arrowBack = document.querySelector('.offer__slider-prev'),
    currentSlideNum = document.querySelector('#current'),
    totalSlideNum = document.querySelector('#total'),
    slides = document.querySelectorAll('.offer__slide'),
    sliderWrpper = document.querySelector('.offer__slider-wrapper'),
    sliderField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(sliderWrpper).width,
    dotConteiner = document.createElement('ol'),
    dot = document.createElement('li'),
    allSlideDiv = document.querySelector('.offer__slider');
    let num = 0,
        offset = 0;
    
    slides.forEach(item=>{
        item.style.width = width;
    });
    sliderField.style.width = 100 * slides.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';
    sliderWrpper.style.overflow = 'hidden';

    
    function deleteLetters(str){
        return +str.replace(/\D/g,'');
    }

    arrowNext.addEventListener('click', ()=>{
        if(offset == deleteLetters(width) * (slides.length -1)){
            offset = 0;
            num = -1;
        } else {
            offset += deleteLetters(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;
        num++;
        showSlideNum(num);
        currentDotAnimation(num);
    });
    arrowBack.addEventListener('click', ()=>{
        if(offset == 0){
            offset = deleteLetters(width) * (slides.length -1);
            num = slides.length;
        } else {
            offset -= deleteLetters(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;
        num--;
        showSlideNum(num);
        currentDotAnimation(num);
    });
    
    function calcTotalSlides(){
        if(slides.length > 9){
            totalSlideNum.textContent = `${slides.length}`;
        } else {
            totalSlideNum.textContent = `0${slides.length}`;
        }
    }
    calcTotalSlides();

    function showSlideNum(number = 0){
        if(number > 8){
            currentSlideNum.textContent = `${number+1}`;
        } else {
            currentSlideNum.textContent = `0${number+1}`;
        }
    }
    showSlideNum();

    //dots on slider

    dotConteiner.classList.add('carousel-indicators');
    dot.classList.add('dot');
    allSlideDiv.style.position = 'relative';

    function addDots(){
        let htmlText='';
        for(let i = 1; i<= slides.length; i++){
            htmlText += '<li class="dot"></li>';
        }
        return htmlText;
    }
    dotConteiner.innerHTML= addDots();
    allSlideDiv.append(dotConteiner);
    const dots = document.querySelectorAll('.dot');

    function currentDotAnimation(num = 0){
        dots.forEach(dot=>{
            dot.style.backgroundColor = '';
        });
        dots[num].style.backgroundColor = 'grey';
    }
    currentDotAnimation();

    dots.forEach((dot, i)=>{
        dot.addEventListener('click', ()=>{
            
            offset = deleteLetters(width) * (i);
            num = i;
            sliderField.style.transform = `translateX(-${offset}px)`;
            showSlideNum(num);
            currentDotAnimation(num);
        });
    });
}
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
     // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
      // Timer

    const deadline = '2023-01-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', function() {

const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
      modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
      timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
      cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
      calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
      form = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
      slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

tabs();
modal();
timer();
cards();
calc();
form();
slider();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map