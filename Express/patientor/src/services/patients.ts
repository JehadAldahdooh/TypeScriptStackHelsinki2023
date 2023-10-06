import axios from "axios";
import { Patient, PatientFormValues, Diagnosis, EntryWithoutId } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export const addEntry = async (patientId: string, newEntry: EntryWithoutId) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};


const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );
  return response.data;
};

function assertNever(entry: never): React.ReactElement<any, any> | null {
  throw new Error("Function not implemented.");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatientById, getDiagnoses, assertNever, addEntry
};

