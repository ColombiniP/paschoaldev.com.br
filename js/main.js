/* ============================================================
   PASCHOAL COLOMBINI — main.js
   Responsabilidades:
     1. Navbar scroll shrink + mobile menu toggle
     2. Scroll reveal (IntersectionObserver)
     3. Smooth scroll para âncoras
     4. Contador animado nos stats
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. NAVBAR — shrink ao rolar + menu mobile
  ───────────────────────────────────────── */
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Adiciona classe 'scrolled' quando passa de 50px de scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Abre/fecha o menu mobile
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      // Anima as barras do hambúrguer em "X" quando aberto
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Fecha o menu ao clicar num link mobile
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }


  /* ─────────────────────────────────────────
     2. SCROLL REVEAL — IntersectionObserver
        Elementos com class .reveal ficam
        invisíveis e aparecem ao entrar na tela
  ───────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  // threshold: 0.15 → dispara quando 15% do elemento está visível
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Para de observar após revelar (não volta a esconder)
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────
     3. SMOOTH SCROLL para links âncora (#...)
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────
     4. CONTADOR ANIMADO — para elementos
        com data-count="valor"
        Dispara quando o elemento entra na tela
  ───────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        // Função de easing ease-out
        const easeOut = t => 1 - Math.pow(1 - t, 3);

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.round(easeOut(progress) * target);

          el.textContent = value.toLocaleString('pt-BR') + suffix;

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el); // só conta uma vez
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }


  /* ─────────────────────────────────────────
     5. FORMULÁRIO — previne envio padrão e
        mostra feedback visual (se houver form)
  ───────────────────────────────────────── */
  const form = document.querySelector('.contato-form');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;

      // Feedback de loading
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      // Simula envio — substitua pelo fetch() real se tiver backend
      fetch('https://formspree.io/f/xvzygzkl', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
    .then(res => {
      if (res.ok) {
        submitBtn.textContent = '✓ Mensagem enviada!';
        submitBtn.style.background = '#16a34a';
        submitBtn.style.borderColor = '#16a34a';
        form.reset();
      } else {
        submitBtn.textContent = 'Erro ao enviar. Tente novamente.';
        submitBtn.style.background = '#dc2626';
        submitBtn.style.borderColor = '#dc2626';
      }
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
      }, 3000);
    })
    .catch(() => {
      submitBtn.textContent = 'Erro de conexão.';
      submitBtn.disabled = false;
    });
  });
}

}); // fim DOMContentLoaded
