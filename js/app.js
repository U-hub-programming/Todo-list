let colorMod = document.getElementById('change-color-mod');
let bgImage = document.getElementById('bg-img');
let pushingSection = document.getElementById('pushing-section');
let formTodo = document.getElementById('form-todo');
let inputTodo = document.getElementById('todo-input');
let todoLength = document.querySelectorAll('.todo-length');
let allButton = document.querySelectorAll('.filter-all');
let completedButton = document.querySelectorAll('.filter-completed');
let activeButton = document.querySelectorAll('.filter-active');
let clearCompleted = document.querySelectorAll('.filter-clear-completed');
let checkIcon = document.querySelectorAll('.check-icon');

findLength()
filter()


formTodo.addEventListener('submit', function (e) {
    e.preventDefault();
    let currentValue = inputTodo.value;
    createTodo(currentValue);
    
    clearCompleted.forEach(element => {
        element.addEventListener('click', function(e){
            for(let element of pushingSection.children){
                if(element.className.includes('checked')){
                    pushingSection.removeChild(element)
                }
            }
        });
    })
    filter();
    findLength()
});


document.addEventListener('click',function(e){
    if(e.target && (e.target.className.includes('check-click') || e.target.className.includes('click-check-icon'))){
          if(e.target.className.includes('check-click')){
            if(!e.target.className.includes('check-click-or-not')){
                e.target.classList.add('check-click-or-not');
                e.target.parentElement.classList.add('checked')
                changeOpacityAndTextDecoration(e.target);
            } else{
                e.target.classList.remove('check-click-or-not');
                e.target.parentElement.classList.remove('checked')
                resetOpacityAndTextDecoration(e.target);
            }
          } else{
              if(!e.target.parentElement.className.includes('check-click-or-not')){
                e.target.parentElement.classList.add('check-click-or-not')
                e.target.closest('li').classList.add('checked')
                changeOpacityAndTextDecoration(e.target);
              } else{
                  e.target.parentElement.classList.remove('check-click-or-not');
                  e.target.closest('li').classList.remove('checked')
                  resetOpacityAndTextDecoration(e.target);
              }
              
          }
     }
     if(e.target && e.target.className === 'close-icon'){
         e.target.parentElement.remove();
     }
     findLength()
 });



function filter(){
    allButton.forEach(element =>{
        element.addEventListener('click', function(e){
            element.style.color = 'hsl(220, 98%, 61%)';
            activeButton.forEach(ele =>{
                ele.style.color = 'hsl(236, 9%, 61%)';
            });
            completedButton.forEach(ele =>{
                ele.style.color = 'hsl(236, 9%, 61%)';
            });
    
            for(let element of pushingSection.children){
                element.style.display = 'flex';
            }
    })

    });

    activeButton.forEach(element =>{
        element.addEventListener('click', function(e){
            activeButton.forEach(ele =>{
                ele.style.color = 'hsl(220, 98%, 61%)';
            });
            allButton.forEach(ele =>{
                ele.style.color = 'hsl(236, 9%, 61%)';
            })
            completedButton.forEach(ele => {
                ele.style.color = 'hsl(236, 9%, 61%)';
            })
    
            for(let element of pushingSection.children){
                element.style.display = 'flex';
            }
            for(let element of pushingSection.children){
                if(element.className.includes('checked')){
                    element.style.display = 'none'
                }
            }
    })
    });

    completedButton.forEach(element => {
        element.addEventListener('click', function(e){
            completedButton.forEach(ele => {
                ele.style.color = 'hsl(220, 98%, 61%)';
            })
            activeButton.forEach(ele => {
                ele.style.color = 'hsl(236, 9%, 61%)';
            })
            allButton.forEach(ele => {
                ele.style.color = 'hsl(236, 9%, 61%)';
            })
    
            for(let element of pushingSection.children){
                element.style.display = 'flex';
            }
            for(let element of pushingSection.children){
                if(!element.className.includes('checked') && element.className.includes('new-push')){
                    element.style.display = 'none'
                }
            }
        });
    })
}

function changeOpacityAndTextDecoration(ele){
    ele.closest('li').style.textDecoration = 'line-through';
    if(colorMod.dataset.check == 'true'){
    ele.closest('li').style.color = 'hsl(234, 39%, 85%)'
    } else{
    ele.closest('li').style.color = 'hsl(235, 19%, 35%)'
    };
}

function resetOpacityAndTextDecoration(element){
    element.closest('li').style.textDecoration = 'none';
    if(colorMod.dataset.check == 'true'){
        element.closest('li').style.color = 'hsl(235, 19%, 35%)'
        } else{
        element.closest('li').style.color = 'hsl(234, 39%, 85%)'
    };
}

function createTodo(value) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    let iconCheck = document.createElement('img');
    let iconClose = document.createElement('img');
    let p = document.createElement('p');

    li.classList.add('new-push');
    li.setAttribute('draggable', 'true');
    p.textContent = value;
    p.style.width = '80%';
    
    span.classList.add('checkbox-section-light', 'check-click');
    span.setAttribute('role', 'button');
    span.setAttribute('tabindex', '0');
    
    if(colorMod.dataset.check == 'false'){
        li.style.backgroundColor = 'hsl(235, 24%, 19%)';
        li.style.borderColor = 'hsl(234, 11%, 52%)';
        li.style.color = 'hsl(234, 39%, 85%)'
        span.style.borderColor = 'hsl(233, 14%, 35%)';
    }
    iconCheck.setAttribute('alt', 'check icon');
    iconCheck.setAttribute('src', './images/icon-check.svg');
    iconCheck.classList.add('click-check-icon');
    iconCheck.classList.add('check-icon');
    span.append(iconCheck);

    iconClose.classList.add('close-icon');
    iconClose.setAttribute('src', './images/icon-cross.svg');
    iconClose.setAttribute('alt', 'close icon');
    iconClose.setAttribute('role', 'button');
    iconClose.setAttribute('tabindex', '0');

    li.append(span, p, iconClose);
    pushingSection.insertBefore(li, pushingSection.children[1]);

    inputTodo.value = '';

};

function findLength(){
    let counter = 0
    for(let element of pushingSection.children){
        if(element.className.includes('new-push') && element.style.display !== 'none'){
            counter++;
        }
    }
    todoLength.forEach(element => {
        element.textContent = counter + ' items left'
    })
}



colorMod.addEventListener('click', function(e){
    if(colorMod.dataset.check == 'true'){
        colorMod.src = './images/icon-sun.svg';
        colorMod.dataset.check = 'false';
        document.querySelector('body').style.backgroundColor = 'hsl(235, 21%, 11%';
        if(window.screen.width > 375){
            bgImage.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
        } else{
            bgImage.style.backgroundImage = "url('./images/bg-mobile-dark.jpg')";
        }
        let checkIcon = document.querySelectorAll('.check-icon');
        for (let i = 0; i < checkIcon.length; i++) {
            checkIcon[i].src = './images/icon-check-dark.svg';
          }
        let x = document.querySelectorAll('li')
        for (let i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "hsl(235, 24%, 19%)";
            x[i].style.borderColor = 'hsl(234, 11%, 52%)'
            x[i].style.color = 'hsl(234, 39%, 85%)'
          }
        inputTodo.style.backgroundColor = 'hsl(235, 24%, 19%)';
        inputTodo.style.color = 'hsl(234, 39%, 85%)'
        document.querySelectorAll('.checkbox-section-light').forEach(element =>{
            element.style.borderColor = 'hsl(233, 14%, 35%)';
        })
        allButton.forEach(ele => {
            ele.style.backgroundColor = 'hsl(235, 24%, 19%)';
        })
        activeButton.forEach(ele => {
            ele.style.backgroundColor = 'hsl(235, 24%, 19%)';
        })
        completedButton.forEach(ele => {
            ele.style.backgroundColor = 'hsl(235, 24%, 19%)';
        })
        clearCompleted.forEach(ele => {
            ele.style.backgroundColor = 'hsl(235, 24%, 19%)';
        })
        todoLength.forEach(ele => {
            ele.style.backgroundColor = 'hsl(235, 24%, 19%)';
        })
    } else{
        colorMod.src = './images/icon-moon.svg';
        colorMod.dataset.check = 'true';
        document.querySelector('body').style.backgroundColor = 'hsl(236, 33%, 92%)';
       if(window.screen.width > 375){
        bgImage.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
       } else{
        bgImage.style.backgroundImage = "url('./images/bg-mobile-light.jpg')";
       }
       let checkIcon = document.querySelectorAll('.check-icon');
        for (let i = 0; i < checkIcon.length; i++) {
            checkIcon[i].src = './images/icon-check.svg';
          }
        let x = document.querySelectorAll('li')
        for (let i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "#fff";
            x[i].style.borderColor = 'hsl(236, 33%, 92%)'
            x[i].style.color = 'hsl(235, 19%, 35%)'
          }
        inputTodo.style.backgroundColor = '#fff';
        inputTodo.style.color = 'hsl(235, 19%, 35%)';
        document.querySelectorAll('.checkbox-section-light').forEach(element =>{
            element.style.borderColor = 'hsl(236, 33%, 92%)';
        })
        allButton.forEach(ele => {
            ele.style.backgroundColor = '#fff';
        })
        activeButton.forEach(ele => {
            ele.style.backgroundColor = '#fff';
        })
        completedButton.forEach(ele => {
            ele.style.backgroundColor = '#fff';
        })
        clearCompleted.forEach(ele => {
            ele.style.backgroundColor = '#fff';
        })
        todoLength.forEach(ele => {
            ele.style.backgroundColor = '#fff';
        })

    }
});

window.addEventListener('resize', function(e){
    if(window.screen.width < 375 && colorMod.dataset.check == 'false'){
        bgImage.style.backgroundImage = "url('./images/bg-mobile-dark.jpg')";
    } else if(window.screen.width < 375 && colorMod.dataset.check == 'true'){
        bgImage.style.backgroundImage = 'url("./images/bg-mobile-light.jpg")';
    } else if(window.screen.width > 375 && colorMod.dataset.check == 'true'){
        bgImage.style.backgroundImage = 'url("./images/bg-desktop-light.jpg")';
    } else if(window.screen.width > 375 && colorMod.dataset.check == 'false'){
        bgImage.style.backgroundImage = 'url("./images/bg-desktop-dark.jpg")';
    }
})
