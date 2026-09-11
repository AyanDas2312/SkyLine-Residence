export interface Notice {
  _id: string;
  title: string;
  description: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
}