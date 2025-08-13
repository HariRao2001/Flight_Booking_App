import menubar from "../../images/Bulleted List.png";
import airplaneToIcon from "../../images/Airplane Landing.png";
import airplaneFromIcon from "../../images/From Icon.png";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../store/createSore";

import { useNavigate, Link, redirect } from "react-router-dom";

import { airplanesStartingPoints, airplanesEndingPoints, airplaneClasses } from "../../Dummy Data/AIRPLANE_DUMMY_DATA";

export default function FlightBooking(){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("userid")){
            // navigate("/error");
            redirect("/error");
        }
    },[navigate]);

    const [activeButton, setActiveButton] = useState(0);
    const [error, setError] = useState("");
    // const [selectedReturnValue, setSelectedReturnValue] = useState("");

    const passengerFlightBookingDetails = useSelector(state=>state.passengerFlightBookingDetails);   

    const dispatch = useDispatch();

    function activeButtonHandler(activeIndex){
        setActiveButton(activeIndex);
    }

    // function returnHandler(e){
    //     console.log(e.target.value);
    //     setSelectedReturnValue(e.target.value);
    // }

    function searchButtonHandler(e){
        e.preventDefault();
        const formData= new FormData(e.target);
        const userFilledDetails = Object.fromEntries(formData.entries());
        // const date = userFilledDetails.date.split("-");
        // const constructedDate = `${date[2]}/${date[1]}/${date[0]}`;


        if(
            !userFilledDetails.airplaneFrom ||
            !userFilledDetails.airplaneTo ||
            userFilledDetails.airplaneTo === userFilledDetails.airplaneFrom
        ){
            setError("Please provide valid locations");
            return;
        }

        if(!(new Date(userFilledDetails.date) > new Date()) || !userFilledDetails.date){
            setError("Please provide a valid date");
            return;
        }
        // if(userFilledDetails.returnAddress && (userFilledDetails.returnDate > userFilledDetails.date)){
        //     setError("please provide the valid ")
        // }
        
        if(!userFilledDetails.passengersCount ){
            setError("please provide valid passenger count");
            return;
        }
        if(!userFilledDetails.className){
            setError("please provide valid className");
            return;
        }

        setError("");
        dispatch(bookingActions.addPassengerBookingDetails(userFilledDetails));
        e.target.reset();
        navigate("/searchResult");
    }

    return<div className="homepage_block">
        <div className="homepage_header_block">
            <p>Book Flight</p>
            <Link to="/home"><img src={menubar}></img></Link>
        </div>
        <div className="booking_buttons">
            <button className={activeButton===0 ? "homepage_button_active" : "homepage_button_inactive"} onClick={()=>activeButtonHandler(0)}>One Way</button>
            <button className={activeButton===1 ? "homepage_button_active" : "homepage_button_inactive"} onClick={()=>activeButtonHandler(1)}>Round</button>
            <button className={activeButton===2 ? "homepage_button_active" : "homepage_button_inactive"} onClick={()=>activeButtonHandler(2)}>Multicity</button>
        </div>
        <form className="booking_places_block" onSubmit={searchButtonHandler}>
            <fieldset>
                <legend>From</legend>
                <div className="user_input_block">
                    <img src={airplaneFromIcon}/>
                    <select name="airplaneFrom" defaultValue={passengerFlightBookingDetails.airplaneFrom && passengerFlightBookingDetails.airplaneFrom}>
                        { airplanesStartingPoints.map(airplaneFrom=><option value={airplaneFrom} key={airplaneFrom}>{airplaneFrom}</option>) }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <legend>To</legend>
                <div className="user_input_block">
                    <img src={airplaneToIcon}/>
                    <select name="airplaneTo" defaultValue={passengerFlightBookingDetails.airplaneTo && passengerFlightBookingDetails.airplaneTo}>
                        { airplanesEndingPoints.map(airplaneTo=><option value={airplaneTo} key={airplaneTo}>{airplaneTo}</option>) }
                    </select>
                </div>
            </fieldset>
            <div className="user_input_flight_details_block">
                <fieldset >
                    <legend>Departure</legend>
                    <div className="user_input_block">
                        <img src={airplaneFromIcon}/>
                        <input type="date" placeholder="Select date" name="date" defaultValue={passengerFlightBookingDetails.date && passengerFlightBookingDetails.date}/>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <legend>Return</legend>
                    <div className="user_input_block">
                        <img src={airplaneFromIcon}/>
                        // <input type="text" placeholder="Add Return" name="returnAddress" />
                        <select placeholder="Add Return" name="returnAddress" className="return_select" onChange={(e)=>returnHandler(e)}> 
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                </fieldset> */}
            </div>
            {/* {
            selectedReturnValue === "Yes" && (
            <fieldset>
                <legend>Select Return Date</legend>
                <div className="user_input_block">
                    <img src={airplaneFromIcon}/>
                    <input type="date" name="returnDate"></input>
                </div>
            </fieldset>
            )
            } */}
            <div className="user_input_flight_details_block">
                <fieldset>
                    <legend>Traveller</legend>
                    <div className="user_input_block">
                        <input type="number" min="1" max="10" placeholder="1 Adult" name="passengersCount" defaultValue={passengerFlightBookingDetails.passengersCount && passengerFlightBookingDetails.passengersCount}/>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Class</legend>
                    <div className="user_input_block airplane_classname">
                        <select name="className" defaultValue={passengerFlightBookingDetails.className}>
                            { airplaneClasses.map(airplaneName=><option value={airplaneName} key={airplaneName}>{airplaneName}</option>) }
                        </select>
                    </div>
                </fieldset>
            </div>
            { error && <p style={{textAlign:"center"}}>{error}</p>}
            <button className="search_btn">Search</button>
        </form>
    </div>
}
