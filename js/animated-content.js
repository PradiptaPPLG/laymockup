/**
 * AnimatedContent — Vanilla JS & CSS Adaptation of @react-bits/AnimatedContent
 * Provides smooth staggered show-up / show-down entrance animations,
 * scroll triggers via IntersectionObserver, and GSAP power3.out easing.
 */
(function () {
  'use strict';

  // Inject CSS for AnimatedContent
  const style = document.createElement('style');
  style.id = 'animated-content-styles';
  style.textContent = `
    /* Base AnimatedContent state */
    [data-ac-ready="true"] {
      opacity: 0;
      transform: translateY(28px) scale(0.97);
      filter: blur(5px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                  filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform, filter;
    }

    [data-ac-ready="true"].ac-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }

    /* Stagger transitions */
    .ac-stagger-group > * {
      opacity: 0;
      transform: translateY(24px) scale(0.98);
      filter: blur(4px);
      transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                  filter 0.75s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ac-stagger-group.ac-visible > * {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }

    /* ShowUp & ShowDown helper animations */
    @keyframes acKeyframeShowUp {
      0% {
        opacity: 0;
        transform: translateY(32px) scale(0.95);
        filter: blur(6px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0px);
      }
    }

    @keyframes acKeyframeShowDown {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0px);
      }
      100% {
        opacity: 0;
        transform: translateY(20px) scale(0.96);
        filter: blur(4px);
      }
    }

    .ac-animate-showup {
      animation: acKeyframeShowUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
    }

    .ac-animate-showdown {
      animation: acKeyframeShowDown 0.4s cubic-bezier(0.4, 0, 1, 1) forwards !important;
    }

    /* Reduced motion override */
    @media (prefers-reduced-motion: reduce) {
      [data-ac-ready="true"],
      .ac-stagger-group > *,
      .ac-animate-showup,
      .ac-animate-showdown {
        opacity: 1 !important;
        transform: none !important;
        filter: none !important;
        transition: none !important;
        animation: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const AnimatedContent = {
    /**
     * Programmatically animate an element or group of children
     */
    animate(target, options = {}) {
      const defaults = {
        distance: 28,
        direction: 'vertical',
        duration: 0.8,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)', // power3.out
        blur: 5,
        scale: 0.97,
        stagger: 0.08,
        delay: 0,
        reverse: false,
        onComplete: null
      };
      const opt = { ...defaults, ...options };
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return;

      const children = opt.stagger > 0 && el.children.length ? Array.from(el.children) : [el];
      const axis = opt.direction === 'horizontal' ? 'X' : 'Y';
      const sign = opt.reverse ? -1 : 1;
      const dist = opt.distance * sign;

      children.forEach((child, idx) => {
        const itemDelay = opt.delay + (idx * opt.stagger);
        child.style.opacity = '0';
        child.style.transform = `translate${axis}(${dist}px) scale(${opt.scale})`;
        if (opt.blur > 0) child.style.filter = `blur(${opt.blur}px)`;
        child.style.transition = `opacity ${opt.duration}s ${opt.ease} ${itemDelay}s, transform ${opt.duration}s ${opt.ease} ${itemDelay}s, filter ${opt.duration}s ${opt.ease} ${itemDelay}s`;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            child.style.opacity = '1';
            child.style.transform = `translate${axis}(0px) scale(1)`;
            if (opt.blur > 0) child.style.filter = 'blur(0px)';

            if (opt.onComplete && idx === children.length - 1) {
              setTimeout(opt.onComplete, (opt.duration + itemDelay) * 1000);
            }
          });
        });
      });
    },

    /**
     * Attach IntersectionObserver to animate elements when scrolled into view
     */
    initScrollObserver() {
      if (typeof IntersectionObserver === 'undefined') return;

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.classList.contains('ac-stagger-group')) {
              // Apply staggered delays to immediate children
              const children = Array.from(el.children);
              children.forEach((c, i) => {
                c.style.transitionDelay = `${i * 0.07}s`;
              });
              el.classList.add('ac-visible');
            } else {
              el.classList.add('ac-visible');
            }
            obs.unobserve(el);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      // Target template cards, feature cards, and hero chips
      const targets = document.querySelectorAll(
        '.etalase-grid, .features-grid, .hero-chips, .hero-actions, .etalase-card, .feature-card'
      );

      targets.forEach((t) => {
        if (t.classList.contains('etalase-grid') || t.classList.contains('features-grid') || t.classList.contains('hero-chips')) {
          t.classList.add('ac-stagger-group');
          observer.observe(t);
        } else if (!t.closest('.ac-stagger-group')) {
          t.setAttribute('data-ac-ready', 'true');
          observer.observe(t);
        }
      });
    }
  };

  window.AnimatedContent = AnimatedContent;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AnimatedContent.initScrollObserver());
  } else {
    AnimatedContent.initScrollObserver();
  }
})();

