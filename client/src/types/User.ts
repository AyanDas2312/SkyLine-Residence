export interface User {
  id: string;
  residentId: string;
  email: string;
  name: string;
  flatNo: string;
  role: 'user' | 'admin';
}