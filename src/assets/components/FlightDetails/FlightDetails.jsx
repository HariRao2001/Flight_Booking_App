
import backIcon from "../../images/Back.png";
import airportFromIcon from "../../images/From Icon.png";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookingActions } from "../../store/createSore";

export default function FlightDetails(){
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const flightData = location.state;

    const userData = useSelector(state=>state.passengerFlightBookingDetails);
    const dispatch = useDispatch();
    console.log(userData);
    useEffect(()=>{
        if(Object.keys(userData).length === 0){
            navigate("/searchresult");
            return;
        }
    },[]);

    function confirmHandler(){
        dispatch(bookingActions.addSelectedFlightDetails(flightData));
        navigate("/passengerdetails");
    }

    return(flightData ? (<div>
        <div className="flight_details_header_block">
            <Link to="/searchresult"><img src={backIcon} alt="image not found"/></Link>
            <p>Flight Details</p>
        </div>
        <div className="flight_details_block">
            <div className="flight_deatils_subheader_block">
                <h2>IA</h2>
                <p>Indian Airlines</p>
            </div>
            <hr/>
            <p className="flight_name">Flight Name: <span>{flightData.airplaneId}</span></p>
            <div className="flight_details_timings_block">
                <p>{flightData.airplaneTimings.start}</p>
                <img src={airportFromIcon} alt="image_not_found"></img>
                <p>{flightData.airplaneTimings.end}</p>
            </div>
            <div className="flight_details_places_block">
                <p>{flightData.airplaneTravellingDetails.from}</p>
                <p>{flightData.airplaneTravellingDetails.to}</p>
            </div>
            <div className="flight_details_places_block flight_places_indetail">
                <p>{flightData.airportNames.from}</p>
                <p>{flightData.airportNames.to}</p>
            </div>
            <hr />
            <div className="user_input_flight_details_block flight_details_timing_block">
                <fieldset>
                    <legend>Date</legend>
                    <div className="user_input_block">
                        <input type="date" value={userData.date} disabled/>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Time</legend>
                    <div className="user_input_block">
                        <input type="time" value={flightData.airplaneTimings.start} name="time" disabled/>
                    </div>
                </fieldset>
            </div>
            <hr />
            <div className="flight_details_price_block">
                <p>Price <b>{flightData.passengersCount * flightData.price} (in rupees)</b></p>
                <p>(for {flightData.passengersCount} {flightData.passengersCount > 1 ? "tickets"  : "ticket"})</p>
            </div>
        </div>
        <div className="flight_details_block_btns">
            <Link to="/searchresult"><button className="cancel_btn">Cancel</button></Link>
            <button className="confirm_btn" onClick={confirmHandler}>Confirm</button>
        </div>
    </div>) : (
        <div className="error_block">
            <h5>Oops!</h5>
            <h2>There is an error</h2>
            <p><span>Error:</span> This error occurs due to invalid flight Details</p>
            <Link to="/flightbooking">Go to booking page</Link>
        </div>
    )
    )
}
