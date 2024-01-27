import React, { useState, useEffect, useRef } from "react";
import "./parking-simulation.scss";
import CloudIcon from "@mui/icons-material/Cloud";
import car from "../../assets/sport-car.png";
import trees from '../../assets/forest.png';
import {
  parkmeterDatafile,
  Parkmeter,
  Vehicle,
  vehicleData,
} from "./parkingData";
import parkmeterImage from "../../assets/parking-meter (4).png";
import disabledParkMeterImage from "../../assets/parking-meter (3).png";
import noSignalImage from "../../assets/no-signal.png";
// import moon from "../../moon.png";
// import star from "../../stars.png";
import blackCar from "../../assets/blackCar.png";

const ParkingSimulationComponent: React.FC = () => {
  const [selectedPark, setSelectedPark] = useState<number | null>(null);
  const [parkmeterData, setParkmeterData] = useState(parkmeterDatafile);
  const [startedTimers, setStartedTimers] = useState<number[]>([]);
  const [parts, setParts] = useState<string[]>(["00", "00", "00"]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [leaveButtonClicked, setLeaveButtonClicked] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [isVehicleSelected, setIsVehicleSelected] = useState(false);

  const handleActiveParkmeter = (ele: Parkmeter) => {
    if (selectedVehicle === 0) {
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
    setSelectedVehicle((prev) => (prev === ele.id ? 0 : ele.id));
    setIsVehicleSelected(true);
  };

  const updateParkStatus = (parkId: number) => {
    setParkmeterData((prevParkmeterData: any) => {
      return prevParkmeterData.map((park: any) =>
        park.id === parkId ? { ...park, status: "Reserved",connection: true} : park
      );
    });
  
    setStartedTimers((prevStartedTimers) => [...prevStartedTimers, parkId]);
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
      const meterBounds = meter.getBoundingClientRect();

      const horizontalDistance = 1300 + vehicleBounds.right;
      const verticalDistance = vehicleBounds.bottom;

      // logic is in progress...

      vehicle.style.transform = `translate(${horizontalDistance + 1800}px, ${
        -100 + verticalDistance
      }px) `;
    }
    // Calculate the elapsed time
    const now = new Date();
    const elapsedTime = now.getTime() - startDate.getTime();

    // Convert milliseconds to seconds, minutes, and hours
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // Log the elapsed time
    console.log(
      `Elapsed time: ${hours} hours, ${minutes % 60} minutes, ${
        seconds % 60
      } seconds`
    );
  };

  const one_second = 1000;
  const one_minute = one_second * 60;
  const one_hour = one_minute * 60;

  const [startDate, setStartDate] = useState(new Date());
  const faceRef = useRef<HTMLParagraphElement | null>(null);

  const requestAnimationFrameRef = useRef<number | null>(null);

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
    console.log(selectedPark, "selectedpark");
    console.log(
      selectedPark && parkmeterData[selectedPark - 1].status,
      "status"
    );
    console.log(
      selectedPark && parkmeterData[selectedPark - 1].connection,
      "connection"
    );

    const selectedParkData = parkmeterData.find(
      (park: any) => park.id === selectedPark
    );

    if (timerStarted && selectedPark && startedTimers.includes(selectedPark)) {
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
  }, [
    parkmeterData,
    selectedPark,
    startedTimers,
    timerStarted,
    initialRender,
    leaveButtonClicked,
  ]);

  return (
    <div className="body">
      <div className="sky">
        <CloudIcon className="cloud-icon" />
        <CloudIcon className="cloud-icon" />
        <img src={trees} alt="trees" className="tree1"/>
        <img src={trees} alt="trees" className="tree2"/>
        <img src={trees} alt="trees" className="tree3"/>
        <img src={trees} alt="trees" className="tree4"/>
        <img src={trees} alt="trees" className="tree5"/>
      </div>
      <div className="grass"></div>
      <div className="parkmeter">
        {parkmeterData.map((meter: any) => (
          <button
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
        parkmeterData[selectedPark - 1].status === "Reserved" && (
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
