import express from "express";
import diagnosisService from "../services/diagnosisService.ts";
import type { Diagnosis } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses: Diagnosis[] = diagnosisService.getDiagnoses();
  res.json(diagnoses);
});

export default router;
