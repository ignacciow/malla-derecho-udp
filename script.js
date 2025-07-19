// script.js

// 1. Datos de cursos y prerrequisitos
const courses = [
  // 1er Semestre
  { code: 'DER06111', name: 'Fundamentos histórico-sociales', prereqs: [] },
  { code: 'DER06112', name: 'Instituciones Políticas y DD.HH.', prereqs: [] },
  { code: 'DER06113', name: 'Taller de razonamiento jurídico', prereqs: [] },
  { code: 'DER06114', name: 'Taller de investigación y escritura legal', prereqs: [] },
  { code: 'DER06115', name: 'Comunicación oral', prereqs: [] },

  // 2° Semestre
  { code: 'DER06121', name: 'Persona y acto jurídico', prereqs: ['DER06111'] },
  { code: 'DER06122', name: 'Derecho Constitucional Orgánico', prereqs: ['DER06112'] },
  { code: 'DER06123', name: 'Introducción al Derecho I', prereqs: ['DER06113'] },
  { code: 'DER06124', name: 'Bases Generales del Derecho Procesal', prereqs: ['DER06113'] },

  // 3er Semestre
  { code: 'DER06211', name: 'Derechos Reales y Derecho Inmobiliario', prereqs: ['DER06121'] },
  { code: 'DER06212', name: 'Derechos Fundamentales', prereqs: ['DER06122'] },
  { code: 'DER06213', name: 'Introducción al Derecho II', prereqs: ['DER06123'] },
  { code: 'DER06214', name: 'Economía y Derecho (FI)', prereqs: ['DER06114'] },

  // 4° Semestre
  { code: 'DER06221', name: 'Derecho de las Obligaciones', prereqs: ['DER06211'] },
  { code: 'DER06222', name: 'Derecho Penal Parte General I', prereqs: ['DER06123'] },
  { code: 'DER06223', name: 'Taller Destrezas Litigación Oral', prereqs: ['DER06115','DER06124','DER06211','DER06212','DER06213'] },
  { code: 'DER06224', name: 'Derecho Regulatorio', prereqs: ['DER06214'] },

  // 5° Semestre
  { code: 'DER06311', name: 'Derecho de Daños', prereqs: ['DER06221'] },
  { code: 'DER06312', name: 'Derecho Internacional Público', prereqs: ['DER06212'] },
  { code: 'DER06313', name: 'Derecho Penal Parte General II', prereqs: ['DER06213','DER06222'] },
  { code: 'DER06314', name: 'Procedimientos Judiciales', prereqs: ['DER06223'] },
  { code: 'DER06315', name: 'Derecho Comercial', prereqs: ['DER06224'] },

  // 6° Semestre
  { code: 'DER06321', name: 'Contratos', prereqs: ['DER06114','DER06311'] },
  { code: 'DER06322', name: 'Derecho Administrativo', prereqs: ['DER06223','DER06224'] },
  { code: 'DER06323', name: 'Derecho Penal Parte Especial', prereqs: ['DER06313'] },
  { code: 'DER06324', name: 'Derecho Societario', prereqs: ['DER06315'] },

  // 7° Semestre
  { code: 'DER06411', name: 'Derecho de Familia y Sucesorio', prereqs: ['DER06321'] },
  { code: 'DER06412', name: 'Derecho y Medio Ambiente (FI)', prereqs: ['DER06322'] },
  { code: 'DER06413', name: 'Proceso Penal', prereqs: ['DER06323'] },
  { code: 'DER06414', name: 'Taller de Negociación en Procesos Colaborativos (FI)', prereqs: ['DER06314'] },
  { code: 'DER06415', name: 'Derecho Tributario', prereqs: ['DER06224'] },
  { code: 'DER06416', name: 'Derecho del Trabajo', prereqs: ['DER06214','DER06223'] },

  // 8° Semestre
  { code: 'DER06C_F1', name: 'Clínicas Jurídicas / Pasantía Super.', prereqs: ['DER06411','DER06412','DER06413','DER06414','DER06324'] },
  { code: 'DER06OPT1', name: 'Curso Optativo I', prereqs: ['DER06321','DER06322','DER06323','DER06324'] },
  { code: 'DER06OPT2', name: 'Curso Optativo II', prereqs: ['DER06321','DER06322','DER06323','DER06324'] },
  { code: 'DER06OPT3', name: 'Curso Optativo III', prereqs: ['DER06321','DER06322','DER06323','DER06324'] },

  // 9° Semestre
  { code: 'DER06C_F2', name: 'Clínicas Jurídicas II / Pasantía', prereqs: ['DER06411','DER06412','DER06413','DER06414','DER06324'] },
  { code: 'DER06511', name: 'Filosofía del Derecho', prereqs: ['DER06213'] },
  { code: 'DER06OPT4', name: 'Curso Optativo IV', prereqs: ['DER06321','DER06322','DER06323','DER06324'] },
  { code: 'DER06512', name: 'Seminario de investigación y escritura jurídica avanzada', prereqs: ['DER06C_F1'] },

  // 10° Semestre
  { code: 'DER06521', name: 'Curso de integración y actividad de licenciatura', prereqs: ['DER06415','DER06416','DER06C_F2','DER06511','DER06512'] },
  { code: 'DER06522', name: 'Ética y responsabilidad profesional en la abogacía', prereqs: ['DER06C_F2'] },
  { code: 'DER06523', name: 'Taller de inserción y emprendimiento profesional', prereqs: ['DER06C_F2'] },
  { code: 'DER06OPT5', name: 'Curso Optativo V', prereqs: ['DER06321','DER06322','DER06323','DER06324'] }
];

// 2. Estado: cursos aprobados
const approved = new Set();

// 3. Verificar si un curso está desbloqueado
function isUnlocked(course) {
  return course.prereqs.every(pr => approved.has(pr));
}

// 4. Renderizado de la malla
const container = document.getElementById('malla-container');

function render() {
  container.innerHTML = '';
  courses.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    if (approved.has(course.code)) div.classList.add('approved');
    else if (!isUnlocked(course)) div.classList.add('locked');
    div.innerHTML = `
      <div class="name">${course.name}</div>
      <div class="code">${course.code}</div>
    `;
    div.onclick = () => {
      if (isUnlocked(course)) {
        approved.has(course.code)
          ? approved.delete(course.code)
          : approved.add(course.code);
        render();
      }
    };
    container.appendChild(div);
  });
}

// 5. Inicializar render
render();
