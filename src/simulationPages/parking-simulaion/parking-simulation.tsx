import React, { useState, useEffect, useRef } from "react";
import "./parking-simulation.scss";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import CloudIcon from "@mui/icons-material/Cloud";
import Parkmeter from "./parkingData";
import car from "../../sport-car.png";
import parkmeterDatafile from "./parkingData";
import parkmeterImage from "../../parking-meter (4).png";
import disabledParkMeterImage from "../../parking-meter (3).png";
import noSignalImage from "../../no-signal.png";
import moon from "../../moon.png";
import moon2 from "../../cloudy-night.png";
import star from "../../stars.png";
import blackCar from "../../blackCar.png";
import { log } from "console";
import { WidthFull } from "@mui/icons-material";


const ParkingSimulationComponent: React.FC = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [selectedPark, setSelectedPark] = useState<number | null>(null);
  const [parkmeterData, setParkmeterData] = useState(parkmeterDatafile);
  const [startedTimers, setStartedTimers] = useState<number[]>([]);
  const [parts, setParts] = useState<string[]>(["00", "00", "00"]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [initialRender, setInitialRender] = useState(true);


  const handleStopClick = () => {
    setIsMoving(false);
    console.log("move1", isMoving);
  };

  const updateParkStatus = (parkId: number) => {
    setParkmeterData((prevParkmeterData) => {
      return prevParkmeterData.map((park) =>
        park.id === parkId ? { ...park, status: "Deserved" } : park
      );
    });
    setStartedTimers((prevStartedTimers) => [...prevStartedTimers, parkId]);
    setTimerStarted(true);
  };

  const handleParkSelect = (parkId: number) => {
    console.log(parkId);
    setIsMoving(true);
    setSelectedPark(parkId);

    // After 5 seconds, change the park status and show wifi symbol
    setTimeout(() => {
      updateParkStatus(parkId);
      setStartDate(new Date())
    }, 5000);
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

    const selectedParkData = parkmeterData.find((park) => park.id === selectedPark);

    if (timerStarted && selectedPark && startedTimers.includes(selectedPark)) {
      tick();
    }

    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [parkmeterData, selectedPark, startedTimers, timerStarted, initialRender]);

  // useEffect(() => {
  //   const selectedParkData = parkmeterData.find(
  //     (park) => park.id === selectedPark
  //   );

  //   if (timerStarted && selectedPark && startedTimers.includes(selectedPark)) {
  //     console.log("start tick");

  //     tick();
  //   }

  //   return () => {
  //     if (requestAnimationFrameRef.current) {
  //       cancelAnimationFrame(requestAnimationFrameRef.current);
  //     }
  //   };
  // }, [parkmeterData, selectedPark, startedTimers, timerStarted]);

  return (
    <div className="body">
      <div className="sky">
        {/* <CloudIcon className="cloud-icon" /> */}
        {/* <CloudIcon className="cloud-icon" /> */}
        <img className="moon" src={moon} alt="moon" />
        <img className="star1" src={star} alt="moon" />
        <img className="star" src={star} alt="moon" />
        {/* <img className="star2" src={star} alt="moon" /> */}
        <img className="star3" src={star} alt="moon" />
        {/* <img src={moon2} alt='moon'/> */}
      </div>
      <div className="grass"></div>
      <div className="parkmeter">
        {parkmeterData.map((meter) => (
          <button
            key={meter.id}
            onClick={() => handleParkSelect(meter.id)}
            disabled={
              meter.status === "Disabled" || meter.status === "Deserved"
            }
          >
            <div className="parkmeter-Info">
              {meter.status === "Available" && (
                <div className="avilableParkMeter">
                  <img src={parkmeterImage} alt={`parkMeter-${meter.id}`} />
                </div>
              )}
              {meter.status === "Deserved" && (
                <div className="deservedParkMeter">
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
              {selectedPark === meter.id && meter.status === "Deserved" && (
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
                  <button className="button-84">
                    Leave 🧭
                  </button>
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
      <div className="road">
        <div className="lines"></div>

        <div
          className={`car-icon ${isMoving ? "car-animation" : "car-stopped"}`}
          onClick={handleStopClick}
        >
          <img src={car} alt="car" />
        </div>
      </div>
      //timer
    </div>
  );
};


export default ParkingSimulationComponent;
