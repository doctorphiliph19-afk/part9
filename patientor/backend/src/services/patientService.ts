import { v1 as uuid } from "uuid";
import patients from "../../data/patients.ts";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";

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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  findById,
  addPatient,
};