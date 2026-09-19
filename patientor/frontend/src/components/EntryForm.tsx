import { useState } from "react";

import { HealthCheckEntry, HealthCheckRating } from "../types";

interface EntryFormProps {
  onCancel: () => void;
  onSubmit: (entry: Omit<HealthCheckEntry, "id">) => Promise<void>;
}

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

const EntryForm = ({ onCancel, onSubmit }: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const rating = Number(healthCheckRating);

    if (!Number.isInteger(rating) || rating < 0 || rating > 3) {
      setError("Health Check Rating must be between 0 and 3");
      return;
    }

    try {
      const newEntry: Omit<HealthCheckEntry, "id"> = {
        type: "HealthCheck",
        date,
        description,
        specialist,
        healthCheckRating: rating as HealthCheckRating,
        diagnosisCodes: diagnosisCodes
          .split(",")
          .map((code) => code.trim())
          .filter((code) => code.length > 0),
      };

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
      <h2 style={{ margin: "0 0 20px 0", fontSize: "28px", fontWeight: 700 }}>New HealthCheck Entry</h2>

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
