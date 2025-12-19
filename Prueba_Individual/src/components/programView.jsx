import React from 'react';

function ProgramView({ 
  data, 
  programs, 
  years, 
  selectedYear, 
  selectedProgram,
  onYearChange,
  onProgramChange 
}) {
  const getBadgeClass = (percentage) => {
    if (percentage >= 70) return 'badge badge-green';
    if (percentage >= 50) return 'badge badge-yellow';
    return 'badge badge-red';
  };

  const filteredData = selectedProgram
    ? data.filter(item => item.cod_programa === selectedProgram)
    : data;

  return (
    <div className="card">
      <h2 className="card-title">Retención por Carrera</h2>
      <p className="card-subtitle">
        Filtra por año y/o carrera para ver el detalle de retención.
      </p>
      
      <div className="filters-grid">
        <div className="form-group">
          <label className="form-label">Año de Cohorte:</label>
          <select
            value={selectedYear || ''}
            onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
            className="form-select"
          >
            <option value="">-- Todos los años --</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Carrera:</label>
          <select
            value={selectedProgram || ''}
            onChange={(e) => onProgramChange(e.target.value || null)}
            className="form-select"
          >
            <option value="">-- Todas las carreras --</option>
            {programs.map(prog => (
              <option key={prog.cod_programa} value={prog.cod_programa}>
                {prog.cod_programa} - {prog.nombre_estandar}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre Carrera</th>
              <th>Año</th>
              <th>Cohorte</th>
              <th>Retenidos</th>
              <th>% Retención</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No hay datos para mostrar con los filtros seleccionados
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={`${item.cod_programa}_${item.year}_${index}`}>
                  <td style={{ fontWeight: 'bold' }}>{item.cod_programa}</td>
                  <td>{item.nombre_estandar}</td>
                  <td>{item.year}</td>
                  <td>{item.cohorte}</td>
                  <td>{item.retenidos}</td>
                  <td>
                    <span className={getBadgeClass(item.porcentaje)}>
                      {item.porcentaje}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProgramView;