/* ============================================
   Newark-on-Trent Community Website
   main.js — All Interactive Functionality
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     Dark Mode Toggle
     ------------------------------------------ */
  function initThemeToggle() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }

    // Set initial aria-label based on current theme
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    btn.setAttribute('aria-label',
      current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );

    btn.addEventListener('click', function () {
      var now = document.documentElement.getAttribute('data-theme');
      setTheme(now === 'dark' ? 'light' : 'dark');
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ------------------------------------------
     Mobile Navigation
     ------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-open');
    }

    function openMenu() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('nav-open');
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a nav link is clicked
    var links = nav.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
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
    var header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Check initial state
  }

  /* ------------------------------------------
     Smooth Scroll for Anchor Links
     ------------------------------------------ */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  /* ------------------------------------------
     Category Filtering (Things To Do page)
     ------------------------------------------ */
  function initCategoryFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.attraction-card');
    if (buttons.length === 0 || cards.length === 0) return;

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var category = this.getAttribute('data-category');

        // Update active button
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove('active');
        }
        this.classList.add('active');

        // Filter cards
        for (var k = 0; k < cards.length; k++) {
          if (category === 'all' || cards[k].getAttribute('data-category') === category) {
            cards[k].style.display = '';
          } else {
            cards[k].style.display = 'none';
          }
        }
      });
    }
  }

  /* ------------------------------------------
     Contact Form Handler
     ------------------------------------------ */
  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Remove any existing success message
      var existing = form.parentNode.querySelector('.form-success');
      if (existing) existing.remove();

      // Show placeholder message
      var msg = document.createElement('div');
      msg.className = 'form-success';
      msg.textContent = 'Thank you for your message! This form is currently a placeholder. For enquiries, please use the contact details provided below.';
      form.parentNode.insertBefore(msg, form.nextSibling);
      form.reset();
    });
  }

  /* ------------------------------------------
     Initialization
     ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initMobileNav();
    initHeaderScroll();
    initSmoothScroll();
    initCategoryFilter();
    initContactForm();
  });

})();
