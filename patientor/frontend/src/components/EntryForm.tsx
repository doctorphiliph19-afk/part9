import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import type { SelectChangeEvent } from "@mui/material/Select";

import { Diagnosis, Entry, HealthCheckEntry, HealthCheckRating } from "../types";

interface EntryFormProps {
  onCancel: () => void;
  onSubmit: (entry: Omit<Entry, "id">) => Promise<void>;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const ratingOptions = [
  { value: 0, label: "0 — Healthy" },
  { value: 1, label: "1 — Low Risk" },
  { value: 2, label: "2 — High Risk" },
  { value: 3, label: "3 — Critical Risk" },
];

const EntryForm = ({ onCancel, onSubmit, diagnoses }: EntryFormProps) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number | "">("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      let newEntry: Omit<Entry, "id">;

      switch (entryType) {
        case "HealthCheck": {
          if (typeof healthCheckRating !== "number" || !Number.isInteger(healthCheckRating) || healthCheckRating < 0 || healthCheckRating > 3) {
            setError("Health Check Rating must be between 0 and 3");
            return;
          }

          newEntry = {
            type: "HealthCheck",
            date,
            description,
            specialist,
            healthCheckRating: healthCheckRating as HealthCheckRating,
            diagnosisCodes: selectedDiagnosisCodes,
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
            diagnosisCodes: selectedDiagnosisCodes,
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
            diagnosisCodes: selectedDiagnosisCodes,
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

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedDiagnosisCodes(value);
  };

  return (
    <Stack
      component="form"
      onSubmit={submit}
      spacing={2}
      sx={{
        border: "2px dashed #666",
        p: 3,
        mt: 3,
      }}
    >
      <Typography variant="h4">New Entry</Typography>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <FormControl fullWidth>
        <InputLabel id="entry-type-label">Entry type</InputLabel>
        <Select
          labelId="entry-type-label"
          id="entry-type"
          value={entryType}
          label="Entry type"
          onChange={(event) => setEntryType(event.target.value as EntryType)}
          sx={{
            border: "1px solid #7a7a7a",
            borderRadius: 0,
            backgroundColor: "#f5f5f5",
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-select': { py: 1.8 },
            '&.Mui-focused': { borderColor: '#1a73e8' },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                border: "2px solid #666",
                borderRadius: 0,
                boxShadow: "none",
                mt: 0.5,
              },
            },
          }}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        required
      />

      <TextField
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        required
      />

      {entryType === "HealthCheck" && (
        <FormControl fullWidth>
          <InputLabel id="health-rating-label">Health Check Rating</InputLabel>
          <Select
            labelId="health-rating-label"
            id="health-rating"
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={(event) => setHealthCheckRating(event.target.value as number | "")}
            sx={{
              border: "1px solid #7a7a7a",
              borderRadius: 0,
              backgroundColor: "#f7f7f7",
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': { py: 1.8 },
              '&.Mui-focused': { borderColor: '#1a73e8' },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  border: "2px solid #666",
                  borderRadius: 0,
                  boxShadow: "none",
                  mt: 0.5,
                },
              },
            }}
          >
            {ratingOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  fontSize: "1.1rem",
                  py: 1.5,
                  backgroundColor: healthCheckRating === option.value ? "#dfeaf8" : "transparent",
                  '&.Mui-selected': {
                    backgroundColor: '#dfeaf8',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#dfeaf8',
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer name"
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            required
          />

          <TextField
            label="Sick leave start date"
            type="date"
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Sick leave end date"
            type="date"
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      {entryType === "Hospital" && (
        <>
          <TextField
            label="Discharge date"
            type="date"
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Discharge criteria"
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      )}

      <FormControl fullWidth>
        <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosis-codes"
          multiple
          value={selectedDiagnosisCodes}
          onChange={handleDiagnosisChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          sx={{
            border: "1px solid #7a7a7a",
            borderRadius: 0,
            backgroundColor: "#f7f7f7",
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-select': { py: 1.8 },
            '&.Mui-focused': { borderColor: '#1a73e8' },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                border: "2px solid #666",
                borderRadius: 0,
                boxShadow: "none",
                mt: 0.5,
              },
            },
          }}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
              sx={{
                fontSize: "1.1rem",
                py: 1.4,
                backgroundColor: selectedDiagnosisCodes.includes(diagnosis.code) ? "#dfeaf8" : "transparent",
                '&.Mui-selected': {
                  backgroundColor: '#dfeaf8',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#dfeaf8',
                },
              }}
            >
              {diagnosis.code} — {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained">
          ADD
        </Button>
        <Button type="button" variant="outlined" onClick={onCancel}>
          CANCEL
        </Button>
      </Stack>
    </Stack>
  );
};

export default EntryForm;
