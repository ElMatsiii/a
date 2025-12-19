import { retentionApi } from '../api/apiRetencion.js';
import {
  calculateRetentionByYear,
  calculateRetentionByProgram,
  extractPrograms,
  extractYears
} from '../utils/calculations';

// Cache para evitar cargar el JSON múltiples veces
let cachedData = null;

async function getData() {
  if (!cachedData) {
    console.log('Cargando datos por primera vez...');
    cachedData = await retentionApi.loadStudentRecords();
  }
  return cachedData;
}

export const retentionService = {
  async getRetentionSummaryByYear() {
    const data = await getData();
    return calculateRetentionByYear(data);
  },

  async getRetentionByProgram(year = null) {
    const data = await getData();
    return calculateRetentionByProgram(data, year);
  },

  async getPrograms() {
    const data = await getData();
    return extractPrograms(data);
  },

  async getYears() {
    const data = await getData();
    return extractYears(data);
  },
  
  clearCache() {
    cachedData = null;
  }
};