import data from '../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { Entry, Patient, NonSensitivePatientData, NewPatient, EntryWithoutId } from '../types/types';

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    })) as NonSensitivePatientData[];
};

const getPatients = (): Patient[] => {
    return data;
};

const getPatientById = (id: string): Patient | undefined => {
    return data.find(patient => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient: Patient = {
        id: uuidv4(),
        ...newPatient,
    };
    data.push(patient);
    return patient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
    const newEntry = {
      id: uuidv4(),
      ...entry
    };
    patient.entries.push(newEntry);

    return newEntry;
};  
export default {
    getNonSensitiveEntries,
    getPatients,
    addPatient,
    getPatientById,
    addEntry
}; 
