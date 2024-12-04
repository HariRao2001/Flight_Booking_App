import backIcon from "../../images/Back.png";

import { seatNumbers } from "../../Dummy Data/AIRPLANE_DUMMY_DATA";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { bookingActions } from "../../store/createSore";

export default function SeatBooking(){
    const [ selectedSeats, setSelectedSeats ] = useState([]);
    const [totalBookingSeats, setTotalBookingSeats] = useState(0);

    const [ error,setError ] = useState("");

    const selectedFlightDetails = useSelector(state=>state.selectedFlightDetails);
    const passengerFlightBookingDetails = useSelector(state=>state.passengerFlightBookingDetails);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!localStorage.getItem("userid")){
            navigate("/personalinfo");
            return;
        }
        if(Object.keys(passengerFlightBookingDetails).length === 0){
            navigate("/flightbooking");
            return;
        };


        async function run(){
            //here we are getting the data based on the user selected flight id to display the seats which are reserved and not reserved
            const response = await fetch(`http://localhost:3000/${selectedFlightDetails.airplaneId}`);
            const json = await response.json();

            //Here we are checking the key(i.e: user selected date) present in the getting response object;

            if(passengerFlightBookingDetails.date in json){

                const selectedSeatsArr = json[passengerFlightBookingDetails.date];
                const duplicateSeatNumbers = seatNumbers();
                //we are caling the seatNumbers function to create the default seat numbers.
                duplicateSeatNumbers.map(innerArr=>{
                    innerArr.map(seat=>{
                        const indexVal = selectedSeatsArr.indexOf(seat.seatNo);
                        //we are searching which seat is reserved or not.
                        //if index value not equal to -1 that seat is reserved previous
                        //if index value is equal to -1 that seat is not reserved 
                        if(indexVal !== -1){
                            //here we are setting the seat is to be reserved
                            seat.reserved = true;
                        }
                    })
                });
                setTotalBookingSeats(selectedSeatsArr.length);
                setSelectedSeats(duplicateSeatNumbers);
            }

            else{   
                //if the user entered date is not presented in the database then we create a key with user selected date and its value assigned as an empty arrray 
                json[passengerFlightBookingDetails.date] = [];

                //here we are updating the data
                fetch(`http://localhost:3000/${selectedFlightDetails.airplaneId}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body:JSON.stringify(json)
                })
                .then(response=>response.json())
                .then(json=>console.log(json));
                //here we are assign all the seats are not reserved because we recently created.see line no:62
                setTotalBookingSeats(0);
                setSelectedSeats((seatNumbers()));
            }
        }
        run();

    },[passengerFlightBookingDetails, navigate, selectedFlightDetails]);

    function seatSelectHandler(seatData, rowIndex, columnIndex){
        setSelectedSeats((previousData)=>{
            const currentData = [...previousData.map(insideArr=>[...insideArr])];
            const dummyObj = { ...seatData };
            dummyObj.selected = !dummyObj.selected;
            currentData[rowIndex][columnIndex] = dummyObj;
            return currentData;
        });
    }

    function seatBookingConfirmButton(){
        const selectedSeatNumbers = [];
        selectedSeats.map(innerArr=>{
            innerArr.map((seatData)=>{
                if(seatData.selected){
                    selectedSeatNumbers.push(seatData.seatNo);
                }
            })
        });

        if(passengerFlightBookingDetails.passengersCount != selectedSeatNumbers.length){
            setError(`You select ${selectedSeatNumbers.length} seats instead of ${passengerFlightBookingDetails.passengersCount} seats`);
            return;
        }
        
        dispatch(bookingActions.confirmSelectedSeats(selectedSeatNumbers));
        navigate("/paymentpage");

    }

    return <div className="seat_booking_block">
        <div className="seat_booking_header_block">
            <Link to="/searchresult"><img src={backIcon}></img></Link>
            <p>Choose Seat</p>
        </div>
        <ul className="seat_booking_subheader_part">
            <li className="selected_list_el">
                <p>Selected</p>
            </li>
            <li className="reserved_list_el">
                <p>Reserved</p>
            </li>
        </ul>
        <div>
            <p>{totalBookingSeats} out of 40 seats reserved</p>
        </div>
        <div className="seats_container">
            {
                selectedSeats.map((row, rowIndex)=>{
                    return <div key={rowIndex} className="seats_column">
                        {
                            row.map((seat, columnIndex)=>{
                               return <button 
                                        disabled={seat.reserved}
                                        key={seat.seatNo} 
                                        className={seat.selected ? `selected_seat` : seat.reserved ? "reserved_seat" : undefined} 
                                        onClick={()=>seatSelectHandler(seat, rowIndex, columnIndex)}
                                    >
                                    {seat.seatNo}
                                    </button>
                        })
                        }
                    </div>
                })
            }
        </div>
        {error && <p style={{textAlign : "center", width:"300px"}}>{error}</p>}
        <button className="seat_booking_confirm_btn" onClick={seatBookingConfirmButton}>Confirm</button>
    </div>
}