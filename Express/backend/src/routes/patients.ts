import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    if (!patient) {
      res.sendStatus(404).send('Patient not found');
      return;
    }

    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send('Server Error');
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;