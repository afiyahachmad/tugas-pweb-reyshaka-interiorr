document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navUl.classList.remove('active');
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it and show an alert
        console.log('Form submitted:', { name, email, message });
        
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

// Portfolio Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scroller = document.querySelector('.portfolio-scroller');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const dotsContainer = document.querySelector('.portfolio-dots');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Create dots
    portfolioItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            scrollToItem(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Scroll to specific item
    function scrollToItem(index) {
        const item = portfolioItems[index];
        const containerWidth = scroller.offsetWidth;
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        
        scroller.scrollTo({
            left: itemLeft - (containerWidth / 2) + (itemWidth / 2),
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }
    
    // Button click handlers
    leftBtn.addEventListener('click', () => {
        scroller.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    rightBtn.addEventListener('click', () => {
        scroller.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Update dots on scroll
    scroller.addEventListener('scroll', () => {
        const scrollPosition = scroller.scrollLeft + (scroller.offsetWidth / 2);
        
        portfolioItems.forEach((item, index) => {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            
            if (scrollPosition > itemLeft && scrollPosition < itemLeft + itemWidth) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    });
    
    // Touch support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });
    
    scroller.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    scroller.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX) * 2;
        scroller.scrollLeft = scrollLeft - walk;
    });
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const url = `https://wa.me/6285645650889?text=Nama:%20${encodeURIComponent(name)}%0APesan:%20${encodeURIComponent(message)}`;
    window.open(url, '_blank');
});