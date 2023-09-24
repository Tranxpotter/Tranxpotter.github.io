let width = visualViewport.width

const slideInLeft = (entries, observer) => {
    entries.forEach(entry => {
    entry.target.classList.toggle("slide-in-left", entry.isIntersecting);
    });
};

const observer_slideInLeft = new IntersectionObserver(slideInLeft);
const options = { root: null, rootMargin: '0px', threshold: 1 }; 
  
const elements_slideInLeft = document.querySelectorAll('.trigger-slide-in-left');
elements_slideInLeft.forEach(el => {
    observer_slideInLeft.observe(el, options);
});

const slideInRight = (entries, observer) => {
    entries.forEach(entry => {
    entry.target.classList.toggle("slide-in-right", entry.isIntersecting);
    });
};

const observer_slideInRight = new IntersectionObserver(slideInRight);
  
const elements_slideInRight = document.querySelectorAll('.trigger-slide-in-right');
elements_slideInRight.forEach(el => {
    observer_slideInRight.observe(el, options);
});


let genshin_pic_num = 0;
const pages_num = document.getElementById("genshin_characters").children.length

function page_change(elm, width, direction, o_pos, speed){
    let pos = 0;
    let id = null;
    clearInterval(id)
    id = setInterval(frame, 1);
    function frame(){
        if (Math.abs(pos) >= width){
            clearInterval(id);
        } else {
            pos += direction*speed;
            elm.style.left = o_pos + pos + "vw";
        }
    }
}

function page_flip(elm, src_new, axis, direction, duration){
    let id = null;
    clearInterval(id);
    id = setInterval(frame, duration);
    let angle = 0;
    let switched = false;
    function frame(){
        if (Math.abs(angle) <= 0 && switched){
            clearInterval(id);
        } else if (Math.abs(angle) >= 90 || switched){
            elm.src = src_new;
            switched = true;
            angle -= direction;
            elm.style.transform = "rotate" + axis +"("+ angle + "deg)";
        } else {
            angle += direction;
            elm.style.transform = "rotate" + axis +"("+ angle + "deg)";
        }
    }
}


function genshin_next_page(){
    if (genshin_pic_num >= pages_num-1){
        return false;
    }
    let characters_images = document.getElementById("genshin_characters");
    //characters_images.style.transform = `translateX(${-(genshin_pic_num)*80}vw)`;
    page_change(characters_images, 80, -1, -(genshin_pic_num)*80, 1)
    genshin_pic_num++;
    let genshin_paginator = document.getElementById("genshin_paginator");
    genshin_paginator.children[genshin_pic_num-1].checked = false;
    genshin_paginator.children[genshin_pic_num].checked = true;
    return false;
}

function genshin_prev_page(){
    if (genshin_pic_num <= 0){
        return false;
    }
    let characters_images = document.getElementById("genshin_characters");
    //characters_images.style.transform = `translateX(${-(genshin_pic_num)*80}vw)`;
    page_change(characters_images, 80, 1, -(genshin_pic_num)*80, 1)
    genshin_pic_num--;
    let genshin_paginator = document.getElementById("genshin_paginator");
    genshin_paginator.children[genshin_pic_num+1].checked = false;
    genshin_paginator.children[genshin_pic_num].checked = true;
    return false;
}



function on_genshin_character_flip(elm, src){
    if (src.includes("Weapon")){
        page_flip(elm, src.replace("Weapon", "Stat"), "Y", 1, 2)
        //elm.src = src.replace("Weapon", "Stat")
    } else {
        page_flip(elm, src.replace("Stat", "Weapon"), "Y", 1, 2)
        //elm.src = src.replace("Stat", "Weapon")
    }
}

function on_genshin_page_change(value){
    let change_value = genshin_pic_num - value;
    let characters_images = document.getElementById("genshin_characters");
    page_change(characters_images, Math.abs(80*change_value), change_value/Math.abs(change_value), -(genshin_pic_num)*80, Math.abs(change_value));
    genshin_pic_num = value;
}

window.addEventListener("scroll", function(){
    let value = this.window.scrollY
    let stars_background = this.document.getElementById("stars_background");
    let moon_img = this.document.getElementById("moon")
    let spaceship_img = this.document.getElementById("spaceship")
    let spaceship2_img = this.document.getElementById("spaceship2")

    stars_background.style.left = -value*0.25 + "px";
    moon_img.style.top = 10 + value/15 + "vh";
    spaceship_img.style.left = value*0.5+"px";
    spaceship_img.style.top = 20 + value/15+"vh";
    spaceship2_img.style.left = value+"px";
    spaceship2_img.style.top = 90 - value/30+"vh";
})


function comments_submit(){
    let inp = document.getElementById("comments_input");
    let msg = inp.value;

    if (msg == ""){
        return false;
    }

    inp.value = "";

    const para = document.createElement("p");
    const node = document.createTextNode(msg);
    para.appendChild(node);
    para.style.whiteSpace = "pre-wrap";
    para.style.paddingLeft = "10px";
    para.style.margin = "10px";
    


    let display = document.getElementById("comments_display");
    display.appendChild(para);
    display.scrollTop = display.scrollHeight;
    return false;
}