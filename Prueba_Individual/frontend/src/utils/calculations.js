export function calculateRetentionByYear(data) {
  const cohortsByYear = {};

  data.forEach(record => {
    const yearAdmision = parseInt(record.year_admision);
    const yearEstado = parseInt(record.year_estado);
    const codPrograma = record.cod_programa;
    const rut = record.rut;
    const isMatriculado = record.cod_estado === 'M';

    if (!isMatriculado) return;

    const key = `${yearAdmision}`;
    if (!cohortsByYear[key]) {
      cohortsByYear[key] = {
        firstTimeStudents: new Set(),
        retainedStudents: new Set()
      };
    }

    if (yearAdmision === yearEstado) {
      cohortsByYear[key].firstTimeStudents.add(`${rut}_${codPrograma}`);
    }

    if (yearEstado === yearAdmision + 1) {
      const studentKey = `${rut}_${codPrograma}`;
      cohortsByYear[key].retainedStudents.add(studentKey);
    }
  });

  const summary = Object.keys(cohortsByYear).map(year => {
    const cohort = cohortsByYear[year];
    const cohorteSize = cohort.firstTimeStudents.size;
    const retainedCount = [...cohort.retainedStudents].filter(s => 
      cohort.firstTimeStudents.has(s)
    ).length;
    const retentionRate = cohorteSize > 0 ? (retainedCount / cohorteSize * 100).toFixed(2) : 0;

    return {
      year: parseInt(year),
      cohorte: cohorteSize,
      retenidos: retainedCount,
      porcentaje: parseFloat(retentionRate)
    };
  }).sort((a, b) => a.year - b.year);

  return summary;
}

export function calculateRetentionByProgram(data, filterYear = null) {
  const cohortsByProgram = {};

  data.forEach(record => {
    const yearAdmision = parseInt(record.year_admision);
    const yearEstado = parseInt(record.year_estado);
    const codPrograma = record.cod_programa;
    const nombrePrograma = record.nombre_estandar;
    const rut = record.rut;
    const isMatriculado = record.cod_estado === 'M';

    if (!isMatriculado) return;
    if (filterYear && yearAdmision !== filterYear) return;

    const key = `${codPrograma}_${yearAdmision}`;
    if (!cohortsByProgram[key]) {
      cohortsByProgram[key] = {
        cod_programa: codPrograma,
        nombre_estandar: nombrePrograma,
        year: yearAdmision,
        firstTimeStudents: new Set(),
        retainedStudents: new Set()
      };
    }

    if (yearAdmision === yearEstado) {
      cohortsByProgram[key].firstTimeStudents.add(rut);
    }

    if (yearEstado === yearAdmision + 1) {
      cohortsByProgram[key].retainedStudents.add(rut);
    }
  });

  const byProgram = Object.values(cohortsByProgram).map(item => {
    const cohorteSize = item.firstTimeStudents.size;
    const retainedCount = [...item.retainedStudents].filter(s => 
      item.firstTimeStudents.has(s)
    ).length;
    const retentionRate = cohorteSize > 0 ? (retainedCount / cohorteSize * 100).toFixed(2) : 0;

    return {
      cod_programa: item.cod_programa,
      nombre_estandar: item.nombre_estandar,
      year: item.year,
      cohorte: cohorteSize,
      retenidos: retainedCount,
      porcentaje: parseFloat(retentionRate)
    };
  }).sort((a, b) => {
    if (a.cod_programa !== b.cod_programa) {
      return a.cod_programa.localeCompare(b.cod_programa);
    }
    return a.year - b.year;
  });

  return byProgram;
}

export function extractPrograms(data) {
  const programs = [...new Set(data.map(r => r.cod_programa))].sort();
  const programsWithNames = programs.map(code => {
    const record = data.find(r => r.cod_programa === code);
    return {
      cod_programa: code,
      nombre_estandar: record?.nombre_estandar || 'Sin nombre'
    };
  });
  return programsWithNames;
}

export function extractYears(data) {
  const years = [...new Set(data.map(r => parseInt(r.year_admision)))].sort();
  return years;
}