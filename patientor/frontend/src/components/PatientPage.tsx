import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from "../services/patients";
import { Diagnosis, Entry, Patient } from "../types";
import EntryForm from "./EntryForm";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  let typeDetails: React.ReactNode;

  switch (entry.type) {
    case "Hospital":
      typeDetails = (
        <>
          <div>Discharged {entry.discharge?.date}: {entry.discharge?.criteria}</div>
        </>
      );
      break;
    case "OccupationalHealthcare":
      typeDetails = (
        <>
          <div>Employer: {entry.employerName}</div>
          {entry.sickLeave && (
            <div>
              Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </div>
          )}
        </>
      );
      break;
    case "HealthCheck":
      typeDetails = <div>Health check rating: {entry.healthCheckRating}</div>;
      break;
    default:
      return assertNever(entry);
  }

  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        background: "#f9f9f9",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <div><strong>{entry.date}</strong></div>
      <div>{entry.description}</div>
      <div>diagnosed by {entry.specialist}</div>
      {typeDetails}
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name ?? "Unknown diagnosis"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    void patientService.getOne(id)
      .then(setPatient)
      .catch(() => setError("Could not load patient"));
  }, [id]);

  const submitEntry = async (entry: Omit<Entry, "id">) => {
    if (!id) return;

    try {
      const addedEntry = await patientService.addEntry(id, entry);
      setPatient((currentPatient) => {
        if (!currentPatient) return currentPatient;

        return {
          ...currentPatient,
          entries: [...currentPatient.entries, addedEntry],
        };
      });
      setShowForm(false);
      setError(undefined);
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError("Failed to add entry");
      }
    }
  };

  if (error && !patient) return <div style={{ color: "#d32f2f" }}>{error}</div>;
  if (!patient) return <div>Loading patient...</div>;

  return (
    <div style={{ fontFamily: "sans-serif", color: "#111", lineHeight: 1.5 }}>
      <h1 style={{ margin: "0 0 16px 0", fontSize: "42px", fontWeight: 700 }}>
        {patient.name} {patient.gender === "male" && "♂"} {patient.gender === "female" && "♀"} {patient.gender === "other" && "⚥"}
      </h1>

      <p style={{ margin: "0 0 8px 0", fontSize: "20px" }}>ssn: {patient.ssn}</p>
      <p style={{ margin: "0 0 8px 0", fontSize: "20px" }}>occupation: {patient.occupation}</p>
      <p style={{ margin: "0 0 20px 0", fontSize: "20px" }}>date of birth: {patient.dateOfBirth}</p>

      <div style={{ borderTop: "2px dashed #666", marginTop: "8px", paddingTop: "18px" }}>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "#1a73e8",
              padding: 0,
              fontSize: "17px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ADD NEW ENTRY
          </button>
        )}

        {showForm && <EntryForm onCancel={() => setShowForm(false)} onSubmit={submitEntry} diagnoses={diagnoses} />}
      </div>

      {error && !showForm && <div style={{ color: "#d32f2f", marginTop: "12px" }}>{error}</div>}

      <div style={{ marginTop: "24px" }}>
        <h2 style={{ margin: "0 0 12px 0", fontSize: "28px" }}>Entries</h2>
        {patient.entries.length === 0 ? (
          <p>No entries</p>
        ) : (
          patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))
        )}
      </div>
    </div>
  );
};

export default PatientPage;
