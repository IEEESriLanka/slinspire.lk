import { APP_CONFIG } from "@/config/constants";
import { SeminarSession, SessionStatus } from "@/types";
import axios from "axios";

function compareStrings(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b) return false;
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function parseStatus(status: string | undefined): SessionStatus {
    return compareStrings(status, "Completed") ? "Completed" : compareStrings(status, "Ongoing") ? "Ongoing" : "Upcoming"
}

export function parseSessionsCsv(csvText: string): SeminarSession[] {
  const rows = csvText.split("\n").map((row) => row.split("\t"));
  return rows.slice(2).map((row, index) => {
    const record: SeminarSession = {
      id: String(index + 1),
      name: row[0]?.trim() || "",
      province: row[1]?.trim() || "",
      vanue: row[2]?.trim() || "",
      date: row[3]?.trim() || "",
      year: row[4]?.trim() || "",
      status:  parseStatus(row[5]?.trim()),
      schools: parseInt(row[6]?.trim()) || 0,
      participants: parseInt(row[7]?.trim()) || 0,
      description: row[8]?.trim() || "",
      image: row[9]?.trim() || "",
      albumURL: row[10]?.trim() || "",
    };
    return record;
  });
}

export async function fetchSessions(): Promise<SeminarSession[]> {
  const response = await axios.get<string>(
    APP_CONFIG.ENDPOINTS.SESSIONS_TSV,
    { responseType: "text" }
  );

  return parseSessionsCsv(response.data);
}