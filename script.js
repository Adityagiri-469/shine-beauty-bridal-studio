/* ============================================================
   SHINE BEAUTY & BRIDAL STUDIO — script.js
   Handles: sticky nav, mobile menu, scroll reveal,
            active nav links, form submission, footer year
============================================================ */

document.addEventListener('DOMContentLoaded', () => {


  /* ----------------------------------------------------------
     1. STICKY HEADER — add .scrolled class on scroll
  ---------------------------------------------------------- */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  // Run once on load in case page is already scrolled
  handleHeaderScroll();


  /* ----------------------------------------------------------
     2. MOBILE MENU TOGGLE — hamburger open/close
  ---------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when any nav link is clicked
  navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });


  /* ----------------------------------------------------------
     3. ACTIVE NAV LINK — highlight link matching current section
  ---------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  function setActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;

    sections.forEach(section => {
      const sectionTop    = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollMid >= sectionTop && scrollMid < sectionBottom) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink(); // Run on load


  /* ----------------------------------------------------------
     4. SCROLL REVEAL — fade-up sections as they enter viewport
  ---------------------------------------------------------- */

  // Add .reveal class to all elements we want to animate
  const revealSelectors = [
    '.section-header',
    '.service-card',
    '.gallery__item',
    '.about__visual',
    '.about__content',
    '.contact__info',
    '.contact__form-wrap',
    '.footer__brand',
    '.footer__links',
    '.footer__social',
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
    });
  });

  // Observe and toggle .visible
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal to save resources
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ----------------------------------------------------------
     5. GALLERY ITEMS — staggered reveal delay
  ---------------------------------------------------------- */
  document.querySelectorAll('.gallery__item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.07}s`;
  });
/* ----------------------------------------------------------
   6. GOOGLE SHEET BOOKING SYSTEM
---------------------------------------------------------- */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("FORM SUBMIT WORKING"); // 👈 HERE
    console.log([...new FormData(contactForm).entries()]); // 👈 HERE

    const data = new URLSearchParams(new FormData(contactForm));
  console.log([...data.entries()]);
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyomLWCQFRk2inVXf0Dv_N3Cj15nVGEhR34hKqGOPlUTDdFOm9nN5UsrO_pLewRhwVM/exec", {
        method: "POST",
        body: data
      });

      const text = await response.text();
      console.log(text);

      alert("✅ Booking saved successfully! We will contact you soon.");
      contactForm.reset();

    } catch (err) {
      console.error(err);
      alert("❌ Error saving booking - please try again.");
    }
  });
}
  /* ----------------------------------------------------------
     7. FOOTER YEAR
  ---------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     8. SMOOTH ANCHOR SCROLL
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

}); // Yeh aakhri bracket DOMContentLoaded ke liye hai