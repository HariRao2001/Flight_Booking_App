import backIcon from "../../images/Back.png";
import timeSpanIcon from "../../images/Time Span.png";
import airportFromIcon from "../../images/From Icon.png";
import masterCardIcon from "../../images/Mastercard.png";
import payalIcon from "../../images/Paypal.png"
import visaIcon from "../../images/Visa.png";

import {  useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

import { bookingActions } from "../../store/createSore";

import ErrorPage from "../ErrorPage/ErrorPage";
import FlightBooking from "../FlightBooking/FlightBooking";

export default function PaymentPage(){
    const [error, setError]= useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const passengerData = useSelector(state=>state.passengerFlightBookingDetails);
    const flightData = useSelector(state=>state.selectedFlightDetails);
    const selectedSeats = useSelector(state=>state.selectedSeats);
    const userDetails = useSelector(state=>state.userDetails);
    const passengerDetails =  useSelector(state=>state.passengerDetails);

    function getCurrentDate(){
        const date = new Date();
        return date.toLocaleDateString();
    }

    function submitHandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const userEnteredData  = Object.fromEntries(formData.entries());
        // const regex = new RegExp(/[a-z]/i);
        const cardValidate = /^[0-9]{16}/;
        const cvvValidate = /^[0-9]{3}/;

        const userEnteredDate = userEnteredData.expiryDate;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();


        //Which is used to check the given input is a number or not and that length is equal to 16 or not.

        // function isValidNumber(input){
        //     return !isNaN(input) && input.trim().length !== 0 && input.trim().length === 16;
        // }

        if(!cardValidate.test(userEnteredData.cardNumber)){
           setError("Enter a valid card number");
           return; 
        }

        if(!userEnteredData.passengerName.trim()){
            setError("Enter a valid card holder name");
            return;
        }

        if(!cvvValidate.test(userEnteredData.cvv) ){
            setError("Enter a valid cvv");
            return;
        }

        if(userEnteredData.expiryDate.indexOf("/") !== 2 || 
            userEnteredData.expiryDate.slice(0,2) > 12 ||
            userEnteredData.expiryDate.slice(3,7) < currentYear ||
            !(new Date(`${userEnteredDate.slice(3,7)}/${userEnteredDate.slice(0,2)}`) > new Date(`${currentYear}/${currentMonth}`))
        ){
            setError("Enter a valid expiry date");
            return;
        }

        setError("");

        const passengerSeatConfigurationDetails =selectedSeats.map((seatNo, index)=>{
            return { seatNo, personName: passengerDetails[`passenger${index+1}name`], personAge: passengerDetails[`passenger${index+1}age`]};
        });

        const newObj = {...flightData};
        newObj.orderedDate = new Date();
        newObj.flightDate = passengerData.date;
        newObj.ticketId = Math.random().toString().slice(2);
        newObj.selectedSeats = selectedSeats;
        newObj.userId = localStorage.getItem("userid");
        newObj.userName = userDetails.name;
        newObj.passengerDetails = passengerDetails;
        newObj.passengerSeatConfigurationDetails = passengerSeatConfigurationDetails;

        //with the below fetch we just updating the newly booking details
        fetch("http://localhost:3000/bookingsData",{
            method: "POST",
            body: JSON.stringify(newObj), 
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            if(!response.ok){
                alert("Something went wrong...");
                return;
            }
            
            async function run(){
                //with the below fetch we are retriving the flightdata based on the user selected flightid 
                const response = await fetch(`http://localhost:3000/${flightData.airplaneId}`);
                const updatedJson = await response.json();

                //here concate the two arrays i.e, one array is the previousJson and the other array is the user selected seats then finally a new array is created.  
                updatedJson[passengerData.date] = updatedJson[passengerData.date].concat(passengerSeatConfigurationDetails);
                
                //Here we are updating the data. i.e,,selected seats based on the flightid 
                fetch(`http://localhost:3000/${flightData.airplaneId}`,{
                    method:"PUT",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(updatedJson)
                })
                .then(response=>{
                    if(!response.ok){
                        throw new Error("Something went wrong");
                    }
                    return response.json();
                })            }
            run();
    
            setSuccessMessage(`Your flight ticket${selectedSeats.length !== 1 ? "s" : ""} booked successfully...`);
           
            setTimeout(()=>{
                dispatch(bookingActions.boardingHandler(newObj));
                dispatch(bookingActions.resetPassengersDetails());
                navigate("/ibp",{ state : newObj });
                
            },2000);
        });        
        
    }

    function errorCheckHandler(e){
        if(e.target.name === "cardNumber"){
            const cardValidate = /^[0-9]{16}/;
            if(!cardValidate.test(e.target.value)){
                setError("Enter a valid card number");
                return;
             }
                setError("");
        }

        if(e.target.name === "passengerName"){
            if(!e.target.value.trim()){
                setError("Enter a valid card holder name");
                return;
            }
            setError("");
        }

        if(e.target.name === "cvv"){
            const cvvValidate = /^[0-9]{3}/;
            if(!cvvValidate.test(e.target.value) ){
                setError("Enter a valid cvv");
                return;
            }
            setError("");
        }

        if(e.target.name === "expiryDate"){
            const userEnteredDate = e.target.value;
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();

            if(e.target.value.indexOf("/") !== 2 || 
            e.target.value.slice(0,2) > 12 ||
            e.target.value.slice(3,7) < currentYear ||
            !(new Date(`${userEnteredDate.slice(3,7)}/${userEnteredDate.slice(0,2)}`) > new Date(`${currentYear}/${currentMonth}`))
        ){
            setError("Enter a valid expiry date");
            return;
        }
        }
    }

    return(!localStorage.getItem("userid") ? <ErrorPage /> : (
        Object.keys(passengerData).length !== 0 ||
        Object.keys(flightData).length !== 0 || 
        Object.keys(selectedSeats).length !== 0 || 
        Object.keys(userDetails).length !== 0 ) ? 
        (<div className="payment_block">
            <div className="payment_header_block">
                <Link to="/searchresult"><img src={backIcon} alt="image not found"/></Link>
                <p>Payment</p>
            </div>
            <div className="payment_details_subheader_block">

            <div className="payment_details_subheader">
                <div>
                    <h2>IA</h2>
                    <p>Indian Airlines</p>
                </div>
                <div className="payment_details_time_block">
                    <img src={timeSpanIcon} alt="image_not_found"></img>
                    <span>{getCurrentDate()}</span>
                </div>
            </div>
            <hr />
            <div className="payment_details_timings_block">
                <p>{flightData.airplaneTimings.start}</p>
                <img src={airportFromIcon} alt="image_not_found"></img>
                <p>{flightData.airplaneTimings.end}</p>
            </div>
            <div className="payment_details_places_block">
                <p>{flightData.airplaneTravellingDetails.from}</p>
                <p>{flightData.airplaneTravellingDetails.to}</p>
            </div>
            <hr />
            <div className="payment_details_price_block">
                <p>Total</p>
                <h3>{flightData.passengersCount * flightData.price}</h3>
            </div>
        </div>
        <form className="payment_form_block" onSubmit={submitHandler}>
            <p>Card Number</p>
            <input type="text" placeholder="0000 0000 0000 0000" maxLength={16} name="cardNumber" className={ error === "Enter a valid card number" ?  "error_highlighted_input" : undefined } onBlur={(e)=>errorCheckHandler(e)}></input>
            { (error && error === "Enter a valid card number") && <p className="error_highlighted_para">{error}</p> }

            <p>Card Holder Name</p>
            <input type="text" placeholder="Enter card holder name" name="passengerName" className={ error==="Enter a valid card holder name" ?  "error_highlighted_input" : undefined } onBlur={(e)=>errorCheckHandler(e)}></input>
            { (error && error === "Enter a valid card holder name") && <p className="error_highlighted_para">{error}</p> }

            <div>
                <p>CVV</p>
                <input type="text" placeholder="000" maxLength={3} name="cvv"className={ error==="Enter a valid cvv" ? "error_highlighted_input" : undefined } onBlur={(e)=>errorCheckHandler(e)}></input>
                {(error && error === "Enter a valid cvv") && <p className="error_highlighted_para">{error}</p>}
            </div>

            <div>
                <p>Expiry Date</p>
                <input type="text" placeholder="05/2025" name="expiryDate" maxLength={7} className={ error==="Enter a valid expiry date" ? "error_highlighted_input" : undefined } onBlur={(e)=>errorCheckHandler(e)}></input>
                { (error && error === "Enter a valid expiry date") && <p className="error_highlighted_para">{error}</p>}
            </div>
            <div className="payment_card_icons">
                <img src={masterCardIcon} alt="image_not_found"></img>
                <img src={visaIcon} alt="image_not_found"></img>
                <img src={payalIcon} alt="image_not_found"></img>
            </div>
            {successMessage && <div className="success_message_block"><p>{successMessage}</p></div>}
            <button className="payment_submit_btn" onSubmit={submitHandler}>Submit</button>
            <button className="payment_cancel_btn" type="reset" >Cancel</button>
        </form>
    </div>) :  <FlightBooking />
    )
}