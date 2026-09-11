import express from "express";
import { z } from "zod";
import patientService from "../services/patientService.ts";
import { NewEntrySchema, NewPatientSchema } from "../types.ts";
import type { NonSensitivePatient, Patient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients: NonSensitivePatient[] = patientService.getPatients();
  res.json(patients);
});

router.get("/:id", (req, res) => {
  const patient: Patient | undefined = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: "Patient not found" });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = NewEntrySchema.parse(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);

    if (!addedEntry) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }

    res.status(400).json({ error: "unknown error" });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    res.json(patientService.addPatient(newPatient));
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }

    res.status(400).json({ error: "unknown error" });
  }
});

export default router;