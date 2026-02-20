/* ============================================
   Newark-on-Trent Community Website
   main.js — All Interactive Functionality
   ============================================ */

(() => {
  'use strict';

  /* ------------------------------------------
     Dark Mode Toggle
     ------------------------------------------ */
  function initThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    };

    // Set initial aria-label based on current theme
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    btn.setAttribute('aria-label',
      current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );

    btn.addEventListener('click', () => {
      const now = document.documentElement.getAttribute('data-theme');
      setTheme(now === 'dark' ? 'light' : 'dark');
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ------------------------------------------
     Mobile Navigation
     ------------------------------------------ */
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-open');
    };

    const openMenu = () => {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('nav-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------
     Sticky Header Shadow
     ------------------------------------------ */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Check initial state
  }

  /* ------------------------------------------
     Smooth Scroll for Anchor Links
     ------------------------------------------ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ------------------------------------------
     Category Filtering (reusable for any page
     with .filterable-card elements)
     ------------------------------------------ */
  function initCategoryFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.filterable-card');
    if (buttons.length === 0 || cards.length === 0) return;

    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');

        // Update active button and aria-pressed
        buttons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        // Filter cards
        cards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------
     Initialization
     ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initHeaderScroll();
    initSmoothScroll();
    initCategoryFilter();
  });

})();
