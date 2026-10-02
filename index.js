(() => {
  'use strict';

  /* ============================================================
     DATA — tomado de tu hoja de vida
     ============================================================ */
  const SKILLS_SECURITY = [
    { name: 'Fundamentos de redes TCP/IP', level: 80 },
    { name: 'SIEM y operaciones SOC', level: 75 },
    { name: 'Análisis de logs y eventos', level: 75 },
    { name: 'Consultas y pivoteo', level: 70 },
    { name: 'Superficie de ataque y activos', level: 70 },
    { name: 'Gestión de casos', level: 70 },
  ];

  const SKILLS_FRONTEND = [
    { name: 'HTML, CSS y JavaScript', level: 88 },
    { name: 'React', level: 78 },
    { name: 'SQL y bases de datos', level: 72 },
    { name: 'Windows / Linux básico', level: 80 },
    { name: 'Redes LAN/WAN', level: 78 },
    { name: 'Soporte TI', level: 90 },
  ];

  const TOOLS = [
    'SIEM', 'Git / GitHub', 'WordPress', 'SQL', 'Windows',
    'Linux', 'TP-Link / NanoStation', 'Starlink', 'React', 'TCP/IP'
  ];

  const PROJECTS = [
    {
      name: 'Fundamentos de redes y visibilidad de activos',
      desc: 'Estudio de cómo se comunican los hosts y los componentes básicos de una red, con identificación de activos y reconocimiento de superficie de ataque.',
      stack: ['TCP/IP', 'Activos', 'Superficie de ataque'],
      category: 'security',
      demo: '#', code: '#'
    },
    {
      name: 'Logs, SIEM y operaciones SOC',
      desc: 'Trabajo con conceptos de registros, evidencia y visibilidad para contextualizar eventos de seguridad, fundamentos de SIEM e ingeniería de detección.',
      stack: ['SIEM', 'Logs', 'Detección'],
      category: 'security',
      demo: '#', code: '#'
    },
    {
      name: 'Consultas y flujo de casos en SIEM',
      desc: 'Consultas y pivoteo para explorar información de seguridad, dando seguimiento a eventos y relacionando evidencia dentro del flujo de casos.',
      stack: ['SIEM', 'Pivoteo', 'Gestión de casos'],
      category: 'security',
      demo: '#', code: '#'
    },
    {
      name: 'Administración de sitio web',
      desc: 'Mantenimiento y actualización de un sitio en WordPress: gestión de contenidos, ajustes de seguridad, rendimiento y SEO básico.',
      stack: ['WordPress', 'SEO', 'Seguridad web'],
      category: 'frontend',
      demo: '#', code: '#'
    },
    {
      name: 'Bootcamp de Desarrollo Web con React',
      desc: 'Formación práctica construyendo interfaces con React, HTML, CSS y JavaScript.',
      stack: ['React', 'JavaScript', 'CSS'],
      category: 'frontend',
      demo: '#', code: '#'
    },
  ];

  const TIMELINE = [
    {
      period: 'Feb 2026 — Actualidad',
      role: 'Administradora de sitio web',
      org: 'Proyecto independiente · Remoto',
      desc: 'Mantengo y actualizo un sitio en WordPress, aplico ajustes de seguridad, rendimiento y SEO básico, y coordino tareas de mantenimiento con autonomía.'
    },
    {
      period: 'Nov 2023 — Feb 2026',
      role: 'Practicante de Soporte TI',
      org: 'TGT GAMAS · Colombia',
      desc: 'Alistamiento tecnológico para operaciones de exploración petrolera. Verificación de equipos, servidores, redes, impresoras y enlaces (TP-Link, NanoStation, Starlink). Mantenimiento preventivo y correctivo, soporte a usuarios y diagnóstico de redes LAN/WAN.'
    },
    {
      period: '2022 — 2023',
      role: 'Profesora de programación',
      org: "BYJU'S Future School · Remoto",
      desc: 'Enseñanza de fundamentos de programación y pensamiento computacional a niños, con materiales didácticos adaptados a distintos niveles.'
    },
  ];

  /* ============================================================
     NAV: menú móvil + link activo por scroll
     ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  const navLinkMap = new Map(
    Array.from(document.querySelectorAll('.nav__link')).map(a => [a.dataset.section, a])
  );

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = navLinkMap.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinkMap.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ============================================================
     HERO: efecto de escritura en la terminal
     ============================================================ */
  const typedLine = document.getElementById('typedLine');
  const typeCursor = document.getElementById('typeCursor');
  const terminalOutput = document.getElementById('terminalOutput');

  const COMMAND = 'whoami --role soc-junior --stack frontend';
  const OUTPUT_LINES = [
    { k: 'nombre', v: 'Paola Andrea Gutiérrez' },
    { k: 'rol', v: 'Analista SOC Junior · Ciberseguridad · Soporte TI' },
    { k: 'stack', v: 'React · HTML · CSS · JavaScript · SIEM' },
    { k: 'foco_seguridad', v: 'Logs, detección de eventos y gestión de casos' },
    { k: 'estado', v: 'disponible para nuevos proyectos' },
  ];

  function typeCommand(text, el, speed = 45) {
    return new Promise(resolve => {
      let i = 0;
      const tick = () => {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(tick, speed);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  function renderOutput(lines) {
    lines.forEach((line, idx) => {
      const p = document.createElement('p');
      p.className = 'line';
      p.style.animationDelay = `${idx * 0.12}s`;
      p.innerHTML = `<span class="k">${line.k}:</span> <span class="v">${line.v}</span>`;
      terminalOutput.appendChild(p);
    });
  }

  async function runHeroSequence() {
    await typeCommand(COMMAND, typedLine);
    typeCursor.style.animationPlayState = 'running';
    await new Promise(r => setTimeout(r, 250));
    renderOutput(OUTPUT_LINES);
  }

  runHeroSequence();

  /* ============================================================
     HABILIDADES: render de listas + barras animadas al entrar en vista
     ============================================================ */
  function renderSkills(list, container, variant) {
    list.forEach(skill => {
      const li = document.createElement('li');
      li.className = 'skill';
      li.innerHTML = `
        <div class="skill__top">
          <span>${skill.name}</span>
          <span class="skill__level">${skill.level}%</span>
        </div>
        <div class="skill__bar ${variant}">
          <span style="width:${skill.level}%"></span>
        </div>
      `;
      container.appendChild(li);
    });
  }

  renderSkills(SKILLS_SECURITY, document.getElementById('skillsSecurity'), 'sec');
  renderSkills(SKILLS_FRONTEND, document.getElementById('skillsFrontend'), 'fe');

  const toolsGrid = document.getElementById('toolsGrid');
  TOOLS.forEach(tool => {
    const span = document.createElement('span');
    span.className = 'tool';
    span.textContent = tool;
    toolsGrid.appendChild(span);
  });

  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.skill__bar').forEach(bar => barObserver.observe(bar));

  /* ============================================================
     PROYECTOS: render + filtro
     ============================================================ */
  const projectsGrid = document.getElementById('projectsGrid');
  const filters = document.getElementById('filters');

  function badgeLabel(category) {
    return category === 'frontend' ? 'desarrollo' : 'ciberseguridad';
  }

  function renderProjects(category) {
    projectsGrid.innerHTML = '';
    const list = category === 'all'
      ? PROJECTS
      : PROJECTS.filter(p => p.category === category);

    list.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project';
      card.innerHTML = `
        <div class="project__head">
          <h3 class="project__name">${project.name}</h3>
          <span class="project__badge project__badge--${project.category}">${badgeLabel(project.category)}</span>
        </div>
        <p class="project__desc">${project.desc}</p>
        <div class="project__stack">
          ${project.stack.map(s => `<span class="chip">${s}</span>`).join('')}
        </div>
        <div class="project__links">
          <a href="${project.demo}" target="_blank" rel="noopener">demo</a>
          <a href="${project.code}" target="_blank" rel="noopener">código</a>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    filters.querySelectorAll('.filter').forEach(f => {
      f.classList.remove('is-active');
      f.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    renderProjects(btn.dataset.filter);
  });

  renderProjects('all');

  /* ============================================================
     EXPERIENCIA: timeline
     ============================================================ */
  const timelineEl = document.getElementById('timeline');
  TIMELINE.forEach(item => {
    const div = document.createElement('div');
    div.className = 'timeline__item';
    div.innerHTML = `
      <p class="timeline__period">${item.period}</p>
      <h3 class="timeline__role">${item.role}</h3>
      <p class="timeline__org">${item.org}</p>
      <p class="timeline__desc">${item.desc}</p>
    `;
    timelineEl.appendChild(div);
  });

  /* ============================================================
     CONTACTO: validación simple en el cliente
     ============================================================ */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  function setFieldError(field, message) {
    let error = field.parentElement.querySelector('.field__error');
    if (!error) {
      error = document.createElement('span');
      error.className = 'field__error';
      field.parentElement.appendChild(error);
    }
    error.textContent = message || '';
    field.parentElement.classList.toggle('has-error', Boolean(message));
  }

  function validate() {
    let valid = true;
    const nombre = document.getElementById('fieldNombre');
    const correo = document.getElementById('fieldCorreo');
    const mensaje = document.getElementById('fieldMensaje');

    if (!nombre.value.trim()) {
      setFieldError(nombre, 'Cuéntame tu nombre.');
      valid = false;
    } else {
      setFieldError(nombre, '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correo.value.trim())) {
      setFieldError(correo, 'Escribe un correo válido.');
      valid = false;
    } else {
      setFieldError(correo, '');
    }

    if (mensaje.value.trim().length < 10) {
      setFieldError(mensaje, 'El mensaje necesita al menos 10 caracteres.');
      valid = false;
    } else {
      setFieldError(mensaje, '');
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'contact__status';

    if (!validate()) {
      status.textContent = 'Revisa los campos marcados antes de enviar.';
      status.classList.add('err');
      return;
    }

    // No hay backend conectado todavía: esto es un placeholder visual.
    // Conéctalo a tu servicio de correo (Formspree, EmailJS, tu propia API, etc.)
    status.textContent = 'Mensaje listo para enviar. Conecta este formulario a tu servicio de correo preferido.';
    status.classList.add('ok');
    form.reset();
  });

  /* ============================================================
     FOOTER: año actual
     ============================================================ */
  document.getElementById('year').textContent = new Date().getFullYear();

})();