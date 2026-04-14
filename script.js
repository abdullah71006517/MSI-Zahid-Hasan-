// ============================================
// PORTFOLIO WEBSITE - JavaScript
// ============================================

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// HIRE ME BUTTON
// ============================================
document.getElementById('hire_me')?.addEventListener('click', function() {
  alert('Thank you for your interest! Please contact me at zahidhasan.zh801@gmail.com');
});

// ============================================
// DOWNLOAD CV BUTTON (UPDATED)
// ============================================
document.getElementById('download_cv')?.addEventListener('click', function() {
  alert('🚧 CV Service is Upcoming. Please check back later.')

const cvUrl = 'CV.pdf';  
  if (cvUrl) { const link = document.createElement('a'); link.href = cvUrl; link.download = 'Zahid_Hasan_CV.pdf'; 
              document.body.appendChild(link);
              link.click(); document.body.removeChild(link); }
  else
  { alert('CV file not found. Please add CV.pdf to your repository.'); }
  
  
});

// ============================================
// IMAGE LAZY LOADING
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('div[id], section[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// SOCIAL MEDIA LINK VALIDATION
// ============================================
document.querySelectorAll('.social-media a').forEach(link => {
  link.addEventListener('click', function(e) {
    const url = this.getAttribute('href');
    if (!url || url === '#') {
      e.preventDefault();
      alert('Social media link not configured yet.');
    }
  });
});

// ============================================
// GALLERY IMAGE PREVIEW (LIGHTBOX)
// ============================================
function initGalleryLightbox() {
  const galleryImages = document.querySelectorAll('.gallery-container img');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      createLightbox(this.src, this.alt);
    });
  });
}

function createLightbox(imageSrc, imageAlt) {
  const existingLightbox = document.querySelector('.lightbox');
  if (existingLightbox) existingLightbox.remove();

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="close">&times;</span>
      <img src="${imageSrc}" alt="${imageAlt}">
      <p>${imageAlt}</p>
    </div>
  `;

  document.body.appendChild(lightbox);

  lightbox.querySelector('.close').addEventListener('click', () => {
    lightbox.remove();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.remove();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.remove();
    }
  });
}

// ============================================
// FORM VALIDATION
// ============================================
function validateContactForm(form) {
  const name = form.querySelector('input[name="name"]')?.value.trim();
  const email = form.querySelector('input[name="email"]')?.value.trim();
  const message = form.querySelector('textarea[name="message"]')?.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    alert('Please enter your name');
    return false;
  }
  if (!email || !emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }
  if (!message) {
    alert('Please enter a message');
    return false;
  }

  return true;
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card, .project_card');
  cards.forEach((card, index) => {
    card.style.animation = `fadeIn 0.5s ease-in forwards`;
    card.style.animationDelay = `${index * 0.1}s`;
  });

  initGalleryLightbox();
  console.log('Portfolio page loaded successfully!');
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function createScrollToTopButton() {
  const scrollButton = document.createElement('button');
  scrollButton.className = 'scroll-to-top';
  scrollButton.innerHTML = '⬆️ Top';
  scrollButton.style.display = 'none';

  document.body.appendChild(scrollButton);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  });

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

createScrollToTopButton();

// ============================================
// ERROR HANDLING FOR MISSING IMAGES
// ============================================
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
    this.alt = 'Image not found';
    this.style.opacity = '0.7';
  });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function toggleMobileMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('mobile-active');
}

window.portfolioUtils = {
  validateContactForm,
  toggleMobileMenu,
  debounce
};
