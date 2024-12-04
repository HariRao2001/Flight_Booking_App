import backIcon from "../../images/Back.png";
import airportFromIcon from "../../images/From Icon.png";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export default function BoardingPass() {
  const [filteredBoardingData, setFilteredBoardingData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
        if(!localStorage.getItem("userid")){
          navigate("/error");
          console.log("error occured");
          return;
        }
        const todayDate = new Date().toLocaleDateString().split("/");
        try{
          fetch("http://localhost:3000/bookingsData")
          .then((response)=>{
              if(!response.ok){
                  throw new Error("Something went wrong.Please try again");
              }
              return response.json();
          })
          .then(json=>{
              const userId = localStorage.getItem("userid");
              const filteredArr = json.filter(data => (data.userId === userId) && (new Date(data.flightDate) >= new Date(`${todayDate[2]}-${todayDate[1]}-${todayDate[0]}`)) );
              setFilteredBoardingData(filteredArr);
            }
          );
      }
      catch(error){
          console.error(error);
      }

    },[]);


  return (
    <div className="boarding_pass_block">
      <div className="boardingpass_header_block">
        <Link to="/home">
          <img src={backIcon} alt="image_not_found" />
        </Link>
        <p>Upcoming Boarding Details</p>
      </div>
      { filteredBoardingData.length === 0 ? (
        <p style={{textAlign:"center"}}>No data found</p>
        ) : (
        <>
          { filteredBoardingData.map((airplane, index) => {
            return (
              <div className="boarding_pass_subheader" key={index}>
                <div>
                  <h2>IA</h2>
                  <p>Indian Airlines</p>
                </div>
                <hr />
                <div className="boarding_flight_details_timings_block">
                  <p>{airplane.airplaneTimings.start}</p>
                  <img src={airportFromIcon} alt="image_not_found"></img>
                  <p>{airplane.airplaneTimings.end}</p>
                </div>
                <div className="flight_details_places_block boarding_pass_places_details">
                  <p>{airplane.airplaneTravellingDetails.from}</p>
                  <p>{airplane.airplaneTravellingDetails.to}</p>
                </div>
                <div className="flight_details_places_block payment_details_places_block">
                  <p>{airplane.airportNames.from}</p>
                  <p>{airplane.airportNames.to}</p>
                </div>
                <div className="user_input_flight_details_block flight_details_timing_block">
                  <fieldset>
                    <legend>Date</legend>
                    <div className="user_input_block">
                      <input type="date" value={airplane.flightDate} disabled />
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend>Time</legend>
                    <div className="user_input_block">
                      <input
                        type="time"
                        value={airplane.airplaneTimings.start}
                        name="time"
                        disabled
                      />
                    </div>
                  </fieldset>
                </div>
                <hr />
                <table className="passenger_details_block">
                  <thead>
                    <tr>
                      <th>Flight</th>
                      <th>Gate</th>
                      <th>Seat</th>
                      <th>Class</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    airplane.selectedSeats.map((seatNumber)=>(
                      <tr key={seatNumber}>
                        <td>{airplane.airplaneId}</td>
                        <td>23</td>
                        <td>{seatNumber}</td>
                        <td>{airplane.airplaneClass}</td>
                      </tr>
              ))
            }
                  </tbody>
                </table>
                <hr />
                <button className="download_button">Download</button>
                <Link to="/home">Book another flight</Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
