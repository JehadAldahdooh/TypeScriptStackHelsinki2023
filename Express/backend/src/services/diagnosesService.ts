import data from "../data/diagnoses";
import { DiagnoseEntry } from "../types/types";

const getDiagnoseEntries = (): DiagnoseEntry[] => {
    return data;
};

export default {
    getDiagnoseEntries
};