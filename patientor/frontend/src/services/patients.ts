import axios from "axios";
import { Entry, EntryFormValues, NonSensitivePatient, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<NonSensitivePatient[]> => {
  const { data } = await axios.get<NonSensitivePatient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createEntry = async (id: string, entry: EntryFormValues) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  return data;
};

export default {
  getAll, create, getOne, createEntry
};

