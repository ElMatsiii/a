import { retentionApi } from '../api/retentionApi';
import {
  calculateRetentionByYear,
  calculateRetentionByProgram,
  extractPrograms,
  extractYears
} from '../utils/calculations';

export const retentionService = {
  async getRetentionSummaryByYear() {
    const data = await retentionApi.loadStudentRecords();
    return calculateRetentionByYear(data);
  },

  async getRetentionByProgram(year = null) {
    const data = await retentionApi.loadStudentRecords();
    return calculateRetentionByProgram(data, year);
  },

  async getPrograms() {
    const data = await retentionApi.loadStudentRecords();
    return extractPrograms(data);
  },

  async getYears() {
    const data = await retentionApi.loadStudentRecords();
    return extractYears(data);
  }
};