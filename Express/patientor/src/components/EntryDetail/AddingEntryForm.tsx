import React, { useState } from 'react';
import { Button, TextField, Box, Typography, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
    onAdd: (newEntry: EntryWithoutId) => void;
    onCancel: () => void;
}

const AddingEntryForm: React.FC<Props> = ({ onAdd, onCancel }) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | "">('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
    const [type, setType] = useState<string>('OccupationalHealthcare');
    const [specialist, setSpecialist] = useState<string>('');
    const [dischargeDate, setDischargeDate] = useState<string>('')
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('')
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('')
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('')
    const [employerName, setEmployerName] = useState<string>('')

    const typeOptions: string[] = ["OccupationalHealthcare", "Hospital", "HealthCheck"];

    const ontypeChange = (event: SelectChangeEvent<string>) => {
        setType(event.target.value as string);
    };

    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = () => {
        setFormError(null); // Clear any previous errors

        if (!description || !date || !specialist) {
            setFormError("Description, Date, and Specialist fields cannot be empty");
            return;
        }
        const parsedDiagnosisCodes = diagnosisCodes.split(',').map(code => code.trim());
        let newEntry: EntryWithoutId;

        switch (type) {
            case 'HealthCheck':
                if (healthCheckRating === '') {
                    setFormError("Health Check Rating is required for HealthCheck entries.");
                    return;
                }

                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
                    diagnosisCodes: parsedDiagnosisCodes
                };
                break;
            case 'Hospital':
                if (!dischargeDate || !dischargeCriteria) {
                    setFormError("Discharge date and criteria are required for Hospital entries.");
                    return;
                }

                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: parsedDiagnosisCodes,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                };
                break;
            case 'OccupationalHealthcare':
                if (!employerName) {
                    setFormError("Employer Name is required for OccupationalHealthcare entries.");
                    return;
                }

                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: parsedDiagnosisCodes,
                    employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }
                }
                break;
            default:
                console.error(`Unsupported entry type: ${type}`);
                return;
        }

        onAdd(newEntry);
    };



    return (
        <Box p={3} boxShadow={2} bgcolor="background.paper">
            <Typography variant="h5" mb={2}>Add New Entry</Typography>

            {formError && (
                <Typography variant="body2" color="error" mb={2}>
                    {formError}
                </Typography>
            )}

            <InputLabel id="type-label">Type</InputLabel>
            <Select
                labelId="type-label"
                label="Type"
                value={type}
                onChange={ontypeChange}
                fullWidth
            >
                {typeOptions.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>

            <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <TextField
                fullWidth
                label="Specialist"
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
            />
            <TextField
                fullWidth
                label="Diagnosis Codes (comma separated)"
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value)}
            />

            {type === "HealthCheck" && (
                <>
                    <TextField
                        fullWidth
                        label="Health Checking Rate"
                        type="number"
                        value={healthCheckRating}
                        onChange={(e) => setHealthCheckRating(e.target.value as HealthCheckRating | "")}
                    />
                </>
            )}
            {type === "Hospital" && (
                <>
                    <TextField
                        fullWidth
                        label="Discharge Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={dischargeDate}
                        onChange={(e) => setDischargeDate(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Discharge Criteria"
                        value={dischargeCriteria}
                        onChange={(e) => setDischargeCriteria(e.target.value)}
                    />
                </>
            )}
            {type === "OccupationalHealthcare" && (
                <>
                    <TextField
                        fullWidth
                        label="Employer Name"
                        value={employerName}
                        onChange={(e) => setEmployerName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Sick Leave Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={sickLeaveStartDate}
                        onChange={(e) => setSickLeaveStartDate(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Sick Leave End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={sickLeaveEndDate}
                        onChange={(e) => setSickLeaveEndDate(e.target.value)}
                    />
                </>
            )}

            <Button onClick={handleSubmit} color="primary" variant="contained">
                Add Entry
            </Button>
            <Button onClick={onCancel} color="secondary" variant="outlined">
                Cancel
            </Button>
        </Box>
    );
};

export default AddingEntryForm;