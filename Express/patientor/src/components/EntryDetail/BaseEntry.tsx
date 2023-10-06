import React, { useState, useEffect } from 'react';
import { BaseEntry, Diagnosis } from '../../types';
import patientService from '../../services/patients';

export interface BaseEntryComponentProps {
  entry: BaseEntry;
  showDate?: boolean;
}

const BaseEntryComponent: React.FC<BaseEntryComponentProps> = ({ entry, showDate = true }) => {
  const [allDiagnoses, setAllDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const fetchedDiagnoses = await patientService.getDiagnoses();
        setAllDiagnoses(fetchedDiagnoses);
      } catch (e) {
        // console.error(e);
        setError("An error occurred");
      }
    };
    fetchDiagnoses();
  }, []);


  const diagnosisMap: { [code: string]: Diagnosis } = {};
  allDiagnoses.forEach(diagnosis => {
    diagnosisMap[diagnosis.code] = diagnosis;
  });

  return (
    <div>
      {showDate && <p>{entry.date}</p>}
      <p>{entry.description}</p>
      <div>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <ul>
            {
              entry.diagnosisCodes?.map(code => (
                <li key={code}>
                  {`${code} ${diagnosisMap[code]?.name || ''}`}
                </li>
              ))
            }
          </ul>
        )}
      </div>
      <p>diagonsed by {entry.specialist}</p>
    </div>
  );
};

export default BaseEntryComponent;
