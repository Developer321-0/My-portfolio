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

    function resizeCanvas() {
      const heroSection = document.getElementById('hero');
      networkCanvas.width = heroSection.offsetWidth;
      networkCanvas.height = heroSection.offsetHeight;
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

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
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
        node.update(networkCanvas.width, networkCanvas.height);
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
});
