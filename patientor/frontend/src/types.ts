export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export interface Entry {
  id: string;
  date: string;
  type: "Hospital" | "HealthCheck";
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
}

export type EntryFormValues = Pick<Entry, "date" | "description" | "specialist">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;