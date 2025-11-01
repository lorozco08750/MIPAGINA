(function () {
  function resolveAssetPath(relativePath) {
    if (!relativePath) {
      return relativePath;
    }

    const trimmedPath = relativePath.replace(/^\/+/, "");

    if (window.location.protocol === "file:") {
      return trimmedPath;
    }

    if (window.location.hostname.endsWith(".github.io")) {
      const segments = window.location.pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        return `/${segments[0]}/${trimmedPath}`;
      }
    }

    return trimmedPath;
  }

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0, 0);
  });

  const loader = document.getElementById('sunset-loader');
  window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    if (loader) {
      setTimeout(function () {
        requestAnimationFrame(function () {
          window.scrollTo(0, 0);
          loader.classList.add('is-hidden');
          document.body.classList.remove('loading');
        });
      }, 5000);
    }
  });

  const yearElement = document.getElementById('anio-actual');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    if (yearElement.textContent !== String(currentYear)) {
      yearElement.textContent = currentYear;
    }
  }

  const heroVideoSource = document.querySelector('[data-js="hero-video"] source[data-src]');
  if (heroVideoSource) {
    const resolvedSrc = resolveAssetPath(heroVideoSource.getAttribute('data-src'));
    document.querySelectorAll('[data-js="hero-video"] source[data-src]').forEach(function (source) {
      source.setAttribute('src', resolvedSrc);
      source.removeAttribute('data-src');
    });
    const heroVideoElement = heroVideoSource.closest('video');
    heroVideoElement?.load?.();
  }

  const button = document.getElementById('simulador-servicio');
  if (!button) {
    return;
  }

  const serviciosDisponibles = [
    { id: 'branding', etiqueta: 'branding' },
    { id: 'ux', etiqueta: 'ux' },
    { id: 'multimedia', etiqueta: 'multimedia' }
  ];

  const paquetesPorServicio = {
    branding: [
      { minimo: 500, nombre: 'Kick-off de Identidad' },
      { minimo: 1000, nombre: 'Identidad Integral + Brandbook' },
      { minimo: 2000, nombre: 'Estrategia y Lanza Digital Completa' }
    ],
    ux: [
      { minimo: 600, nombre: 'Sprint UX Focus' },
      { minimo: 1200, nombre: 'Investigación + Prototipado' },
      { minimo: 2500, nombre: 'Experiencia Omnicanal Completa' }
    ],
    multimedia: [
      { minimo: 400, nombre: 'Producción de Contenido Social' },
      { minimo: 900, nombre: 'Campaña Multimedia Semanal' },
      { minimo: 1800, nombre: 'Producción Narrativa Premium' }
    ]
  };

  function recomendarPlan(servicio, presupuesto) {
    const paquetes = paquetesPorServicio[servicio] || [];
    let propuesta = 'Sesión estratégica de diagnóstico individual';
    for (let i = 0; i < paquetes.length; i++) {
      const paquete = paquetes[i];
      if (presupuesto >= paquete.minimo) {
        propuesta = paquete.nombre;
      } else {
        break;
      }
    }
    return propuesta;
  }

  button.addEventListener('click', function () {
    const deseaSimular = confirm('¿Te gustaría simular un plan creativo para tu marca?');
    if (!deseaSimular) {
      alert('Perfecto, cuando quieras probar de nuevo aquí estaremos.');
      return;
    }

    let servicioElegido = '';
    let intentos = 0;
    const maxIntentos = 3;

    while (intentos < maxIntentos) {
      const respuestaServicio = prompt('¿Qué servicio te interesa? (branding / ux / multimedia)');
      if (respuestaServicio === null) {
        alert('Simulación cancelada. Vuelve a intentarlo cuando quieras.');
        return;
      }

      const opcionNormalizada = respuestaServicio.trim().toLowerCase();
      if (opcionNormalizada === '') {
        alert('Necesitamos que ingreses una opción para continuar.');
      } else {
        let encontrado = false;
        for (let i = 0; i < serviciosDisponibles.length; i++) {
          const servicio = serviciosDisponibles[i];
          if (servicio.etiqueta === opcionNormalizada) {
            servicioElegido = servicio.id;
            encontrado = true;
            break;
          }
        }

        if (encontrado) {
          break;
        }

        alert('No reconocimos la opción. Intenta con branding, ux o multimedia.');
      }

      intentos++;
    }

    if (servicioElegido === '') {
      alert('No fue posible identificar un servicio a recomendar. Intenta de nuevo más tarde.');
      return;
    }

    let presupuesto = 0;
    let intentosPresupuesto = 0;
    let presupuestoValido = false;

    while (!presupuestoValido && intentosPresupuesto < 3) {
      const respuestaPresupuesto = prompt('¿Cuál es tu presupuesto mensual aproximado en USD?');
      if (respuestaPresupuesto === null) {
        alert('Simulación cancelada. Vuelve a intentarlo cuando quieras.');
        return;
      }

      const valorNormalizado = respuestaPresupuesto.replace(/[\s,]/g, '');
      const monto = Number(valorNormalizado);

      if (Number.isNaN(monto) || monto <= 0) {
        alert('Ingresa un número mayor que cero. Por ejemplo: 1200');
        intentosPresupuesto++;
        continue;
      }

      presupuesto = Math.round(monto);
      presupuestoValido = true;
    }

    if (!presupuestoValido) {
      alert('No pudimos registrar un presupuesto válido. Intenta nuevamente más tarde.');
      return;
    }

    const recomendacion = recomendarPlan(servicioElegido, presupuesto);
    const servicioSeleccionado = serviciosDisponibles.find(function (item) {
      return item.id === servicioElegido;
    });

    if (servicioSeleccionado && servicioSeleccionado.etiqueta === 'branding') {
      alert(
        'Para branding recomendamos empezar con un taller de voz de marca y continuar con la propuesta sugerida.'
      );
    }

    alert(
      `Servicio: ${servicioSeleccionado ? servicioSeleccionado.etiqueta.toUpperCase() : servicioElegido.toUpperCase()}
Presupuesto: $${presupuesto} USD
Propuesta sugerida: ${recomendacion}`
    );
  });
})();
