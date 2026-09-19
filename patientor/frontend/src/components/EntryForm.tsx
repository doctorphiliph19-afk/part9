import { useState } from "react";

import { Entry, HealthCheckEntry, HealthCheckRating } from "../types";

interface EntryFormProps {
  onCancel: () => void;
  onSubmit: (entry: Omit<Entry, "id">) => Promise<void>;
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #9a9a9a",
  background: "transparent",
  color: "#111",
  fontSize: "18px",
  padding: "10px 12px",
  boxSizing: "border-box",
  borderRadius: "4px",
  marginTop: "6px",
  fontFamily: "inherit",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  background: "transparent",
  border: "2px solid #1a73e8",
  borderRadius: "4px",
  color: "#111",
  paddingRight: "36px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "18px",
  color: "#111",
  marginBottom: "12px",
  fontWeight: 500,
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  border: "1px solid #1f7ae0",
  borderRadius: "4px",
  fontSize: "17px",
  fontWeight: 600,
  cursor: "pointer",
  letterSpacing: "0.02em",
};

const parseDiagnosisCodes = (codes: string) =>
  codes
    .split(",")
    .map((code) => code.trim())
    .filter((code) => code.length > 0);

const EntryForm = ({ onCancel, onSubmit }: EntryFormProps) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      let newEntry: Omit<Entry, "id">;

      switch (entryType) {
        case "HealthCheck": {
          const rating = Number(healthCheckRating);

          if (!Number.isInteger(rating) || rating < 0 || rating > 3) {
            setError("Health Check Rating must be between 0 and 3");
            return;
          }

          newEntry = {
            type: "HealthCheck",
            date,
            description,
            specialist,
            healthCheckRating: rating as HealthCheckRating,
            diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          } as Omit<HealthCheckEntry, "id">;
          break;
        }

        case "OccupationalHealthcare": {
          if (!employerName.trim()) {
            setError("Employer name is required");
            return;
          }

          newEntry = {
            type: "OccupationalHealthcare",
            date,
            description,
            specialist,
            employerName,
            sickLeave: sickLeaveStart || sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
            diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          } as Omit<Entry, "id">;
          break;
        }

        case "Hospital": {
          newEntry = {
            type: "Hospital",
            date,
            description,
            specialist,
            discharge: dischargeDate || dischargeCriteria
              ? {
                  date: dischargeDate,
                  criteria: dischargeCriteria,
                }
              : undefined,
            diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          } as Omit<Entry, "id">;
          break;
        }

        default:
          return;
      }

      await onSubmit(newEntry);
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div
      style={{
        border: "2px dashed #666",
        borderRadius: "0",
        padding: "28px 20px 20px 20px",
        marginTop: "26px",
        background: "transparent",
      }}
    >
      <h2 style={{ margin: "0 0 20px 0", fontSize: "28px", fontWeight: 700 }}>New Entry</h2>

      {error && (
        <div
          style={{
            color: "#d32f2f",
            marginBottom: "16px",
            fontSize: "16px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        <label style={labelStyle}>
          Entry type
          <select
            value={entryType}
            onChange={({ target }) => setEntryType(target.value as EntryType)}
            style={selectStyle}
          >
            <option value="HealthCheck">Health Check</option>
            <option value="OccupationalHealthcare">Occupational Healthcare</option>
            <option value="Hospital">Hospital</option>
          </select>
        </label>

        <label style={labelStyle}>
          Date *
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Description *
          <input
            type="text"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Specialist *
          <input
            type="text"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            required
            style={inputStyle}
          />
        </label>

        {entryType === "HealthCheck" && (
          <label style={labelStyle}>
            Health Check Rating (0-3) *
            <input
              type="number"
              min="0"
              max="3"
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
              required
              style={inputStyle}
            />
          </label>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <label style={labelStyle}>
              Employer name *
              <input
                type="text"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
                required
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Sick leave start date
              <input
                type="date"
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Sick leave end date
              <input
                type="date"
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
                style={inputStyle}
              />
            </label>
          </>
        )}

        {entryType === "Hospital" && (
          <>
            <label style={labelStyle}>
              Discharge date
              <input
                type="date"
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Discharge criteria
              <input
                type="text"
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                style={inputStyle}
              />
            </label>
          </>
        )}

        <label style={labelStyle}>
          Diagnosis Codes (comma-separated)
          <input
            type="text"
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
            style={inputStyle}
          />
        </label>

        <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
          <button type="submit" style={{ ...buttonStyle, background: "#1a73e8", color: "#fff" }}>
            ADD
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              ...buttonStyle,
              background: "transparent",
              color: "#1a73e8",
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
