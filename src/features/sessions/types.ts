export interface SeminarSession {
  id: number | string;
  name: string;
  province: string;
  vanue: string; // preserved for compatibility with session data
  venue?: string;
  date: string;
  year: string;
  status: "Completed" | "Ongoing" | "Upcoming" | string;
  schools: number;
  participants: number;
  description: string;
  image: string;
  albumURL?: string;
}
