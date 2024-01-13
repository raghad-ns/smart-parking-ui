// import React, { useState, useEffect } from "react";
// import "./parking-simulation.scss";
// import DriveEtaIcon from "@mui/icons-material/DriveEta";
// import CloudIcon from "@mui/icons-material/Cloud";
// import parkmeter from "../../parking-meter (4).png";
// import disabledParkMeter from "../../parking-meter (3).png";
// import direction from "../../directional.png";
// import car from "../../sport-car.png";
// import connect from "../../wifi.png";
// import noSignal from "../../no-signal.png";
// import parkmeterData from "./parkingData";

// const ParkingSimulationComponent = () => {
//   const [carPosition, setCarPosition] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update the car's position
//       setCarPosition((prevPosition) => (prevPosition + 1) % 100);
//     }, 100); // Adjust the interval based on your animation speed

//     // Clear the interval when the component is unmounted
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="body">
//       <div className="sky">
//         <CloudIcon className="cloud-icon" />
//         <CloudIcon className="cloud-icon" />
//       </div>
//       <div className="grass"></div>
//       <div className="wifi-symbol">
//         <div className="wifi-circle first"></div>
//         <div className="wifi-circle second"></div>
//         <div className="wifi-circle third"></div>
//         <div className="wifi-circle fourth"></div>
//       </div>
//       {/* <img className="no-signal" src={noSignal} alt="" /> */}

//       <div className="parkmeter">
//         {parkmeterData.map((meter) => (
//           <button key={meter.id}>
//             <div className="parkmeter-Info">
//               {meter.status === "Available" && (
//                 <div className="avilableParkMeter">
//                   <img src={parkmeter} alt={`parkMeter-${meter.id}`} />
//                   {/* <img className="no-signal" src={noSignal} alt="" /> */}
//                 </div>
//               )}
//               {meter.status === "Disabled" && (
//                 <div className="disabledParkMeter">
//                   <img src={disabledParkMeter} alt={`parkMeter-${meter.id}`} />
//                   <img
//                     className="no-signal-icon"
//                     src={noSignal}
//                     alt="noSignal"
//                   />
//                 </div>
//               )}
//               <div className="parkInfo">
//                 <div>{`ID: ${meter.id}`}</div>
//                 <div>{`${meter.status}`}</div>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>

//       <div className="road">
//         <div className="lines"></div>
//         <div className={`car-icon ${carPosition > 0 ? "car-animation" : ""}`}>
//           <img src={car} alt="car" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParkingSimulationComponent;
// import React, { useState, useEffect } from "react";
// import "./parking-simulation.scss";
// import DriveEtaIcon from "@mui/icons-material/DriveEta";
// import CloudIcon from "@mui/icons-material/Cloud";
// import parkmeter from "../../parking-meter (4).png";
// import disabledParkMeter from "../../parking-meter (3).png";
// import direction from "../../directional.png";
// import car from "../../sport-car.png";
// import connect from "../../wifi.png";
// import noSignal from "../../no-signal.png";
// import parkmeterData from "./parkingData";

// const ParkingSimulationComponent = () => {
//   const [carPosition, setCarPosition] = useState(0);
//   const [selectedPark, setSelectedPark] = useState(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update the car's position only if a park is selected
//       if (selectedPark !== null) {
//         setCarPosition((prevPosition) => (prevPosition + 1) % 100);
//       }
//     }, 100); // Adjust the interval based on your animation speed

//     // Clear the interval when the component is unmounted
//     return () => clearInterval(interval);
//   }, [selectedPark]);

//   const handleParkSelect = (parkId) => {
//     // Handle the park selection logic here
//     setSelectedPark(parkId);
//   };

//   return (
//     <div className="body">
//       <div className="sky">
//         <CloudIcon className="cloud-icon" />
//         <CloudIcon className="cloud-icon" />
//       </div>
//       <div className="grass"></div>
//       <div className="wifi-symbol">
//         <div className="wifi-circle first"></div>
//         <div className="wifi-circle second"></div>
//         <div className="wifi-circle third"></div>
//         <div className="wifi-circle fourth"></div>
//       </div>
//       {/* <img className="no-signal" src={noSignal} alt="" /> */}

//       <div className="parkmeter">
//         {parkmeterData.map((meter) => (
//           <button
//             key={meter.id}
//             onClick={() => handleParkSelect(meter.id)}
//             disabled={meter.status === "Disabled"}
//           >
//             <div className="parkmeter-Info">
//               {meter.status === "Available" && (
//                 <div className="avilableParkMeter">
//                   <img src={parkmeter} alt={`parkMeter-${meter.id}`} />
//                   {/* <img className="no-signal" src={noSignal} alt="" /> */}
//                 </div>
//               )}
//               {meter.status === "Disabled" && (
//                 <div className="disabledParkMeter">
//                   <img src={disabledParkMeter} alt={`parkMeter-${meter.id}`} />
//                   <img
//                     className="no-signal-icon"
//                     src={noSignal}
//                     alt="noSignal"
//                   />
//                 </div>
//               )}
//               <div className="parkInfo">
//                 <div>{`ID: ${meter.id}`}</div>
//                 <div>{`${meter.status}`}</div>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>

//       <div className="road">
//         <div className="lines"></div>
//         <div
//           className={`car-icon ${carPosition > 0 && selectedPark !== null ? "car-animation" : ""}`}
//         >
//           <img src={car} alt="car" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParkingSimulationComponent;
// ParkingSimulationComponent.tsx
import React, { useState, useEffect } from 'react';
import './parking-simulation.scss';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CloudIcon from '@mui/icons-material/Cloud';
import Parkmeter from './parkingData'; // Import the interface and data
import car from "../../sport-car.png";
import parkmeterData from "./parkingData";
// Import images directly to use in the component
import parkmeterImage from '../../parking-meter (4).png';
import disabledParkMeterImage from '../../parking-meter (3).png';
import noSignalImage from '../../no-signal.png';
import moon from '../../moon.png'
import moon2 from '../../cloudy-night.png'
import star from '../../stars.png'
const ParkingSimulationComponent: React.FC = () => {
  const [isMoving, setIsMoving] = useState(true);

  const handleStopClick = () => {
    setIsMoving(false);
  };

const [carPosition, setCarPosition] = useState(0);
const [selectedPark, setSelectedPark] = useState<number | null>(null);

useEffect(() => {
  const interval = setInterval(() => {
    if (selectedPark !== null) {
      setCarPosition((prevPosition) => {
        const newPosition = (prevPosition + 1) % 100;

        if (newPosition === 0) {
          clearInterval(interval);

          const parkWidth = 5;
          const chosenParkIndex = parkmeterData.findIndex(
            (park) => park.id === selectedPark
            
            );
            //console.log("chosen",chosenParkIndex);

          if (chosenParkIndex !== -1) {
            const newPositionBesidePark =
              (chosenParkIndex * parkWidth * 2) % 100;
   console.log(newPositionBesidePark);
   
            setCarPosition(newPositionBesidePark);
          }
        }
      console.log("new",newPosition);
      
        return newPosition;
      });
    }
  }, 100);

  return () => clearInterval(interval);
}, [selectedPark]);


  const handleParkSelect = (parkId: number) => {
    console.log(parkId);
    
    setSelectedPark(parkId);
  };

  return (
    <div className="body">
            <div className="sky">
         {/* <CloudIcon className="cloud-icon" /> */}
         {/* <CloudIcon className="cloud-icon" /> */}
         <img className='moon' src={moon} alt='moon'/>
         <img className='star1' src={star} alt='moon'/>
         <img className='star' src={star} alt='moon'/>
         {/* <img src={moon2} alt='moon'/> */}
         
       </div>
       <div className="grass"></div>
       <div className="wifi-symbol">
         <div className="wifi-circle first"></div>
         <div className="wifi-circle second"></div>
         <div className="wifi-circle third"></div>
         <div className="wifi-circle fourth"></div>
       </div>
      <div className="parkmeter">
        {Parkmeter.map((meter) => (
          <button
            key={meter.id}
            onClick={() => handleParkSelect(meter.id)}
            disabled={meter.status === 'Disabled'}
          >
            <div className="parkmeter-Info">
              {meter.status === 'Available' && (
                <div className="avilableParkMeter">
                  <img src={parkmeterImage} alt={`parkMeter-${meter.id}`} />
                </div>
              )}
              {meter.status === 'Disabled' && (
                <div className="disabledParkMeter">
                  <img src={disabledParkMeterImage} alt={`parkMeter-${meter.id}`} />
                  <img className="no-signal-icon" src={noSignalImage} alt="noSignal" />
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
      className={`car-icon ${isMoving ? 'car-animation' : 'car-stopped'}`}
      onClick={handleStopClick}
    >
    <img src={car} alt="car" />
      
    </div>
         {/* <div
           className={`car-icon ${carPosition > 0 && selectedPark !== null ? "car-animation" : ""}`}
         >
              </div>*/}
       </div> 
    </div>
  );
};

export default ParkingSimulationComponent;
