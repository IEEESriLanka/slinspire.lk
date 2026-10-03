export interface StepUpStats {
  registered: number;
  available: number;
}

export interface StepUpTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface StepUpFormData {
  name: string;
  email: string;
  phone: string;
  nic: string;
  school: string;
  district: string;
  stream: string;
  field: string;
}
