import React, { useState, useEffect } from 'react';
import { retentionService } from './services/retentionService';
import Header from './components/header';
import SummaryView from './components/summaryView';
import ProgramView from './components/programView';

function App() {
  const [summaryData, setSummaryData] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('summary');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadProgramData();
    }
  }, [selectedYear, loading]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [summary, progs, yrs] = await Promise.all([
        retentionService.getRetentionSummaryByYear(),
        retentionService.getPrograms(),
        retentionService.getYears()
      ]);
      setSummaryData(summary);
      setPrograms(progs);
      setYears(yrs);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgramData = async () => {
    try {
      const data = await retentionService.getRetentionByProgram(selectedYear);
      setProgramData(data);
    } catch (error) {
      console.error('Error loading program data:', error);
    }
  };

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    <div>
      <Header />

      <nav className="nav">
        <div className="container">
          <div className="nav-container">
            <button
              onClick={() => setActiveView('summary')}
              className={`nav-button ${activeView === 'summary' ? 'active' : ''}`}
            >
              Resumen por Año
            </button>
            <button
              onClick={() => setActiveView('programs')}
              className={`nav-button ${activeView === 'programs' ? 'active' : ''}`}
            >
              Por Carrera
            </button>
          </div>
        </div>
      </nav>

      <main className="main">
        <div className="container">
          {activeView === 'summary' && <SummaryView data={summaryData} />}
          
          {activeView === 'programs' && (
            <ProgramView
              data={programData}
              programs={programs}
              years={years}
              selectedYear={selectedYear}
              selectedProgram={selectedProgram}
              onYearChange={setSelectedYear}
              onProgramChange={setSelectedProgram}
            />
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">Universidad Católica del Norte - Sistema de Retención Estudiantil</p>
          <p className="footer-text">Proyecto Integrador Software - 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;