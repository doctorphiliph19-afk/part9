import express from "express";
import patientService from "../services/patientService.ts";
import { Gender } from "../types.ts";
import type { NewPatient, NonSensitivePatient } from "../types.ts";

const router = express.Router();

const isGender = (value: unknown): value is Gender =>
  Object.values(Gender).some((gender) => gender === value);

const isNewPatient = (body: unknown): body is NewPatient => {
  if (typeof body !== "object" || body === null) return false;

  const patient = body as Record<string, unknown>;
  return ["name", "dateOfBirth", "ssn", "occupation"]
    .every((field) => typeof patient[field] === "string") &&
    isGender(patient.gender);
};

router.get("/", (_req, res) => {
  const patients: NonSensitivePatient[] = patientService.getPatients();
  res.json(patients);
});

router.post("/", (req, res) => {
  if (!isNewPatient(req.body)) {
    res.status(400).send("Invalid patient data");
    return;
  }

  const newPatient = patientService.addPatient(req.body);

  res.json(newPatient);
});

export default router;