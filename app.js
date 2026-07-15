import { personalInfo, skills, education, projects } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- loader fade out ---
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    loader.classList.add('hidden');
  });
  // Fallback if load event already fired
  if (document.readyState === 'complete') {
    loader.classList.add('hidden');
  }

  // --- Inject Personal Info ---
  document.title = `${personalInfo.name} | Portfolio`;
  document.getElementById('hero-name').textContent = personalInfo.name;
  document.getElementById('hero-tagline').textContent = personalInfo.tagline;
  document.getElementById('about-bio-text').textContent = personalInfo.about;
  
  // Set Profile Pictures (checking elements exist first)
  const heroPic = document.getElementById('hero-profile-pic');
  const aboutPic = document.getElementById('about-profile-pic');
  if (heroPic) heroPic.src = personalInfo.profilePicture;
  if (aboutPic) aboutPic.src = personalInfo.profilePicture;

  // Set Social Links
  const githubEl = document.getElementById('social-github');
  const linkedinEl = document.getElementById('social-linkedin');
  const emailEl = document.getElementById('social-mail');
  const infoEmail = document.getElementById('info-email');

  if (githubEl) githubEl.href = personalInfo.socials.github;
  if (linkedinEl) linkedinEl.href = personalInfo.socials.linkedin;
  
  // Set email links (remove mailto: if adding to plain text)
  if (emailEl) emailEl.href = personalInfo.socials.email;
  if (infoEmail) {
    const rawEmail = personalInfo.socials.email.replace('mailto:', '');
    infoEmail.href = personalInfo.socials.email;
    infoEmail.textContent = rawEmail;
  }

  // --- Dynamic Skills Render ---
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) {
    skillsContainer.innerHTML = skills.map(cat => `
      <div class="skills-category">
        <h4 class="skills-cat-title">${cat.category}</h4>
        <div class="skills-grid">
          ${cat.items.map(skill => `
            <div class="skill-card">
              <i class="${skill.icon}"></i>
              <span class="skill-name">${skill.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Dynamic Projects Render (Data-driven mapping) ---
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(proj => {
      const gitLinkHtml = proj.githubLink.includes('[ADD YOUR LINK HERE]') 
        ? `<span class="proj-link muted" title="Link placeholder"><i class="fab fa-github"></i> GitHub</span>`
        : `<a href="${proj.githubLink}" class="proj-link" target="_blank"><i class="fab fa-github"></i> GitHub</a>`;
      
      return `
        <div class="project-card reveal-on-scroll fade-in">
          <div class="project-image-box">
            <img src="${proj.image}" alt="${proj.title}" class="project-img" loading="lazy">
            ${proj.featured ? `<div class="project-overlay"><span class="featured-badge">Featured</span></div>` : ''}
          </div>
          <div class="project-info">
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-desc">${proj.description}</p>
            <div class="project-tags">
              ${proj.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
              ${gitLinkHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
    // Refresh icons inside dynamic cards
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // --- Dynamic Education Timeline Render ---
  const timelineContainer = document.getElementById('timeline-container');
  if (timelineContainer) {
    timelineContainer.innerHTML = education.map(edu => `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-head">
            <h3>${edu.institution}</h3>
            <span class="timeline-duration">${edu.duration}</span>
          </div>
          <p class="timeline-degree">${edu.degree}</p>
          <p class="timeline-desc">${edu.details}</p>
        </div>
      </div>
    `).join('');
  }

  // --- Theme Toggle Action ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  });

  // --- Mobile Hamburger Menu ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      
      if (isOpen) {
        hamburgerIcon.setAttribute('data-lucide', 'x');
      } else {
        hamburgerIcon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      });
    });
  }

  // --- Navbar Active Links & Header Shrink Scroll Event ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Header shrink
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Nav links active class toggling
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // --- Typewriter Effect ---
  const typewriterRole = document.getElementById('typewriter-role');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const roles = personalInfo.titles;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterRole.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Deleting is faster
    } else {
      typewriterRole.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end of role
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Brief pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  if (personalInfo.titles && personalInfo.titles.length > 0) {
    type();
  }

  // --- Intersection Observer for Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // Dynamic elements (like projects/education) need to be observed as well
  // We trigger observation on dynamically created items
  setTimeout(() => {
    const dynamicRevealElements = document.querySelectorAll('.reveal-on-scroll');
    dynamicRevealElements.forEach(el => observer.observe(el));
  }, 100);

  // --- Contact Form Submission & Feedbacks (Real Formspree Submission) ---
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('name').value.trim();
      const emailVal = document.getElementById('email').value.trim();
      const messageVal = document.getElementById('message').value.trim();

      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalBtnHtml = submitBtn.innerHTML;

      if (!nameVal || !emailVal || !messageVal) {
        formFeedback.textContent = 'Please fill out all fields.';
        formFeedback.className = 'form-feedback error';
        formFeedback.style.display = 'block';
        return;
      }

      // Show loader state on button
      submitBtn.innerHTML = `<span>Sending...</span><i class="spinner-inline"></i>`;
      submitBtn.disabled = true;

      // Real submission to Formspree
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            formFeedback.textContent = `Thank you, ${nameVal}! Your message has been sent successfully.`;
            formFeedback.className = 'form-feedback success';
            contactForm.reset();
          } else {
            formFeedback.textContent = 'Something went wrong. Please try again or email me directly.';
            formFeedback.className = 'form-feedback error';
          }
        })
        .catch(() => {
          formFeedback.textContent = 'Something went wrong. Please try again or email me directly.';
          formFeedback.className = 'form-feedback error';
        })
        .finally(() => {
          formFeedback.style.display = 'block';
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;

          // Hide feedback after 5 seconds
          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 5000);
        });
    });
  }

  // --- Set current year in Footer ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Network Particle Background (Circles, Squares, Connected Lines) ---
  const networkCanvas = document.getElementById('network-bg');
  if (networkCanvas) {
    const ctx = networkCanvas.getContext('2d');
    let nodes = [];
    let animationId;
    
    // Mouse coordinates tracker local to hero for repulsion
    const heroSection = document.getElementById('hero');
    let heroMouse = { x: null, y: null };
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        heroMouse.x = e.clientX - rect.left;
        heroMouse.y = e.clientY - rect.top;
      });
      heroSection.addEventListener('mouseleave', () => {
        heroMouse.x = null;
        heroMouse.y = null;
      });
    }

    function resizeCanvas() {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        networkCanvas.width = heroSection.offsetWidth;
        networkCanvas.height = heroSection.offsetHeight;
      }
    }

    function getAccentColor() {
      const isLight = document.body.classList.contains('light-mode');
      return isLight ? '13, 148, 136' : '13, 255, 194';
    }

    class Node {
      constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 3 + 2;
        this.shape = Math.random() > 0.5 ? 'circle' : 'square';
        this.depth = Math.random() * 0.6 + 0.4;
      }

      update(w, h, heroMouse) {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse repulsion physics
        if (heroMouse.x !== null && heroMouse.y !== null) {
          const dx = this.x - heroMouse.x;
          const dy = this.y - heroMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelDist = 140; // repulsion radius
          if (dist < repelDist) {
            const force = (repelDist - dist) / repelDist;
            this.x += (dx / dist) * force * 3;
            this.y += (dy / dist) * force * 3;
          }
        }

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(ctx, color) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${0.55 * this.depth})`;
        if (this.shape === 'circle') {
          ctx.arc(this.x, this.y, this.radius * this.depth, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const size = this.radius * 2 * this.depth;
          ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
        }
      }
    }

    function initNodes() {
      nodes = [];
      const density = Math.min(55, Math.floor((networkCanvas.width * networkCanvas.height) / 20000));
      for (let i = 0; i < density; i++) {
        nodes.push(new Node(networkCanvas.width, networkCanvas.height));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
      const color = getAccentColor();

      nodes.forEach(node => {
        node.update(networkCanvas.width, networkCanvas.height, heroMouse);
        node.draw(ctx, color);
      });

      const maxDist = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.3 * ((nodes[i].depth + nodes[j].depth) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    function startNetwork() {
      resizeCanvas();
      initNodes();
      if (animationId) cancelAnimationFrame(animationId);
      animate();
    }

    startNetwork();
    window.addEventListener('resize', startNetwork);
  }

  // --- 1. Global Spotlight Grid Cursor Tracker ---
  const gridBg = document.getElementById('global-grid-bg');
  const updateGlobalSpotlight = (x, y) => {
    if (gridBg) {
      gridBg.style.setProperty('--mouse-x', `${x}px`);
      gridBg.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  window.addEventListener('mousemove', (e) => {
    updateGlobalSpotlight(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updateGlobalSpotlight(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      updateGlobalSpotlight(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // --- 2. Custom Scroll Progress Bar ---
  const scrollProgress = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (scrollProgress) scrollProgress.style.width = `${progress}%`;
    } else {
      if (scrollProgress) scrollProgress.style.width = '0%';
    }
  };
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress(); // Initial run

  // --- 3. Scroll Parallax for Ambient Glow Blobs ---
  const glow1 = document.getElementById('glow-1');
  const glow2 = document.getElementById('glow-2');
  const glow3 = document.getElementById('glow-3');
  const glow4 = document.getElementById('glow-4');
  
  const updateGlowParallax = () => {
    const scrollY = window.scrollY;
    if (glow1) glow1.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
    if (glow2) glow2.style.transform = `translate3d(0, ${-scrollY * 0.1}px, 0)`;
    if (glow3) glow3.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
    if (glow4) glow4.style.transform = `translate3d(0, ${-scrollY * 0.12}px, 0)`;
  };
  window.addEventListener('scroll', updateGlowParallax);
  updateGlowParallax(); // Initial run

  // --- 4. Custom Interactive Cursor Trail ---
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  if (cursorDot && cursorOutline) {
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let isCursorActive = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isCursorActive) {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        isCursorActive = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
      isCursorActive = false;
    });

    const animateCursor = () => {
      // Instant tracking for the inner dot to prevent cursor feel lag
      dotX = mouseX;
      dotY = mouseY;
      
      // Snappier, fast spring tracking for the outer outline
      outlineX += (mouseX - outlineX) * 0.3;
      outlineY += (mouseY - outlineY) * 0.3;

      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    // Apply cursor-hover scale class on links/buttons
    const setupCursorHoverEffects = () => {
      const hoverTargets = document.querySelectorAll(
        'a, button, .project-card, .skill-card, .timeline-card, .social-btn, .mobile-toggle, .theme-btn, input, textarea, .logo, .scroll-indicator'
      );
      hoverTargets.forEach(target => {
        target.removeEventListener('mouseenter', onMouseEnterHover);
        target.removeEventListener('mouseleave', onMouseLeaveHover);
        
        target.addEventListener('mouseenter', onMouseEnterHover);
        target.addEventListener('mouseleave', onMouseLeaveHover);
      });
    };

    function onMouseEnterHover() {
      document.body.classList.add('cursor-hover');
    }
    
    function onMouseLeaveHover() {
      document.body.classList.remove('cursor-hover');
    }

    window.refreshCursorHover = setupCursorHoverEffects;
  }

  // --- 4.5 Visual Tap Ripples for Touch Screens ---
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      createTouchRipple(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  function createTouchRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    
    // Clean up DOM after animation finishes
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // --- 5. 3D Card Tilt & Card Spotlight Glow (Touch and Mouse compatible) ---
  const applyCard3DTilt = () => {
    const tiltCards = document.querySelectorAll(
      '.project-card, .skill-card, .bio-intro-card, .contact-form-container'
    );

    tiltCards.forEach(card => {
      const handleInput = (clientX, clientY, isTouch) => {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left; 
        const y = clientY - rect.top;  
        
        card.style.setProperty('--card-mouse-x', `${x}px`);
        card.style.setProperty('--card-mouse-y', `${y}px`);

        if (!isTouch) {
          const width = rect.width;
          const height = rect.height;
          const centerX = rect.left + width / 2;
          const centerY = rect.top + height / 2;
          const mouseXRelativeToCenter = clientX - centerX;
          const mouseYRelativeToCenter = clientY - centerY;

          const maxTilt = 8; // Keep it subtle and professional
          const rotateY = (mouseXRelativeToCenter / (width / 2)) * maxTilt;
          const rotateX = -(mouseYRelativeToCenter / (height / 2)) * maxTilt;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
        }
      };

      card.addEventListener('mousemove', (e) => {
        handleInput(e.clientX, e.clientY, false);
      });

      card.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          handleInput(e.touches[0].clientX, e.touches[0].clientY, true);
        }
      }, { passive: true });

      card.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          handleInput(e.touches[0].clientX, e.touches[0].clientY, true);
        }
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });

      card.addEventListener('touchend', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  };

  // --- 4.6 Fullscreen Touch Particle Storm & Wave Effect ---
  const touchCanvas = document.getElementById('touch-canvas');
  if (touchCanvas) {
    const ctx = touchCanvas.getContext('2d');
    let particles = [];
    let waves = [];
    let animationId;
    let isLoopRunning = false;

    const resizeCanvas = () => {
      touchCanvas.width = window.innerWidth;
      touchCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const getGreenColor = () => {
      // Reads the current theme's green accent color from the stylesheet variables dynamically
      const color = getComputedStyle(document.body).getPropertyValue('--accent-rgb') || '13, 255, 194';
      return color.trim();
    };

    class TouchWave {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.45;
        this.opacity = 1.0;
        this.color = color;
        this.speed = 5;
      }

      update() {
        this.radius += this.speed;
        this.opacity = 1 - (this.radius / this.maxRadius);
      }

      draw(ctx) {
        // Primary expanding wave outline
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${this.color}, ${this.opacity * 0.55})`;
        ctx.lineWidth = 3.5;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary outer soft shadow ring
        if (this.radius > 15) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${this.color}, ${this.opacity * 0.25})`;
          ctx.lineWidth = 1.5;
          ctx.arc(this.x, this.y, this.radius - 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    class TouchParticle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = Math.random() * 3.5 + 1.5;
        this.life = 1.0;
        this.decay = Math.random() * 0.025 + 0.015;
        this.gravity = 0.025;
        this.friction = 0.96;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy + this.gravity;
        this.life -= this.decay;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color}, ${this.life * 0.85})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color}, ${this.life * 0.15})`;
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animateTouchCanvas = () => {
      ctx.clearRect(0, 0, touchCanvas.width, touchCanvas.height);

      // Render expanding waves
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].update();
        if (waves[i].opacity <= 0 || waves[i].radius >= waves[i].maxRadius) {
          waves.splice(i, 1);
        } else {
          waves[i].draw(ctx);
        }
      }

      // Render particle storm
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        } else {
          particles[i].draw(ctx);
        }
      }

      // Continue animation loop if visual elements exist, else sleep to conserve resource
      if (particles.length > 0 || waves.length > 0) {
        animationId = requestAnimationFrame(animateTouchCanvas);
      } else {
        isLoopRunning = false;
        cancelAnimationFrame(animationId);
      }
    };

    const triggerTouchEffect = (clientX, clientY) => {
      const color = getGreenColor();

      // Spawn shockwave ripple
      waves.push(new TouchWave(clientX, clientY, color));

      // Spawn particle storm burst
      for (let i = 0; i < 15; i++) {
        particles.push(new TouchParticle(clientX, clientY, color));
      }

      if (!isLoopRunning) {
        isLoopRunning = true;
        animateTouchCanvas();
      }
    };

    const triggerDragSparks = (clientX, clientY) => {
      const color = getGreenColor();
      // Spawn smaller amount during drag drag tracking to prevent lag
      for (let i = 0; i < 2; i++) {
        particles.push(new TouchParticle(clientX, clientY, color));
      }
      if (!isLoopRunning) {
        isLoopRunning = true;
        animateTouchCanvas();
      }
    };

    // Touch Event Triggers (Mobile)
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        triggerTouchEffect(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        triggerDragSparks(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    // Click trigger fallback (Desktop clicks)
    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('a, button, input, textarea, .mobile-toggle, .theme-btn')) return;
      triggerTouchEffect(e.clientX, e.clientY);
    });
  }

  // --- 6. Magnetic Attraction for CTA Buttons & Icons ---
  const applyMagneticAttraction = () => {
    const magneticElements = document.querySelectorAll(
      '.btn, .social-btn, .theme-btn, .mobile-toggle'
    );

    // Only apply on screens with hover capabilities (pointer: fine) to prevent touch conflicts
    if (window.matchMedia('(pointer: fine)').matches) {
      magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;

          // Pull button towards the cursor by 35% of the distance
          el.style.transform = `translate3d(${dx * 0.35}px, ${dy * 0.35}px, 0)`;
        });

        el.addEventListener('mouseleave', () => {
          // Snap back smoothly using CSS transition
          el.style.transform = 'translate3d(0, 0, 0)';
        });
      });
    }
  };

  // --- 7. "View Project" Hover Action Badge Setup ---
  const setupProjectCursorHover = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.removeEventListener('mouseenter', onProjectEnter);
      card.removeEventListener('mouseleave', onProjectLeave);
      card.addEventListener('mouseenter', onProjectEnter);
      card.addEventListener('mouseleave', onProjectLeave);
    });
  };

  function onProjectEnter() {
    document.body.classList.add('cursor-view-project');
  }

  // Ensure helper functions are accessible
  function onProjectLeave() {
    document.body.classList.remove('cursor-view-project');
  }

  // Run initial setups
  applyCard3DTilt();
  applyMagneticAttraction();
  setupProjectCursorHover();
  
  // Stagger hover listener setup briefly to ensure dynamic elements are fully injected
  setTimeout(() => {
    if (window.refreshCursorHover) {
      window.refreshCursorHover();
    }
    applyCard3DTilt();
    applyMagneticAttraction();
    setupProjectCursorHover();
  }, 300);
});
