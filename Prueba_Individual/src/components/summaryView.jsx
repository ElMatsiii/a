import React from 'react';

function SummaryView({ data }) {
  const getBadgeClass = (percentage) => {
    if (percentage >= 70) return 'badge badge-green';
    if (percentage >= 50) return 'badge badge-yellow';
    return 'badge badge-red';
  };

  return (
    <div className="card">
      <h2 className="card-title">Resumen de Retención por Año de Cohorte</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Año Cohorte</th>
              <th>Estudiantes Cohorte</th>
              <th>Retenidos Año Siguiente</th>
              <th>Porcentaje Retención</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.year}>
                <td style={{ fontWeight: 'bold' }}>{item.year}</td>
                <td>{item.cohorte}</td>
                <td>{item.retenidos}</td>
                <td>
                  <span className={getBadgeClass(item.porcentaje)}>
                    {item.porcentaje}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SummaryView;