import express from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: NonSensitivePatient[] = patientService.getPatients();
  res.json(patients);
});

export default router;