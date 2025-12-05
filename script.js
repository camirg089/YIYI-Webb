// Menú responsive (hamburguesa)
const toggleBtn = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 780) {
        if (!navLinks.contains(e.target) && e.target !== toggleBtn) {
            navLinks.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    }
});
toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Scroll suave al pulsar "Ver cómo funciona"
const goHow = document.getElementById('goHow');
if(goHow){
    goHow.addEventListener('click', function(e){
        e.preventDefault();
        document.getElementById('funciona').scrollIntoView({ behavior: 'smooth' });
    });
}

// Destacar link activo en navegación (al hacer scroll)
window.addEventListener('scroll', function(){
    const sections = document.querySelectorAll('main section[id]');
    const navItems = document.querySelectorAll('.nav-links .btn-nav');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if(scrollY >= sectionTop){
            current = section.id;
        }
    });
    navItems.forEach(li=>{
        li.classList.remove('active');
        if(current && li.getAttribute('onclick')?.includes(`#${current}`)){
            li.classList.add('active');
        }
    });
});

// Efecto "ripple" en todos los botones principales
function addRipple(btn) {
    btn.addEventListener('click', function(e) {
        // No ripple si está deshabilitado
        if(btn.getAttribute('aria-disabled')==='true') return;
        const circle = document.createElement('span');
        circle.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = size + 'px';
        circle.style.left = (e.clientX - rect.left - size/2) + 'px';
        circle.style.top = (e.clientY - rect.top - size/2) + 'px';
        btn.appendChild(circle);
        setTimeout(()=>circle.remove(), 600);
    });
}
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav').forEach(addRipple);