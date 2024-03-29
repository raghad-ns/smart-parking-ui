import React, { useState, useEffect } from "react";
import "./History-table.scss"; // Import your SCSS file here
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import noData from '../../assets/no-data.svg'
import car from "../../assets/sport-car.png";
import { getHistory } from "../../services/connection.service";
import { UserContext } from "../../providers/user.provider";
import { HistoryNS } from "../../typess/history.type";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ViewSideManContext } from "../../providers/view-side-man.provider";
import useNotification from "../../hooks/notification.hook";
const HistoryTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<HistoryNS.IHistoryRecord[]>();
  const itemsPerPage = 7; // Number of items to display per page
  const [showCarAnimation, setShowCarAnimation] = useState(true);
  const { setNotification } = useNotification()

  const viewSideManContext = React.useContext(ViewSideManContext)
  const userContext = React.useContext(UserContext)
  const navigate = useNavigate()

  const paginate = (pageNumber: number) => setSearchParams(oldParams => {
    oldParams.set('p', pageNumber.toString())
    return oldParams
  });

  const [totalPageCount, setTotalCount] = useState(1);
  useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(false)
    getHistoryRecords()
    setSearchParams(oldParams => {
      oldParams.set('p', searchParams.get('p') || '1')
      return oldParams
    })
    // Hide the car animation after 3 seconds
    const timeoutId = setTimeout(() => {
      setShowCarAnimation(false);
    }, 10000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getHistoryRecords()
    // eslint-disable-next-line
  }, [searchParams]);

  const getHistoryRecords = () => {
    getHistory(Number(searchParams.get('p')), itemsPerPage).then(history => {
      if (history.state && history.value.statusCode === 200) {
        setData(history.value.data.data.hestory);
        setTotalCount(Math.ceil(history.value.data.data.total / itemsPerPage))
      } else if (history.state && history.value.statusCode === 401) {
        setNotification({ message: 'Session expiered, you have to login again!' })
        // window.alert('Session expiered, you have to login again!')
        sessionStorage.clear()
        navigate('/signin')
      }
    }).catch(error => {
      console.error(error)
    })
  }
  const formatTime = (timeStamp: string): string => {
    // const formattedDate = timeStamp.split(' ')[0]
    const date = new Date(timeStamp);

    // Format the date in a human-readable format
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate
  }
  const formateDuration = (duration: number) => {

    // Convert minutes to milliseconds
    const durationInMilliseconds = duration * 60 * 1000;

    // Construct a Date object representing the duration
    const durationDate = new Date(durationInMilliseconds);

    // Extract hours, minutes, and seconds from the duration
    const hours = durationDate.getUTCHours();
    const minutes = durationDate.getUTCMinutes();
    const seconds = durationDate.getUTCSeconds();
    const formattedDuration =
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDuration
  }

  return (
    <div className="history-page-wrapper">
      {/* {tables} */}
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
        {data?.length
          ? <div className="background-table">
            <table>
              <thead>
                <tr>
                  <th>Car ID</th>
                  <th>Park ID</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Time[from]</th>
                  <th>Time[to]</th>
                  <th>Duration</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((row, index) => (
                  <tr key={index}>
                    <td>{userContext.user?.carID}</td>
                    <td>{row.parking_id}</td>
                    <td>{row.location}</td>
                    <td>{row.status}</td>
                    <td>{formatTime(row.park_At)}</td>
                    <td>{row.leave_At ? formatTime(row.leave_At) : '-'}</td>
                    <td>{formateDuration(Number(row.duration.split(' ')[0]))}</td>
                    <td>{row.cost ? '₪ ' + row.cost : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          : <div className="no-data">
            <img src={noData} alt="no data to display" />
            <span>No Data Available!</span>
          </div>}
        {/* <div className="background-table">
          <table>
            <thead>
              <tr>
                <th>Car ID</th>
                <th>Park ID</th>
                <th>Location</th>
                <th>Status</th>
                <th>Time[from]</th>
                <th>Time[to]</th>
                <th>Duration</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((row, index) => (
                <tr key={index}>
                  <td>{userContext.user?.car_ID}</td>
                  <td>{row.parking_id}</td>
                  <td>{row.location}</td>
                  <td>{row.status}</td>
                  <td>{formatTime(row.park_At)}</td>
                  <td>{row.leave_At ? formatTime(row.leave_At) : '-'}</td>
                  <td>{formateDuration(Number(row.duration.split(' ')[0]))}</td>
                  <td>{row.cost ? '₪ ' + row.cost : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        {data?.length && <div className="pagination">
          <ArrowLeft
            className="arrowleft"
            onClick={() => paginate(Number(searchParams.get('p')) - 1)}
          />
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={index === Number(searchParams.get('p')) - 1 ? 'focused' : ''}>
              {index + 1}
            </button>
          ))}
          <ArrowRight
            className="arrowright"
            onClick={() => paginate(Number(searchParams.get('p')) + 1)}
          />
        </div>}

      </div>
    </div>
  );
};

export default HistoryTable;
