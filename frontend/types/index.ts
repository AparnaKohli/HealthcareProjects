export type DoseUnit = 'tsp' | 'mg' | 'ml' | 'tablets';

export type Frequency = 'once' | 'twice' | 'thrice' | 'four' | 'as_needed';

export interface Medication {
  id: string;
  name: string;
  doseValue: number;
  doseUnit: DoseUnit;
  frequency: Frequency;
  days: number;
  startTime: string; // HH:mm
  schedule: { time: string; label: string }[];
  isTaken?: boolean; // Optional: whether it was taken today
}

export interface Member {
  id: string;
  name: string;
  medications: Medication[];
}
