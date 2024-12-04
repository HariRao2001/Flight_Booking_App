import { Link, useLocation } from "react-router-dom";
import backIcon from "../../images/Back.png";
import airportFromIcon from "../../images/From Icon.png";
import ErrorPage from "../ErrorPage/ErrorPage";


export default function IndividualBoardingPass() {
  const location = useLocation();
  const airplane = location.state;
  return (
    airplane ? (
    <div className="boarding_pass_block">
      <div className="boardingpass_header_block">
        <Link to="/home">
          <img src={backIcon} alt="image_not_found" />
        </Link>
        <p>Boarding Pass</p>
      </div>
      <div className="boarding_pass_subheader">
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
        <table className="passenger_details_block">
          <thead></thead>
        </table>
        <button className="download_button">Download</button>
        <Link to="/home">Book another flight</Link>
      </div>
    </div>) : <ErrorPage />
  );
}
