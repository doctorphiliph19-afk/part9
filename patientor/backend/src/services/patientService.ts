import patients from "../../data/patients.ts";
import type { NonSensitivePatient, Patient } from "../types.ts";

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

export default {
  getPatients,
};