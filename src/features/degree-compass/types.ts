export interface DegreeStream {
  art?: boolean;
  commerce?: boolean;
  bio?: boolean;
  physics?: boolean;
  tech?: boolean;
}

export interface DegreeRecord {
  id: string;
  uniId: string;
  universityName: string;
  courseName: string;
  majorField: string;
  subField?: string;
  courseUrl?: string;
  courseType?: string;
  stream: DegreeStream;
  courseMode?: string;
  qualificationLevel?: string;
  isPaid: boolean;
  ugcCode?: string;
}

export interface DegreeFilterOptions {
  universities: string[];
  majorFields: string[];
  subFields: string[];
  types: string[];
  paymentStatuses: string[];
  courseModes: string[];
  qualificationLevels: string[];
  streams: string[];
}

export interface DegreeFilters {
  university: string;
  course: string;
  majorField: string;
  subField: string;
  type: string;
  isPaid: string;
  courseMode: string;
  qualificationLevel: string;
  stream: string;
}
