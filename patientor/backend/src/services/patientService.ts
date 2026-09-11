import { v1 as uuid } from "uuid";
import patients from "../../data/patients.ts";
import type { NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types.ts";

const getPatients = (): NonSensitivePatient[] => patients.map(({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}: Patient): NonSensitivePatient => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}));

const findById = (id: string): Patient | undefined => patients.find((patient) => patient.id === id);

const addEntry = (id: string, entry: NewEntry) => {
  const patient = findById(id);

  if (!patient) {
    return undefined;
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  findById,
  addEntry,
  addPatient,
};