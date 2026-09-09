import express from "express";
import patientService from "../services/patientService.ts";
import type { NewPatient, NonSensitivePatient } from "../types.ts";

const router = express.Router();
const validGenders = ["male", "female", "other"] as const;

const isNewPatient = (body: unknown): body is NewPatient => {
  if (typeof body !== "object" || body === null) return false;

  const patient = body as Record<string, unknown>;
  return ["name", "dateOfBirth", "ssn", "occupation"]
    .every((field) => typeof patient[field] === "string") &&
    typeof patient.gender === "string" &&
    validGenders.includes(patient.gender as (typeof validGenders)[number]);
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