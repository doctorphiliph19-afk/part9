import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Card, CardContent, Stack, Typography } from "@mui/material";

import patientService from "../services/patients";
import { Diagnosis, Entry, Patient } from "../types";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>
          <strong>{entry.date}</strong>
        </Typography>
        <Typography>{entry.description}</Typography>
        <Typography>diagnosed by {entry.specialist}</Typography>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name ?? "Unknown diagnosis"}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) return;
    void patientService.getOne(id)
      .then(setPatient)
      .catch(() => setError("Could not load patient"));
  }, [id]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!patient) return <Typography>Loading patient...</Typography>;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth}</Typography>

      <Typography variant="h5">Entries</Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries</Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}

    </Stack>
  );
};

export default PatientPage;
