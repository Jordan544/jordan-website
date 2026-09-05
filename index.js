    const humberger = document.querySelector('.humberger');
    const navLinks = document.querySelector('.nav-links');

    humberger.addEventListener('click', (e) => {
      e.stopPropagation();
      humberger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !humberger.contains(e.target)) {
        humberger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        humberger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });


    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPosition = window.pageYOffset + 150;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });

//animation reveal on scroll
    const revealElements = document.querySelectorAll(
      '.academic-card, .grid-tiles, .intro-tile, .gallery-card, .about-card-main, .contact-card-main, .wlcm-container'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      root: null,
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Counter Animation with IntersectionObserver
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            const updateCount = () => {
              const target = +counter.getAttribute('data-target');
              const count = +counter.innerText;
              const inc = target / speed;

              if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const gridWrapper = document.querySelector('.grid-wrapper');
    if (gridWrapper) {
      counterObserver.observe(gridWrapper);
    }

    // Lightbox Functions
    function openLightbox(imgSrc, titleText, descText) {
      const modal = document.getElementById('lightboxModal');
      const img = document.getElementById('lightboxImage');
      const caption = document.getElementById('lightboxCaption');
      
      modal.style.display = 'flex';
      img.src = imgSrc;
      caption.innerHTML = `<strong>${titleText}</strong><br><span style="font-size: 0.9rem; font-weight: normal; color: #555;">${descText}</span>`;
      document.body.style.overflow = 'hidden'; 
    }

    function closeLightbox() {
      const modal = document.getElementById('lightboxModal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; 
    }
