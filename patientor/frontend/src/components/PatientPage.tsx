import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

import patientService from "../services/patients";
import { EntryFormValues, Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const [entryFormOpen, setEntryFormOpen] = useState(false);
  const [form, setForm] = useState<EntryFormValues>({ date: "", description: "", specialist: "" });

  useEffect(() => {
    if (!id) return;
    void patientService.getOne(id)
      .then(setPatient)
      .catch(() => setError("Could not load patient"));
  }, [id]);

  const updateForm = (field: keyof EntryFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addEntry = async (event: FormEvent) => {
    event.preventDefault();
    if (!id) return;
    try {
      const entry = await patientService.createEntry(id, form);
      setPatient((current) => current && { ...current, entries: [...(current.entries ?? []), entry] });
      setForm({ date: "", description: "", specialist: "" });
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) setError("Could not add entry");
    }
  };

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!patient) return <Typography>Loading patient...</Typography>;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth}</Typography>

      <Typography variant="h5">Entries</Typography>
      {(patient.entries ?? []).map((entry) => (
        <Card key={entry.id} variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">{entry.type} - {entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <Typography variant="body2">Specialist: {entry.specialist}</Typography>
          </CardContent>
        </Card>
      ))}

      {!entryFormOpen && (
        <Button variant="contained" onClick={() => setEntryFormOpen(true)}>
          Add New Entry
        </Button>
      )}
      {entryFormOpen && (
        <form onSubmit={addEntry}>
          <Stack spacing={2}>
            <TextField label="Date" value={form.date} onChange={(event) => updateForm("date", event.target.value)} required />
            <TextField label="Description" value={form.description} onChange={(event) => updateForm("description", event.target.value)} required />
            <TextField label="Specialist" value={form.specialist} onChange={(event) => updateForm("specialist", event.target.value)} required />
            <Button type="submit" variant="contained">Add</Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
};

export default PatientPage;
