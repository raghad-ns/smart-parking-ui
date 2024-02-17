import car from "../../assets/sport-car.png";

export interface Parkmeter {
  id: string;
  status: "available" | "disabled" | "reserved";
  connection: boolean;
  customid?: string;
}

export interface Vehicle {
  id: string;
  imageUrl: string;
  connection: boolean;
}

export const parkmeterDatafile: Parkmeter[] = [
  { id: "1", status: "reserved", connection: true },
  { id: "2", status: "available", connection: false },
  { id: "3", status: "disabled", connection: false },
  { id: "PU-345", status: "available", connection: false },
  { id: "5", status: "disabled", connection: false },
];

export const vehicleData: Vehicle[] = [
  { id: "1", imageUrl: car, connection: false },
  //{ id: 2, imageUrl: blackCar, connection: false },
];
