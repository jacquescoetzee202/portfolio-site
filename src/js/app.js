//taken directy from another site, check variables class selectors etc.
let burgerMenu = document.getElementById('burger-button');

let overlay = document.getElementById('burger-menu');

burgerMenu.addEventListener('click',function(){
    this.classList.toggle("close");
    overlay.classList.toggle("overlay");
});

