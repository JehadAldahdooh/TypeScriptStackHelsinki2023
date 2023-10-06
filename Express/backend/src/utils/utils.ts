import { NewDiaryEntry, Gender, NewPatient } from '../types/types';
import { SickLeave, HealthCheckRating, DiagnoseEntry, BaseEntryWithoutId, EntryWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types/types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }

    return comment;
};

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
};

const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}
const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: NewDiaryEntry = {
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            date: parseDate(object.date),
            comment: parseComment(object.comment)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Name is missing or invalid");
    }

    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Date Of Birth is missing or invalid');
    }

    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Social Security Number is missing or invalid');
    }

    return ssn;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Gender is missing or invalid: ${gender}`);
    }
    return gender;
}

const parseOccupation = (occ: unknown): string => {
    if (!isString(occ)) {
        throw new Error('Occupation is missing or invalid');
    }

    return occ;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [],
        };
        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const parseDiagnosisCodes = (obj: unknown): Array<DiagnoseEntry['code']> => {
    if (!obj || typeof obj !== 'object' || !('diagnosisCodes' in obj)) {
        return [] as Array<DiagnoseEntry['code']>;
    }
    return obj.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

interface EntryTypeMap {
    HealthCheck: HealthCheckEntry;
    Hospital: HospitalEntry;
    OccupationalHealthcare: OccupationalHealthcareEntry;
}

type EntryType = keyof EntryTypeMap;

const isEntryType = (param: any): param is EntryType => {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param);
};


const parseString = (text: unknown, name: string): string => {
    if (!isString(text)) {
        throw new Error(`Incorrect or missing ${name}: ${text}`);
    }
    return text;
};

export const toNewBaseEntry = (object: any): BaseEntryWithoutId => {
    if (!object || typeof object !== 'object') throw new Error("Incorrect or missing entry object");

    return {
        description: parseString(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(object),
    };
};

const isHealthCheckEntry = (object: any): object is HealthCheckEntry => {
    return object.type === 'HealthCheck' &&
        isHealthCheckRating(object.healthCheckRating);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

export const isHospitalEntry = (object: any): object is HospitalEntry => {
    return (
        object.type === 'Hospital' &&
        object.discharge &&
        typeof object.discharge.date === 'string' &&
        typeof object.discharge.criteria === 'string'
    );
};

export const isOccupationalHealthcareEntry = (object: any): object is OccupationalHealthcareEntry => {
    return object &&
        object.type === 'OccupationalHealthcare' &&
        typeof object.employerName === 'string' &&
        (!object.sickLeave || (
            typeof object.sickLeave === 'object' &&
            typeof object.sickLeave.startDate === 'string' &&
            typeof object.sickLeave.endDate === 'string'
        ));
};

const parseSickLeave = (sickLeave: any): SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        throw new Error('Incorrect or missing sick leave: not an object');
    }

    const startDate = parseDate(sickLeave.startDate);
    const endDate = parseDate(sickLeave.endDate);

    return { startDate, endDate };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object' || !('type' in object) || !isEntryType(object.type)) {
        throw new Error('Incorrect or missing entry');
    }

    const baseEntry = toNewBaseEntry(object);

    switch (object.type) {
        case 'HealthCheck':
            if (!isHealthCheckEntry(object)) {
                throw new Error('Invalid HealthCheck entry');
            }
            return {
                ...baseEntry,
                type: 'HealthCheck',
                healthCheckRating: object.healthCheckRating,
            };

        case 'Hospital':
            if (!isHospitalEntry(object)) {
                throw new Error('Invalid Hospital entry');
            }
            return {
                ...baseEntry,
                type: 'Hospital',
                discharge: object.discharge
            };

        case 'OccupationalHealthcare':
            if (!isOccupationalHealthcareEntry(object)) {
                throw new Error('Incorrect or missing entry: OccupationalHealthcare');
            }
            const employerName = parseString(object.employerName, 'employerName');
            const sickLeave = parseSickLeave(object.sickLeave);

            return {
                ...baseEntry,
                type: 'OccupationalHealthcare',
                employerName,
                sickLeave,
            };

        default:
            throw new Error(`Unknown entry type: ${object.type}`);
    }

};
