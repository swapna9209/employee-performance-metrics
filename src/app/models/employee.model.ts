export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  performance: number; // 0-100
  lastReviewDate?: string;
}
