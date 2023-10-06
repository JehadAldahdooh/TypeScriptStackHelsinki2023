import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from '../services/patients';
import { Patient, EntryWithoutId, HealthCheckEntry } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Typography, Button, TextField } from '@mui/material';
import { Entry } from '../types';
import HealthCheckEntryComponent from "./EntryDetail/HealthCheckEntry";
import HospitalEntryComponent from "./EntryDetail/HospitalEntry";
import OccupationalHealthcareEntryComponent from "./EntryDetail/OccupationalHealthcareEntry";
import AddingEntryForm from "./EntryDetail/AddingEntryForm";

const PatientInfo = () => {
    const renderEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case 'HealthCheck':
                return <HealthCheckEntryComponent key={entry.id} entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntryComponent key={entry.id} entry={entry} />;
            case 'Hospital':
                return <HospitalEntryComponent key={entry.id} entry={entry} />;
            default:
                return patientService.assertNever(entry);
        }
    };

    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                if (!id) {
                    console.error("Patient ID is undefined");
                    return;
                }
                const fetchedPatient = await patientService.getPatientById(id);
                setPatient(fetchedPatient);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPatient();
    }, [id]);

    const handleAddEntry = async (entry: EntryWithoutId) => {
        if (!id) {
            console.error("ID is undefined");
            return;
        }
        try {
            const updatedPatient = await patientService.addEntry(id, entry);
            console.log("updatedPatient", updatedPatient)
            if (!patient) {
                console.error("Patient is undefined");
                return;
            }
            setPatient({
                ...patient,
                entries: patient.entries.concat(updatedPatient)
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    if (!patient) {
        return <p>Error...</p>;
    }

    return (
        <Box>
            <Box display="flex" alignItems="center" marginBottom={2}>
                <Typography variant="h2" component="h1" marginRight={2}>
                    {patient.name}
                </Typography>
                {patient.gender === "male" ? <MaleIcon fontSize="large" /> : <FemaleIcon fontSize="large" />}
            </Box>
            <Typography variant="body1">SSN: {patient.ssn}</Typography>
            <Typography variant="body1">Occupation: {patient.occupation}</Typography>


            {showForm ? (
                <AddingEntryForm onAdd={handleAddEntry} onCancel={handleCancel} />
            ) : (
                <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                    Add New Entry
                </Button>
            )}


            <Box marginTop={3}>
                <Typography variant="h4" component="h2">
                    Entries
                </Typography>
                {patient.entries.map((entry) => renderEntry({ entry }))}
            </Box>
        </Box>
    );
};

export default PatientInfo;

