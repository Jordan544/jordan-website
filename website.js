const humberger = document.querySelector('.humberger');
const navLinks = document.querySelector('.nav-links');

humberger.addEventListener('click', ()=>{
  humberger.classList.toggle('active');
  navLinks.classList.toggle('active');
});