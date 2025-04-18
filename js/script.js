document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Hero Carousel functionality
    const heroCarousel = document.querySelector('.hero-carousel');
    
    if (heroCarousel) {
        const carouselInner = heroCarousel.querySelector('.carousel-inner');
        const carouselItems = heroCarousel.querySelectorAll('.carousel-item');
        
        let currentSlide = 0;
        const totalSlides = carouselItems.length;
        
        // Function to update the carousel display
        function updateCarousel() {
            // Update inner position
            carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Auto-play functionality
        let carouselInterval = setInterval(function() {
            currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
            updateCarousel();
        }, 5000);
        
        // Touch support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        heroCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            // Pause auto-play on touch
            clearInterval(carouselInterval);
        }, { passive: true });
        
        heroCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            
            // Resume auto-play after touch
            carouselInterval = setInterval(function() {
                currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
                updateCarousel();
            }, 5000);
        }, { passive: true });
        
        function handleSwipe() {
            // Detect swipe direction
            if (touchEndX < touchStartX) {
                // Swipe left - next slide
                currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
            } else if (touchEndX > touchStartX) {
                // Swipe right - previous slide
                currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
            }
            
            updateCarousel();
        }
    }

    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                // Scroll to the target section
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active menu item on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.feature, .gallery-item, .contact-card');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial call to animate elements in view
    animateOnScroll();
    
    // Call animation function on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Gallery mobile touch interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    const isMobile = window.innerWidth <= 768;
    
    // For mobile: Toggle enhanced focus state on tap
    if (isMobile) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // If this item is already active, do nothing special
                if (this.classList.contains('mobile-active')) {
                    return;
                }
                
                // Remove active class from all items
                galleryItems.forEach(otherItem => {
                    otherItem.classList.remove('mobile-active');
                });
                
                // Add active class to the clicked item
                this.classList.add('mobile-active');
                
                // Prevent immediate click through for better UX
                e.preventDefault();
                e.stopPropagation();
            });
        });
        
        // Close active item when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.gallery-item')) {
                galleryItems.forEach(item => {
                    item.classList.remove('mobile-active');
                });
            }
        });
    }
    
    // Check for window resize to handle orientation change
    window.addEventListener('resize', function() {
        const wasMobile = isMobile;
        const isNowMobile = window.innerWidth <= 768;
        
        // If device size category changed, reload to update UI
        if (wasMobile !== isNowMobile) {
            location.reload();
        }
    });
}); 