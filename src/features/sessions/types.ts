export type SessionStatus = "Completed" | "Ongoing" | "Upcoming";

export interface SeminarSession {
  id: number | string;
  name: string;
  province: string;
  vanue: string; // preserved for compatibility with session data
  venue?: string;
  date: string;
  year: string;
  status: SessionStatus;
  schools?: number;
  participants?: number;
  description: string;
  image: string;
  albumURL?: string;
}
