export const LeaveTestData = {
  // Employee data
  employees: {
    existing: '3221',      // Employee that already has annual leave
    new: '3222',           // New employee without leave
    searchable: 'Nhân viên nhân sự',
    nonExistent: 'abc123xyz',
    multiple: ['DV0077', 'KD00032']
  },
  
  // Year data
  years: {
    current: '2025',
    future: '2026',
    farFuture: '2040',
    past: '2020',
    leap: '2024'
  },
  
  // Day values for testing
  days: {
    valid: '12',
    zero: '0',
    negative: '-1',
    decimal: '0.5',
    large: '366',
    tooLarge: '367',
    empty: '',
    text: 'abc',
    specialChars: '@#$'
  },
  
  // Status values
  status: {
    new: 'Mới',
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối',
    cancelled: 'Đã hủy'
  },
  
  // Department data
  departments: {
    hr: 'Nhân sự',
    marketing: 'Marketing',
    service: 'Dịch vụ'
  },
  
  // Reason data
  reasons: {
    cancel: 'Hủy vì nhầm thông tin',
    reject: 'Trùng lịch dự án quan trọng',
    test: 'Lý do test'
  },
  
  // Validation messages (Vietnamese)
  validationMessages: {
    integerRequired: 'Tổng số ngày nghỉ phải là một số nguyên.',
    requiredField: 'Nhập số ngày nghỉ phép',
    minValue: 'Giá trị phải lớn hơn hoặc bằng 0.',
    maxValue: 'Giá trị phải nhỏ hơn hoặc bằng 366.',
    selectEmployee: 'Vui lòng chọn nhân viên',
    duplicateLeave: 'Nghỉ phép năm đã tồn tại.',
    reasonRequired: 'Lý do là bắt buộc'
  },
  
  // Toast messages (Vietnamese)
  toastMessages: {
    success: 'Thành công',
    addSuccess: 'Thêm thành công',
    updateSuccess: 'Cập nhật thành công',
    cancelSuccess: 'Hủy thành công',
    confirmSuccess: 'Xác nhận thành công',
    addFail: 'Thêm không thành công',
    selectEmployee: 'Vui lòng chọn nhân viên'
  }
};

export const TestUsers = {
  admin: {
    email: 'info@bigapptech.vn',
    password: '12345678@Bat'
  },
  employee: {
    email: 'employee@company.com',
    password: 'employee123'
  }
};