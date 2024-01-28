import car from "../../assets/sport-car.png";

export interface Parkmeter {
  id: number;
  status: "Available" | "Disabled" | "Reserved";
  connection: boolean;
}

export interface Vehicle {
  id: number;
  imageUrl: string;
  connection: boolean;
}

export const parkmeterDatafile: Parkmeter[] = [
  { id: 1, status: "Reserved", connection: true },
  { id: 2, status: "Available", connection: false },
  { id: 3, status: "Disabled", connection: false },
  { id: 4, status: "Available", connection: false },
  { id: 5, status: "Disabled", connection: false },
];

export const vehicleData: Vehicle[] = [
  { id: 1, imageUrl: car, connection: false },
  //{ id: 2, imageUrl: blackCar, connection: false },
];
