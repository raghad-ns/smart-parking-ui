// ParkingData.ts
export interface Parkmeter {
  id: number;
  status: 'Available' | 'Disabled'|'Deserved';
  connection: boolean;
}

const parkmeterDatafile: Parkmeter[] = [
  { id: 1, status: 'Available', connection: false },
  { id: 2, status: 'Deserved', connection: false },
  { id: 3, status: 'Disabled', connection: false },
  { id: 4, status: 'Available', connection: false },
  { id: 5, status: 'Disabled', connection: false },
];

export default parkmeterDatafile;
