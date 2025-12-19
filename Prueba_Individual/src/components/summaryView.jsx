import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SummaryView({ data }) {
  const getBadgeClass = (percentage) => {
    if (percentage >= 70) return 'badge badge-green';
    if (percentage >= 50) return 'badge badge-yellow';
    return 'badge badge-red';
  };

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Retención por Año de Cohorte</h2>
        <p className="card-subtitle">
          Porcentaje de estudiantes que se matriculan en su segundo año respecto a su cohorte inicial.
        </p>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Año Cohorte</th>
                <th>Cohorte</th>
                <th>Retenidos (Año +1)</th>
                <th>Retención %</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.year}>
                  <td style={{ fontWeight: 500 }}>{item.year}</td>
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

      <div className="card">
        <h3 className="card-title">Gráfico de Retención</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="porcentaje" fill="#3b82f6" name="Retención %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SummaryView;