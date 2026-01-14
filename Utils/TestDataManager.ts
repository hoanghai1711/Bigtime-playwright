export class TestDataManager {
  private runId: string;
  private testPrefix: string;
  
  constructor(runId: string) {
    this.runId = runId;
    this.testPrefix = `test_${runId}_`;
  }
  
  generateEmployeeCode(): string {
    return `${this.testPrefix}emp_${Date.now()}`;
  }
  
  generateEmployeeName(): string {
    return `Test Employee ${this.runId}`;
  }
  
  generateEmail(): string {
    return `test_${this.runId}_${Date.now()}@test.com`;
  }
  
  generatePhoneNumber(): string {
    // Tạo SĐT unique dựa trên runId và timestamp
    const base = `84${Math.floor(Math.random() * 1000000000)}`;
    return base.padEnd(10, '0').substr(0, 10);
  }
  
  generateIdCard(): string {
    // Tạo CCCD 12 số unique
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return (timestamp + random).substr(-12);
  }
  
  getTestYear(baseYear: number = 2025): number {
    // Tạo năm test duy nhất cho mỗi run
    const offset = parseInt(this.runId.split('_')[1]?.substr(0, 4) || '0', 10) % 10;
    return baseYear + (offset % 5);
  }
  
  getUniqueYears(): { year1: number; year2: number; year3: number } {
    const base = this.getTestYear();
    return {
      year1: base,
      year2: base + 1,
      year3: base + 2
    };
  }
  
  generateLeaveData() {
    const years = this.getUniqueYears();
    return {
      pendingYear: years.year1,
      newYear: years.year2,
      departmentYear: years.year3,
      days: Math.floor(Math.random() * 10) + 1
    };
  }
}