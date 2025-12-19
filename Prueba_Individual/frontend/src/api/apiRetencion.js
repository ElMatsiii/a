import { mockStudentRecords } from '../data/mockData';

export const retentionApi = {
  async loadStudentRecords() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStudentRecords);
      }, 500);
    });
  }
};