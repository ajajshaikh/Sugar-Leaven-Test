/* =========================================================
   SUGAR — Site scripts
   Sticky header, mobile nav, reveal animations, back-to-top,
   gallery filters + lightbox, contact form (front-end only)
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Gallery filters ---------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var category = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = category === 'all' || item.getAttribute('data-category') === category;
          item.classList.toggle('hidden', !match);
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox && galleryItems.length) {
    var lbImage = lightbox.querySelector('img');
    var lbCaptionText = lightbox.querySelector('.lightbox-caption');
    var visibleItems = function () {
      return Array.prototype.filter.call(galleryItems, function (item) {
        return !item.classList.contains('hidden');
      });
    };
    var currentIndex = 0;

    var openLightbox = function (index) {
      var items = visibleItems();
      if (!items.length) return;
      currentIndex = index;
      var item = items[currentIndex];
      var img = item.querySelector('img');
      lbImage.src = img.src;
      lbImage.alt = img.alt;
      if (lbCaptionText) lbCaptionText.textContent = img.alt;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    var closeLightbox = function () {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    galleryItems.forEach(function (item, idx) {
      item.addEventListener('click', function () {
        var items = visibleItems();
        var realIndex = items.indexOf(item);
        openLightbox(realIndex >= 0 ? realIndex : 0);
      });
    });

    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    if (nextBtn) nextBtn.addEventListener('click', function () {
      var items = visibleItems();
      openLightbox((currentIndex + 1) % items.length);
    });
    if (prevBtn) prevBtn.addEventListener('click', function () {
      var items = visibleItems();
      openLightbox((currentIndex - 1 + items.length) % items.length);
    });
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    });
  }

  /* ---------- Contact form (front-end only, no backend) ---------- */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successMsg = document.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.add('is-visible');
        successMsg.setAttribute('tabindex', '-1');
        successMsg.focus();
      }
      contactForm.reset();
      contactForm.style.display = 'none';
    });
  }

});
