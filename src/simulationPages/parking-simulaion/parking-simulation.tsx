// ParkingComponent.tsx
import React, { useState } from 'react';
import { ParkingSpot, parkingSpots } from './parkingData';
import './parking-simulation.scss';



const ParkingSimulationComponent = () => {
  const [startIndex, setStartIndex] = useState(0);

  const spotsPerPage = 5;
  const maxIndex = parkingSpots.length - spotsPerPage;

  const visibleParkingSpots = parkingSpots.slice(startIndex, startIndex + spotsPerPage);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  return (
    <div className="parking-list-container">
      <button className="arrow left" onClick={prevSlide}>{'<'}</button>
      <div className="parking-list">
        {visibleParkingSpots.map((spot: ParkingSpot) => (
          <div
            key={spot.id}
            className={`parking-spot ${spot.available ? 'available' : 'occupied'}`}
          >
            Spot {spot.id}
          </div>
        ))}
      </div>
      
      <button className="arrow right" onClick={nextSlide}>{'>'}</button>
    </div>
  );



  // const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  // const handleSpotSelection = (spotId: number) => {
  //   setSelectedSpot(spotId);
  // };

  // return (
  //   <div className="parking-container">
  //     <h1>Parking Simulation</h1>
  //     <div className="parking-spots">
  //       {parkingSpots.map((spot: ParkingSpot) => (
  //         <div
  //           key={spot.id}
  //           className={`parking-spot ${spot.available ? 'available' : 'occupied'} ${selectedSpot === spot.id ? 'selected' : ''}`}
  //           onClick={() => spot.available && handleSpotSelection(spot.id)}
  //         >
  //           Spot {spot.id}
  //         </div>
  //       ))}
  //     </div>
  //     {selectedSpot && (
  //       <p>Selected spot: {selectedSpot}</p>
  //     )}
  //   </div>
  // );
};

export default ParkingSimulationComponent;
