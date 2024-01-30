import React, { useState, useEffect, useRef } from "react";
import "./parking-simulation.scss";
import CloudIcon from "@mui/icons-material/Cloud";
import car from "../../assets/sport-car.png";
import trees from "../../assets/forest.png";
import {
  parkmeterDatafile,
  Parkmeter,
  Vehicle,
  vehicleData,
} from "./parkingData";
import parkmeterImage from "../../assets/parking-meter (4).png";
import disabledParkMeterImage from "../../assets/parking-meter (3).png";
import noSignalImage from "../../assets/no-signal.png";
import blackCar from "../../assets/blackCar.png";
import { historyData } from "../../Pages/History-table/Data-table";
import { useNavigate } from "react-router-dom";
type HistoryDataRow = {
  No: number;
  "car-id": string;
  "park-id": string;
  Time: string;
  duration: string;
  cost: string;
};
const ParkingSimulationComponent: React.FC = () => {
  const [data, setData] = useState<HistoryDataRow[]>(historyData);
  const [selectedPark, setSelectedPark] = useState<string>("");
  const [parkmeterData, setParkmeterData] = useState(parkmeterDatafile);
  const [startedTimers, setStartedTimers] = useState<number[]>([]);
  const [parts, setParts] = useState<string[]>(["00", "00", "00"]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [leaveButtonClicked, setLeaveButtonClicked] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [isVehicleSelected, setIsVehicleSelected] = useState(false);
  const [durationParts, setDurationParts] = useState<string[]>([
    "00",
    "00",
    "00",
  ]);

  const navigate = useNavigate();

  const handleActiveParkmeter = (ele: Parkmeter) => {
    if (selectedVehicle === "") {
      alert("You must select a car first!");
    } else if (ele.status === "Available") {
      setIsVehicleSelected(false);
      // connect car to park meter

      const vehicle = document.getElementById(`vehicle-${selectedVehicle}`);
      const meter = document.getElementById(`parkmeter-${ele.id}`);

      if (meter !== null && vehicle !== null) {
        const vehicleBounds = vehicle.getBoundingClientRect();
        const meterBounds = meter.getBoundingClientRect();

        const horizontalDistance = meterBounds.left - vehicleBounds.right;
        const verticalDistance = meterBounds.top - vehicleBounds.bottom;

        // logic is in progress...
        if (horizontalDistance < 0) {
          vehicle.style.transform = "";
        } else {
          vehicle.style.transform = `translate(${horizontalDistance + 65}px, ${
            verticalDistance + 150
          }px) `;
        }
      }
    }

    setSelectedPark(ele.id);
    // After 7 seconds, change the park status and show wifi symbol
    setTimeout(() => {
      updateParkStatus(ele.id);
      setStartDate(new Date());
    }, 7000);
  };

  const handleBlueCar = (ele: Vehicle) => {
    setSelectedVehicle((prev) => (prev === ele.id ? "" : ele.id));
    setIsVehicleSelected(true);
  };

  const updateParkStatus = (parkId: string) => {
    setParkmeterData((prevParkmeterData: any) => {
      return prevParkmeterData.map((park: any) =>
        park.id === parkId
          ? { ...park, status: "Reserved", connection: true }
          : park
      );
    });

    setStartedTimers((prevStartedTimers) => [
      ...prevStartedTimers,
      parseInt(parkId, 10),
    ]);
    setTimerStarted(true);
  };

  const handleLeaveButtonClick = () => {
    console.log(leaveButtonClicked, "leave");
    // Set the leaveButtonClicked state to true
    setLeaveButtonClicked(true);

    const vehicle = document.getElementById(`vehicle-${selectedVehicle}`);
    const meter = document.getElementById(`parkmeter-${selectedPark}`);

    if (meter !== null && vehicle !== null) {
      const vehicleBounds = vehicle.getBoundingClientRect();
      const horizontalDistance = 1300 + vehicleBounds.right;
      const verticalDistance = vehicleBounds.bottom;

      vehicle.style.transform = `translate(${horizontalDistance + 1800}px, ${
        -100 + verticalDistance
      }px) `;
    }

    const now = new Date();
    const elapsedTime = now.getTime() - startDate.getTime();

    // Convert milliseconds to seconds
    const seconds = Math.floor(elapsedTime / 1000);

    // Calculate duration in hours, minutes, and seconds
    const durationHours = Math.floor(seconds / 3600);
    const durationMinutes = Math.floor((seconds % 3600) / 60);
    const durationSeconds = seconds % 60;

    // Format duration parts with leading zeros
    const formattedHours = durationHours.toString().padStart(2, "0");
    const formattedMinutes = durationMinutes.toString().padStart(2, "0");
    const formattedSeconds = durationSeconds.toString().padStart(2, "0");

    // Set the duration parts state
    setDurationParts([formattedHours, formattedMinutes, formattedSeconds]);

    // Calculate cost
    const cost = durationHours * 5; // $5 per half hour

    // Add a new row to history data
    const newHistoryRow: HistoryDataRow = {
      No: data.length + 1,
      "car-id": selectedVehicle,
      "park-id": selectedPark,
      Time: `${startDate.toLocaleTimeString()} - ${now.toLocaleTimeString()}`,
      duration: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
      cost: `$${cost}`,
    };
    console.log(newHistoryRow, "row");

    setData((prevData: HistoryDataRow[]) => [...prevData, newHistoryRow]);

    setTimeout(() => {
      // Navigate to the history table
      navigate("/history"); // Update the route path accordingly
    }, 3000);
  };

  const one_second = 1000;
  const one_minute = one_second * 60;
  const one_hour = one_minute * 60;

  const [startDate, setStartDate] = useState(new Date());
  const faceRef = useRef<HTMLParagraphElement | null>(null);

  const requestAnimationFrameRef = useRef<number | null>(null);

  // Find the park data with the matching ID
  const selectedParkData = parkmeterData.find(
    (park: any) => park.id === selectedPark
  );

  const tick = () => {
    const now = new Date();
    const elapsed = now.getTime() - startDate.getTime();
    const newParts = [
      "" + Math.floor(elapsed / one_hour),
      "" + Math.floor((elapsed % one_hour) / one_minute),
      "" + Math.floor(((elapsed % one_hour) % one_minute) / one_second),
    ];

    setParts(newParts);

    if (faceRef.current) {
      faceRef.current.innerText = newParts.join(":");
    }

    requestAnimationFrameRef.current = requestAnimationFrame(tick);
  };
  useEffect(() => {
    // Check if it's the initial render
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    if (
      timerStarted &&
      selectedPark &&
      startedTimers.includes(parseInt(selectedPark, 10))
    ) {
      tick();
    }

    // Check if the Leave button is clicked
    if (leaveButtonClicked && selectedPark) {
      // Update park status to "Available"
      setParkmeterData((prevParkmeterData: any) => {
        return prevParkmeterData.map((park: any) =>
          park.id === selectedPark ? { ...park, status: "Available" } : park
        );
      });

      // Stop the clock timer
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }

      // Reset leaveButtonClicked state
      setLeaveButtonClicked(false);
    }

    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
    // eslint-disable-next-line
  }, [
    parkmeterData,
    selectedPark,
    startedTimers,
    timerStarted,
    initialRender,
    leaveButtonClicked,
  ]);

  return (
    <div className="body-simulation">
      <div className="sky">
        <CloudIcon className="cloud-icon" />
        <CloudIcon className="cloud-icon" />
        <img src={trees} alt="trees" className="tree1" />
        <img src={trees} alt="trees" className="tree2" />
        <img src={trees} alt="trees" className="tree3" />
        <img src={trees} alt="trees" className="tree4" />
        <img src={trees} alt="trees" className="tree5" />
      </div>
      <div className="grass"></div>
      <div className="parkmeter">
        {parkmeterData.map((meter: any) => (
          <button
            className="button-simulation"
            key={meter.id}
            onClick={() => handleActiveParkmeter(meter)}
            id={`parkmeter-${meter.id}`}
            disabled={
              meter.status === "Disabled" || meter.status === "Reserved"
            }
          >
            <div className="parkmeter-Info">
              {meter.status === "Available" && (
                <div className="avilableParkMeter">
                  <img src={parkmeterImage} alt={`parkMeter-${meter.id}`} />
                </div>
              )}
              {meter.status === "Reserved" && (
                <div className="ReservedParkMeter">
                  <img src={parkmeterImage} alt={`parkMeter-${meter.id}`} />

                  <div className="wifi-symbol">
                    <div className="wifi-circle first"></div>
                    <div className="wifi-circle second"></div>
                    <div className="wifi-circle third"></div>
                    <div className="wifi-circle fourth"></div>
                  </div>

                  {selectedPark !== meter.id && (
                    <div className="blackCar">
                      <img src={blackCar} alt="blackCar" />
                    </div>
                  )}
                </div>
              )}

              {meter.status === "Disabled" && (
                <div className="disabledParkMeter">
                  <img
                    src={disabledParkMeterImage}
                    alt={`parkMeter-${meter.id}`}
                  />
                  <img
                    className="no-signal-icon"
                    src={noSignalImage}
                    alt="noSignal"
                  />
                </div>
              )}

              <div className="parkInfo">
                <div>{`ID: ${meter.id}`}</div>
                <div>{`${meter.status}`}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {selectedPark !== null &&
        parkmeterData.find((park) => park.id === selectedPark)?.status ===
          "Reserved" && (
          <div className="clock-leave">
            <div className="timer-group">
              <div className="timer hour">
                <div className="hand">
                  <span>{parts[0]}</span>
                </div>
                <div className="hand">
                  <span>{parts[0]}</span>
                </div>
              </div>
              <div className="timer minute">
                <div className="hand">
                  <span>{parts[1]}</span>
                </div>
                <div className="hand">
                  <span>{parts[1]}</span>
                </div>
              </div>
              <div className="timer second">
                <div className="hand">
                  <span>{parts[2]}</span>
                </div>
                <div className="hand">
                  <span>{parts[2]}</span>
                </div>
              </div>
              <div className="face">
                <span>Parking Timer</span>
                <p id="lazy">{parts.join(":")}</p>
              </div>
            </div>
            <button onClick={handleLeaveButtonClick} className="button-84">
              Leave 🧭
            </button>
          </div>
        )}
      <div className="road">
        <div className="lines"></div>
        {vehicleData.map((ele) => (
          <div
            className="vehicle"
            key={ele.id}
            id={`vehicle-${ele.id}`}
            onClick={() => handleBlueCar(ele)}
          >
            {selectedVehicle === ele.id && isVehicleSelected && (
              <div className="vehicle-is-selected">Selected!</div>
            )}
            <img
              src={car}
              alt=""
              className={`vehicle-image car ${
                selectedVehicle === ele.id ? "vehicle-is-active" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingSimulationComponent;
