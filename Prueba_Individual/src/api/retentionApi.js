export const retentionApi = {
  async loadStudentRecords() {
    try {
      console.log('Iniciando carga de datos desde output.json...');
      const response = await fetch('/data/output.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Cargados exitosamente ${data.length} registros`);
      
      return data;
    } catch (error) {
      console.error('Error cargando datos desde output.json:', error);
      alert('Error al cargar los datos. Verifica que output.json esté en public/data/');
      throw error;
    }
  }
};