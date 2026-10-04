import { APP_CONFIG } from "@/config/constants";
import {
  DegreeRecord,
  DegreeFilterOptions,
} from "../types";

export const streamLabels: Record<keyof DegreeRecord["stream"], string> = {
  art: "Art",
  commerce: "Commerce",
  bio: "Bio",
  physics: "Physics",
  tech: "Tech",
};

function compareStrings(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b) return false;
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function parseDegreeTsv(tsvText: string): DegreeRecord[] {
  const rows = tsvText.split("\n").map((row) => row.split("\t"));
  const headerNumbers = rows[0];
  const gn = (n: string): number => headerNumbers.indexOf(n);

  return rows.slice(2).map((row, index) => {
    const record: DegreeRecord = {
      id: String(index + 1),
      uniId: row[gn("1")]?.trim() || "",
      universityName: row[gn("3")]?.trim() || "",
      courseName: row[gn("4")]?.trim() || "",
      majorField: row[gn("10")]?.trim() || "",
      subField: row[gn("11")]?.trim() || "",
      courseUrl: row[gn("9")]?.trim() || "",
      courseType: row[gn("26")]?.trim().toUpperCase(),
      stream: {
        art: row[gn("40")]?.trim().toLowerCase() === "true",
        commerce: row[gn("39")]?.trim().toLowerCase() === "true",
        bio: row[gn("37")]?.trim().toLowerCase() === "true",
        physics: row[gn("38")]?.trim().toLowerCase() === "true",
        tech: row[gn("41")]?.trim().toLowerCase() === "true",
      },
      isPaid: row[gn("18")]?.trim().toLowerCase() === "paid course",
      courseMode: compareStrings(row[gn("17")], "Full Time")
        ? "Full Time"
        : compareStrings(row[gn("17")], "Part Time")
          ? "Part Time"
          : compareStrings(row[gn("17")], "Full Time / Part Time")
            ? "Hybrid"
            : "",
      qualificationLevel: row[gn("56")]?.trim() || "",
      ugcCode: row[gn("8")]?.trim() || "",
    };
    return record;
  });
}

export function extractFilterOptions(dataRows: DegreeRecord[]): DegreeFilterOptions {
  const getOptions = (key: keyof DegreeRecord) =>
    Array.from(new Set(dataRows.map((row) => row[key]).filter(Boolean))).sort() as string[];

  return {
    majorFields: getOptions("majorField"),
    subFields: getOptions("subField"),
    types: getOptions("courseType"),
    universities: getOptions("universityName"),
    paymentStatuses: Array.from(
      new Set(dataRows.map((row) => (row.isPaid ? "Paid" : "Free")))
    ).sort(),
    courseModes: getOptions("courseMode"),
    qualificationLevels: getOptions("qualificationLevel"),
    streams: (Object.keys(streamLabels) as Array<keyof DegreeRecord["stream"]>)
      .filter((key) => dataRows.some((row) => row.stream[key]))
      .map((key) => streamLabels[key]),
  };
}

export async function fetchDegrees(): Promise<DegreeRecord[]> {
  const response = await fetch(APP_CONFIG.ENDPOINTS.DEGREE_COMPASS_TSV);
  const text = await response.text();
  return parseDegreeTsv(text);
}
