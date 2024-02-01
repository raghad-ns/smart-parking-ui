import React, { useState, useEffect } from "react";
import "./History-table.scss"; // Import your SCSS file here
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { historyData } from "./Data-table";
import car from "../../assets/sport-car.png";
const HistoryTable = () => {
  // eslint-disable-next-line
  const [data, setData] = useState(historyData);
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [showCarAnimation, setShowCarAnimation] = useState(true);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPageCount = Math.ceil(data.length / itemsPerPage);
  useEffect(() => {
    // Hide the car animation after 3 seconds
    const timeoutId = setTimeout(() => {
      setShowCarAnimation(false);
    }, 10000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, []);
  const renderTables = () => {
    const tables = [];
    for (let i = 1; i <= totalPageCount; i++) {
      const pageData = data.slice((i - 1) * itemsPerPage, i * itemsPerPage);
      tables.push(
        <div key={i} className="background-table">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Car ID</th>
                <th>Park ID</th>
                <th>Time[from-to]</th>
                <th>Duration</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, index) => (
                <tr key={index}>
                  <td>{row.No}</td>
                  <td>{row["car-id"]}</td>
                  <td>{row["park-id"]}</td>
                  <td>{row.Time}</td>
                  <td>{row.duration}</td>
                  <td>{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return tables;
  };

  return (
    <div className="history-page-wrapper">
      <div className="history-table">
        {/* <div className="user-info">
          <Person className="icons" style={{ fontSize: "2.5rem" }} />
          <span className="username">User-name</span>
        </div> */}
        {showCarAnimation && (
          <div className="car-animation">
            <img src={car} alt="Car Animation" className="car-image" />
          </div>
        )}
        {renderTables()[currentPage - 1]}
        <div className="pagination">
          <ArrowLeft
            className="arrowleft"
            onClick={() => paginate(currentPage - 1)}
          />
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
          <ArrowRight
            className="arrowright"
            onClick={() => paginate(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
