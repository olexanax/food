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