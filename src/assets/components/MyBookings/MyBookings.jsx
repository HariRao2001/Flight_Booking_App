import backIcon from "../../images/Back.png";
import airportFromIcon from "../../images/From Icon.png";
import { Link } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

import { bookingActions } from "../../store/createSore";

import { useNavigate } from "react-router-dom";

export default function MyBookings(){

    const boardingArr = useSelector(state=>state.boardingDetailsArr);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("userid")){
            navigate("/error");
            return;
        };
        
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
                const filteredArr = json.filter(user=>user.userId == userId).reverse();
                dispatch(bookingActions.boardingArrHandler(filteredArr));
            }
            );
        }
        catch(error){
            console.error(error);
        }
    },[dispatch, navigate]);

    return<div className="boarding_pass_block">
        <div className="boardingpass_header_block">
            <Link to="/home"><img src={backIcon} alt="image_not_found"/></Link>
            <p>My Bookings</p>
        </div>
        {boardingArr.length === 0 && <p style={{textAlign : "center"}}>No Bookings are found</p>}
        <>
                {
                    boardingArr.map((airplane, index)=>{
                        return <div className="boarding_pass_subheader" key={index}>
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
                                            <input type="date" value={airplane.flightDate} disabled/>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Time</legend>
                                        <div className="user_input_block">
                                            <input type="time" value={airplane.airplaneTimings.start} name="time" disabled/>
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
                                <thead>
                                    <tr>
                                        <th>Passenger Name</th>
                                        <th>Passenger Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        airplane.passengerSeatConfigurationDetails.map(passenger=><tr key={passenger.seatNo}>
                                            <td>{passenger.personName}</td>
                                            <td>{passenger.personAge}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                            <hr />
                            <div>
                                <b>Total Cost: </b><span>{airplane.price * airplane.passengersCount}</span>
                            </div>
                            <button className="download_button">Download</button>
                            <Link to="/flightbooking">Book another flight</Link>
                            <hr />
                        </div>

                    })
                }
        </>
    </div>
}