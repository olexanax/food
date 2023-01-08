function slider({conteiner, slide ,nextArrow, prewArrow, totalCounter, currrentCounter, wrapper, field}){
    //slider 
    const arrowNext = document.querySelector(nextArrow),
    arrowBack = document.querySelector(prewArrow),
    currentSlideNum = document.querySelector(currrentCounter),
    totalSlideNum = document.querySelector(totalCounter),
    slides = document.querySelectorAll(slide),
    sliderWrpper = document.querySelector(wrapper),
    sliderField = document.querySelector(field),
    width = window.getComputedStyle(sliderWrpper).width,
    dotConteiner = document.createElement('ol'),
    dot = document.createElement('li'),
    allSlideDiv = document.querySelector(conteiner);
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
export default slider;